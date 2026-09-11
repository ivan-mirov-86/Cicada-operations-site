/* Run against the local site with Playwright available in NODE_PATH. */
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const routes = ['/', '/projects.html', '/scheme.html', '/roadmap/', '/conclusions/', '/open-decisions/', '/competitors/', '/404.html'];
const site = process.env.SITE_URL || 'http://127.0.0.1:8080';
const failures = [];

async function snapshot(page) {
  return page.evaluate(() => {
    const values = [];
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement.closest('script,style,code,[data-i18n-ignore]')) values.push(node.data);
    }
    for (const element of document.querySelectorAll('*:not([data-i18n-ignore])')) {
      if (element.closest('[data-i18n-ignore]')) continue;
      for (const attr of ['aria-label','title','alt','placeholder']) if (element.hasAttribute(attr)) values.push(element.getAttribute(attr));
      if (element.matches('meta[name="description"]')) values.push(element.content);
    }
    return values;
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  // Avoid external font/favicon dependencies in a deterministic content check.
  await context.route('https://**/*', route => route.request().url().startsWith(site) ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => failures.push(error.message));
  for (const route of routes) {
    await page.goto(site + route + '?lang=ru');
    await page.waitForFunction(() => !!window.CicadaI18n);
    const russian = await snapshot(page);
    await page.locator('[data-language="en"]').click();
    assert.equal(await page.locator('html').getAttribute('lang'), 'en', route);
    const residual = (await snapshot(page)).filter(text => /[А-Яа-яЁё]/.test(text));
    assert.deepEqual(residual, [], route + ': untranslated strings');
    await page.locator('[data-language="ru"]').click();
    assert.deepEqual(await snapshot(page), russian, route + ': Russian round trip');
    await page.goto(site + route + '?lang=en');
    await page.waitForFunction(() => window.CicadaI18n?.language === 'en');
    assert.deepEqual((await snapshot(page)).filter(text => /[А-Яа-яЁё]/.test(text)), [], route + ': direct English link');
    for (const width of [1440, 1024, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const layout = await page.evaluate(() => {
        const rect = document.querySelector('.language-selector').getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth > innerWidth + 1, selectorVisible: rect.x >= 0 && rect.right <= innerWidth };
      });
      assert.equal(layout.overflow, false, route + ': page overflow at ' + width);
      assert.equal(layout.selectorVisible, true, route + ': selector clipped at ' + width);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    console.log('PASS', route, 'RU/EN, full text, attributes, round trip, responsive header');
  }

  await page.goto(site + '/competitors/?lang=en&view=registry#registry-panel');
  await page.waitForFunction(() => window.CicadaI18n?.language === 'en');
  await page.locator('[data-view="gateways"]').click();
  await page.locator('[data-language="ru"]').click();
  assert.equal(await page.locator('[data-view="gateways"]').getAttribute('aria-selected'), 'true');
  assert.ok(page.url().includes('view=registry') && page.url().includes('#registry-panel'));
  await page.locator('[data-language="en"]').click();
  const external = page.locator('a[href^="https://nord-pay.com/"]').first();
  assert.equal(await external.getAttribute('href'), 'https://nord-pay.com/');
  await page.locator('.site-nav a[href*="projects.html"]').click();
  await page.waitForFunction(() => window.CicadaI18n?.language === 'en');
  await page.locator('.shared-platform-card').first().click();
  await page.locator('[data-language="ru"]').click();
  assert.equal(await page.locator('.shared-platform-card').first().getAttribute('aria-pressed'), 'true');
  await page.locator('[data-language="en"]').click();
  await page.goto(site + '/scheme.html');
  await page.waitForFunction(() => window.CicadaI18n?.language === 'en');
  await page.reload();
  await page.waitForFunction(() => window.CicadaI18n?.language === 'en');
  await page.goto(site + '/conclusions/?lang=en');
  await page.waitForFunction(() => window.CicadaI18n?.language === 'en');
  assert.equal(new URL(page.url()).searchParams.has('focus'), false);
  await page.locator('[data-workstream="deposit-addresses"] summary').click();
  await page.locator('[data-language="ru"]').click();
  assert.equal(await page.locator('[data-workstream="deposit-addresses"]').getAttribute('open'), '');
  await page.goto(site + '/roadmap/?lang=en#pay-by-link');
  await page.waitForFunction(() => window.CicadaI18n?.language === 'en');
  assert.equal(await page.locator('#pay-by-link').getAttribute('open'), '');

  // New content from page scripts must use the currently selected language.
  await page.evaluate(() => { const p = document.createElement('p'); p.id = 'translation-test'; p.textContent = 'Открытые вопросы'; document.body.append(p); });
  await page.waitForFunction(() => document.querySelector('#translation-test').textContent === 'Open questions');
  await page.locator('[data-language="ru"]').click();
  assert.equal(await page.locator('#translation-test').textContent(), 'Открытые вопросы');
  await page.evaluate(() => document.querySelector('#translation-test').remove());
  assert.deepEqual(failures, [], 'Browser errors');
  console.log('PASS navigation, persistence, query/hash preservation, dynamic content, tabs and disclosures');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
