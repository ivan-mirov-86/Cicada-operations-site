const projects = {
  one: {
    kicker: "PROJECT 01 · HIGH-VALUE MERCHANTS",
    title: "Merchant Pay-by-Link",
    description: "Мерчант создаёт счёт и отправляет клиенту платёжную ссылку. Cicada принимает криптовалюту и перечисляет мерчанту фиат на банковский счёт.",
    model: "Invoice-based",
    settlement: "Fiat · T+1 / T+2",
    channel: "Dashboard + Link",
    mvp: "Merchant registration → KYB → Invoice → Payment Link → Client KYC → Crypto payment → Fiat settlement",
    work: [
      ["Merchant onboarding", "Регистрация, KYB, UBO, KYC представителей, risk profile и верификация банковского счёта.", "Одобренный Merchant Account"],
      ["Merchant Dashboard", "Создание счетов, статусы платежей, settlements, отчёты, команда и настройки.", "No-code работа мерчанта"],
      ["Invoice & Payment Link", "Счёт в EUR, USD или AED, описание товара, срок действия, ссылка и QR-код.", "Готовый checkout для клиента"],
      ["Customer compliance", "KYC, sanctions, PEP, Source of Funds/Wealth и проверка исходящего кошелька.", "Решение approve / review / reject"],
      ["Crypto acceptance", "Rate lock, уникальный адрес, monitoring, KYT, confirmations, underpayment и overpayment.", "Статус Payment Accepted"],
      ["Exchange", "Продажа принятой криптовалюты через OTC, расчёт spread и комиссии.", "Fiat обеспечен для выплаты"],
      ["Settlement", "End-of-day batching, банковская выплата T+1/T+2 и reconciliation.", "Зачисление на счёт мерчанта"],
      ["Operations", "Refunds, compliance hold, ручные проверки, audit log и поддержка.", "Управляемый операционный процесс"]
    ]
  },
  two: {
    kicker: "PROJECT 02 · GAMING & CASINO",
    title: "Casino Crypto Processing",
    description: "Казино принимает криптовалютные депозиты игроков через Cicada, управляет балансами по активам, выполняет обмен и выводит средства в crypto или fiat.",
    model: "Account & balance-based",
    settlement: "Crypto + Fiat withdrawals",
    channel: "API + Dashboard",
    mvp: "Casino API → Player deposit address → KYT → Account credit → Merchant balance → Exchange → Crypto or fiat withdrawal",
    work: [
      ["Casino onboarding", "KYB, UBO, gaming license, бренды, домены, разрешённые географии и enhanced due diligence.", "Одобренный gaming merchant"],
      ["Account structure", "Casino, brands, websites, player accounts, asset balances, treasury wallets и API keys.", "Мультибрендовая модель аккаунтов"],
      ["Player Deposit API", "Player ID, deposit intent, уникальные или постоянные адреса, memo/tag и webhooks.", "Автоматическое пополнение игрока"],
      ["Player compliance", "KYC reliance, sanctions, PEP, wallet screening, Source of Funds, velocity и linked-account checks.", "Risk-based решение по депозиту"],
      ["Wallet & Custody", "MPC, hot/warm/cold wallets, sweeps, gas management, signing и address whitelisting.", "Контролируемое хранение активов"],
      ["Balances & Ledger", "Pending, available, reserved и blocked balances по монетам и сетям, double-entry ledger.", "Финансовый источник истины"],
      ["Exchange", "Crypto-to-crypto и crypto-to-fiat quotes, routing, liquidity limits и история операций.", "Управление merchant treasury"],
      ["Crypto withdrawals", "KYT адреса, whitelist, MFA, approvals, limits, Travel Rule и network fees.", "Безопасный внешний вывод"],
      ["Fiat payouts", "Конвертация, банковский payout, compliance approval и reconciliation.", "Вывод на банковский счёт"],
      ["API & Operations", "Balances, deposits, withdrawals, webhooks, retries, idempotency, reports и 24/7 monitoring.", "Production-grade processing"]
    ]
  },
  three: {
    kicker: "PROJECT 03 · ONLINE COMMERCE",
    title: "E-commerce Crypto Acquiring",
    description: "Интернет-магазин подключает Cicada через Plugin, SDK или API. Покупатель оплачивает заказ криптовалютой, а магазин получает crypto или fiat settlement.",
    model: "Order-based",
    settlement: "Fiat or Crypto",
    channel: "Plugin + SDK + API",
    mvp: "Install Plugin → Create order → Payment Intent → Crypto checkout → KYT → Order paid → Merchant settlement",
    work: [
      ["Merchant onboarding", "KYB, UBO, сайт и домен, категории товаров, refund policy и settlement accounts.", "Одобренный online merchant"],
      ["Integration channels", "REST API, Web SDK, Hosted Checkout, Payment Links и sandbox environment.", "Несколько способов подключения"],
      ["E-commerce Plugins", "Модули для Shopify, WooCommerce и выбранных CMS, настройки внутри панели магазина.", "Plug-and-play запуск"],
      ["Payment Intent", "Order ID, сумма, валюта, корзина, customer data, return URLs и правила комиссий.", "Связь заказа и платежа"],
      ["Customer Checkout", "Выбор актива и сети, rate lock, QR, copy address, WalletConnect и deep link.", "Удобная crypto-оплата"],
      ["Blockchain processing", "Monitoring, KYT, confirmations, reorg, late payment, underpayment и overpayment.", "Надёжный статус заказа"],
      ["Risk & Compliance", "Sanctions, transaction monitoring, KYC по порогам и EDD для дорогих товаров.", "Risk-based acceptance"],
      ["Refunds", "Полные, частичные и повторные возвраты с проверкой адреса получателя.", "Управление возвратами заказов"],
      ["Settlement", "Fiat или crypto payouts, batching, commissions, statements и reconciliation.", "Расчёт с интернет-магазином"],
      ["Dashboard & Reporting", "Заказы, tx hash, balances, settlements, plugins, API keys и webhooks.", "Полный операционный контроль"]
    ]
  }
};

const fields = {
  kicker: document.querySelector("#project-kicker"),
  title: document.querySelector("#project-title"),
  description: document.querySelector("#project-description"),
  model: document.querySelector("#project-model"),
  settlement: document.querySelector("#project-settlement"),
  channel: document.querySelector("#project-channel"),
  mvp: document.querySelector("#project-mvp"),
  table: document.querySelector("#project-table-body")
};

function renderProject(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  fields.kicker.textContent = project.kicker;
  fields.title.textContent = project.title;
  fields.description.textContent = project.description;
  fields.model.textContent = project.model;
  fields.settlement.textContent = project.settlement;
  fields.channel.textContent = project.channel;
  fields.mvp.textContent = project.mvp;
  fields.table.replaceChildren();

  project.work.forEach((item, index) => {
    const row = document.createElement("tr");
    const workstream = document.createElement("td");
    const number = document.createElement("span");
    const name = document.createElement("strong");
    const scope = document.createElement("td");
    const result = document.createElement("td");

    number.textContent = String(index + 1).padStart(2, "0");
    name.textContent = item[0];
    scope.textContent = item[1];
    result.textContent = item[2];
    workstream.append(number, name);
    row.append(workstream, scope, result);
    fields.table.append(row);
  });
}

document.querySelectorAll(".project-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".project-tab").forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    renderProject(tab.dataset.project);
  });
});
