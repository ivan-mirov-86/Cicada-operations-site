/* Shared, in-place localization. Russian source markup remains the fallback. */
(() => {
  'use strict';
  const dictionary = window.CICADA_EN || {};
  const normalize = text => text.replace(/\s+/g, ' ').trim();
  const validLanguage = value => value === 'ru' || value === 'en';
  const preferenceKey = 'cicada-language';
  const attributes = ['aria-label', 'title', 'alt', 'placeholder', 'content'];
  const originals = new WeakMap();
  let language = 'ru';
  try { language = localStorage.getItem(preferenceKey) === 'en' ? 'en' : 'ru'; } catch (_) {}
  const requested = new URL(location.href).searchParams.get('lang');
  if (validLanguage(requested)) language = requested;

  function translate(text) {
    const key = normalize(text);
    return language === 'en' && Object.hasOwn(dictionary, key)
      ? text.replace(/\S[\s\S]*\S|\S/, () => dictionary[key]) : text;
  }

  function localizeValue(node, key, current, write) {
    let values = originals.get(node);
    if (!values) { values = new Map(); originals.set(node, values); }
    let entry = values.get(key);
    // A page script can replace text after the initial render.
    if (!entry || current !== entry.rendered) entry = { source: current, rendered: current };
    const rendered = translate(entry.source);
    if (rendered !== current) write(rendered);
    entry.rendered = rendered;
    values.set(key, entry);
  }

  function localizeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest('script, style, code, [data-i18n-ignore]')) return;
      localizeValue(node, 'text', node.data, value => { node.data = value; });
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || node.closest('[data-i18n-ignore]')) return;
    for (const name of attributes) {
      if (!node.hasAttribute(name) || (name === 'content' && !node.matches('meta[name="description"]'))) continue;
      localizeValue(node, name, node.getAttribute(name), value => node.setAttribute(name, value));
    }
    if (node.matches('a[href]')) localizeLink(node);
  }

  function localizeLink(link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || link.hasAttribute('download')) return;
    const url = new URL(href, document.baseURI);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (/\.[a-z\d]+$/i.test(url.pathname) && !/\.html$/i.test(url.pathname)) return;
    // Keep relative links deployable at both the domain root and a project subpath.
    const hashIndex = href.indexOf('#');
    const hash = hashIndex < 0 ? '' : href.slice(hashIndex);
    const pathAndQuery = hashIndex < 0 ? href : href.slice(0, hashIndex);
    const [path, query = ''] = pathAndQuery.split('?');
    const params = new URLSearchParams(query);
    params.set('lang', language);
    link.setAttribute('href', `${path}?${params}${hash}`);
  }

  function localizeTree(root) {
    localizeNode(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) localizeNode(walker.currentNode);
  }

  const selector = document.createElement('div');
  selector.className = 'language-selector';
  selector.setAttribute('role', 'group');
  selector.setAttribute('data-i18n-ignore', '');
  for (const [value, label] of [['ru', 'Ru'], ['en', 'En']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.dataset.language = value;
    button.addEventListener('click', () => setLanguage(value, true));
    selector.append(button);
  }
  document.querySelector('.site-header')?.append(selector);

  const observer = new MutationObserver(records => {
    observer.disconnect();
    for (const record of records) {
      if (record.type === 'childList') record.addedNodes.forEach(localizeTree);
      else localizeNode(record.target);
    }
    observe();
  });
  function observe() {
    observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: attributes });
  }

  function setLanguage(value, updateUrl = false) {
    language = validLanguage(value) ? value : 'ru';
    observer.disconnect();
    document.documentElement.lang = language;
    localizeTree(document.documentElement);
    selector.setAttribute('aria-label', language === 'en' ? 'Website language' : 'Язык сайта');
    selector.querySelectorAll('button').forEach(button => {
      const isRussian = button.dataset.language === 'ru';
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
      button.setAttribute('aria-label', language === 'en'
        ? (isRussian ? 'Switch to Russian' : 'Switch to English')
        : (isRussian ? 'Переключить на русский' : 'Переключить на английский'));
    });
    try { localStorage.setItem(preferenceKey, language); } catch (_) {}
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(history.state, '', url);
    }
    observe();
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
  }

  window.CicadaI18n = { translate, setLanguage, get language() { return language; } };
  window.addEventListener('popstate', () => {
    const value = new URL(location.href).searchParams.get('lang');
    if (validLanguage(value)) setLanguage(value);
  });
  setLanguage(language);
})();
