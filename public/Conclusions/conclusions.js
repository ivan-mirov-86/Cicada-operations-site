const models = [
  {
    title: "Подключение и приём платежей",
    description: "Мерчант должен получить подходящий канал приёма оплаты — от no-code ссылки до полной API-интеграции — без изменения базовой логики платежа.",
    benchmarks: ["NOWPayments", "EukaPay"],
    points: ["merchant dashboard и Payment Links", "hosted checkout и QR-код", "REST API, SDK и webhooks", "CMS и e-commerce plugins", "единая модель Payment Intent"]
  },
  {
    title: "Управление платёжным циклом",
    description: "Cicada должна управлять платежом от создания счёта до финального расчёта, сохраняя понятный статус и связь между инвойсом, blockchain-транзакцией и settlement.",
    benchmarks: ["CoinGate", "NordPay"],
    points: ["payment statuses и signed webhooks", "underpayment, overpayment и late payment", "conversion и refunds", "settlement, payouts и approvals", "reconciliation и audit trail"]
  },
  {
    title: "Crypto processing и инфраструктура",
    description: "Общее Core-ядро должно скрывать сложность сетей, кошельков и транзакционного мониторинга от Pay by Link, iGaming и E-commerce Gateway.",
    benchmarks: ["0xProcessing", "PassimPay"],
    points: ["управляемая matrix активов и сетей", "уникальные и постоянные адреса", "blockchain monitoring и KYT", "wallet infrastructure и internal ledger", "treasury и маршрутизация транзакций"]
  },
  {
    title: "Compliance и расчёты",
    description: "Юридический и settlement-контур определяет, каких мерчантов можно обслуживать, кто контролирует средства и в какой форме Cicada исполняет обязательства перед мерчантом.",
    benchmarks: ["EukaPay", "CoinGate"],
    points: ["KYB/KYC и merchant risk profile", "sanctions, KYT holds и case management", "contracting entity и regulatory disclosures", "custody, safeguarding и segregation", "banking partners и fiat settlement"]
  }
];

const parityGroups = [
  { id: "must", title: "Must have", subtitle: "Без этого продукт не соответствует ожиданиям рынка", items: [["Hosted и embedded checkout", "Два базовых способа принять оплату: на странице Cicada и внутри интерфейса мерчанта."], ["Invoices и payment links", "Создание счёта из кабинета или API со ссылкой, QR-кодом и сроком действия."], ["REST API", "Единая модель объектов, idempotency, versioning и понятная документация."], ["Подписанные webhooks и retries", "Проверяемая подпись, повторная доставка и журнал событий по платежу."], ["Rate lock", "Прозрачная фиксация курса и срока действия котировки."], ["Payment deviation handling", "Отдельные сценарии partial, underpayment и overpayment."], ["Приоритетная network matrix", "BTC, ETH, USDT и USDC в заранее утверждённых сетях."], ["Crypto settlement", "Расчёт с мерчантом в исходном или выбранном цифровом активе."], ["Dashboard и reconciliation", "Связь invoice, blockchain transaction, fees и settlement reference."], ["KYB, KYT и sanctions controls", "Контроль мерчанта и транзакций с понятными hold-статусами."], ["Прозрачное contracting entity", "Клиент понимает, с каким юридическим лицом заключён договор и кто оказывает услугу."]] },
  { id: "next", title: "Следующий релиз", subtitle: "Функции, которые повышают ценность для B2B-мерчанта", items: [["Постоянные deposit addresses", "Адреса, связанные с customer ID, для top-ups, gaming и wallet-сценариев."], ["Mass payouts", "Пакетные выплаты с approvals, whitelist и статусом каждой операции."], ["Full и partial refunds", "Возврат с привязкой к исходному платежу, курсу и network fee."], ["Auto-conversion", "Автоматический обмен принятого актива по правилам мерчанта."], ["Roles, workspaces и approvals", "Разделение доступа и maker-checker для чувствительных операций."], ["CMS/e-commerce plugins", "Готовые подключения для ключевых платформ с управлением версиями."], ["Fiat settlement", "Банковский расчёт в доступной валюте с понятным SLA и statement."], ["Расширенный audit log", "История действий пользователей, решений и изменений настроек."]] },
  { id: "differentiate", title: "Дифференциаторы", subtitle: "Возможности для заметного отличия от рынка", items: [["Configurable conversion rules", "Правила обмена по активу, workspace, сумме и целевой валюте."], ["Payout links", "Получатель самостоятельно вводит проверенные реквизиты по защищённой ссылке."], ["Custom domains и white label", "Управляемый брендированный checkout без потери обязательных disclosures."], ["Единый Payment Intent", "Одна модель платежа для web, API, payment link и POS."], ["Web3 checkout", "WalletConnect, browser wallets и on-chain контекст для crypto-native продуктов."], ["Несколько юридических лиц", "Разные contracting entities и settlement profiles в одном workspace."], ["Finance-grade reconciliation", "Выгрузки, сверка и отчётность, рассчитанные на финансовые команды."], ["Compliance decision engine", "Настраиваемые правила, thresholds, evidence trail и case management."]] }
];

const companyAnchors = { "NOWPayments": "nowpayments", "CoinGate": "coingate", "0xProcessing": "0xprocessing", "NordPay": "nordpay", "PassimPay": "passimpay", "EukaPay": "eukapay" };
const companySites = { "NOWPayments": "nowpayments.io", "CoinGate": "coingate.com", "0xProcessing": "0xprocessing.com", "NordPay": "nord-pay.com", "PassimPay": "passimpay.io", "EukaPay": "eukapay.com" };

const workstreams = [
  { slug: "custody", title: "Custody и flow of funds", priority: "Критический", why: "Решение custodial, non-custodial или hybrid определяет лицензирование, архитектуру ledger, settlement, refunds, payouts и требования к безопасности.", questions: ["кто контролирует private keys", "когда средства считаются принадлежащими мерчанту", "где возникает merchant balance", "кто выполняет conversion", "как обеспечивается segregation и safeguarding", "что происходит при compliance hold или insolvency провайдера"], result: "Утверждённая схема flow of funds и custody decision", benchmarks: [] },
  { slug: "merchant-journey", title: "Полный merchant journey", priority: "Высокий", why: "Сравнение списков функций не показывает качество фактического сценария использования.", questions: ["KYB → API key → invoice → checkout → webhook", "deviation handling → settlement → refund → reconciliation"], result: "UX/API teardown и список обязательных состояний Payment Intent", benchmarks: ["CoinGate", "NOWPayments"] },
  { slug: "deposit-addresses", title: "Постоянные адреса и account top-ups", priority: "Высокий для gaming, wallet и platform use cases", why: "Постоянные адреса меняют модель идентификации клиента, мониторинга депозитов и сверки с внутренним балансом.", questions: ["customer-to-address mapping", "несколько активов и сетей на одного клиента", "Travel Rule data и deposit webhooks", "minimum deposit и address rotation", "late и unsupported deposits", "reconciliation с внутренним customer balance"], result: "Требования к Deposit Channel API", benchmarks: ["CoinGate", "0xProcessing", "NordPay", "PassimPay"] },
  { slug: "merchant-operations", title: "Merchant operations", priority: "Высокий", why: "Операционная зрелость определяет способность мерчанта безопасно управлять деньгами, командой и исключениями без постоянной ручной поддержки.", questions: ["роли, workspaces и maker-checker approvals", "payout whitelist и refunds", "audit log и exports", "settlement statements", "поиск и расследование проблемной транзакции"], result: "Структура кабинета и permission matrix", benchmarks: ["CoinGate", "NordPay", "EukaPay"] },
  { slug: "canada-model", title: "Канадская регуляторная и settlement-модель", priority: "Критический перед go-to-market", why: "Юридический периметр и реальная банковская инфраструктура определяют, какие услуги можно обещать и исполнять на канадском рынке.", questions: ["необходимое contracting entity и FINTRAC obligations", "применимость Bank of Canada PSP registration", "custody, safeguarding и banking partners", "CAD settlement и restricted industries", "complaint и freeze/appeal process"], result: "Regulatory perimeter memo и partner requirements", benchmarks: ["EukaPay", "NordPay"] }
];

function el(tag, className, text) { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }

function renderModels() {
  const grid = document.querySelector("#model-grid");
  models.forEach((model, index) => {
    const card = el("article", "model-card");
    const head = el("div", "model-card-head");
    head.append(el("span", "model-number", String(index + 1).padStart(2, "0")), el("h3", "", model.title));
    const description = el("p", "model-card-description", model.description);
    const benchmark = el("div", "model-benchmark"); benchmark.append(el("span", "", "Ориентиры исследования"), benchmarkLinks(model.benchmarks));
    const list = el("ul"); model.points.forEach((point) => list.append(el("li", "", point)));
    card.append(head, description, list, benchmark); grid.append(card);
  });
}

function renderParity() {
  const grid = document.querySelector("#parity-grid");
  parityGroups.forEach((group) => {
    const card = el("article", `parity-card parity-${group.id}`); card.dataset.parityPanel = group.id;
    const head = el("div", "parity-card-head"); const title = el("h3", "", group.title); title.append(el("span", "", String(group.items.length))); head.append(title, el("p", "", group.subtitle));
    const list = el("div", "parity-items");
    group.items.forEach(([name, description]) => { const detail = document.createElement("details"); const summary = el("summary", "", name); detail.append(summary, el("p", "", description)); list.append(detail); });
    card.append(head, list); grid.append(card);
  });
}

function benchmarkLinks(names) {
  const wrap = el("div", "benchmark-links");
  names.forEach((name) => {
    const link = el("a");
    const logo = el("span", "benchmark-logo");
    const fallback = el("span", "benchmark-logo-fallback", name.charAt(0).toUpperCase());
    const image = document.createElement("img");
    image.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(companySites[name])}&sz=64`;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => logo.classList.add("is-fallback"));
    logo.append(fallback, image);
    link.append(logo, el("span", "", name));
    link.href = `../competitors/?view=shortlist#company-${companyAnchors[name]}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    wrap.append(link);
  });
  return wrap;
}

function focusWorkstream(slug, shouldScroll = false) {
  const details = document.querySelector(`[data-workstream="${slug}"]`); if (!details) return;
  document.querySelectorAll(".research-item").forEach((item) => { if (item !== details) item.open = false; });
  details.open = true;
  document.querySelectorAll(".research-item").forEach((item) => item.classList.toggle("is-focused", item === details));
  const url = new URL(window.location.href); url.searchParams.set("focus", slug); history.replaceState(null, "", url);
  if (shouldScroll) details.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderResearch() {
  const list = document.querySelector("#research-list");
  workstreams.forEach((item, index) => {
    const detail = document.createElement("details"); detail.className = "research-item"; detail.dataset.workstream = item.slug; detail.open = index === 0;
    const summary = document.createElement("summary");
    const priorityClass = item.priority.startsWith("Критический") ? "research-priority is-critical" : "research-priority is-high";
    summary.append(el("span", "research-number", String(index + 1).padStart(2, "0")), el("span", "research-title", item.title), el("span", priorityClass, item.priority), el("span", "research-toggle", "+"));
    const body = el("div", "research-body");
    const why = el("div", "research-why"); why.append(el("p", "research-caption", "Зачем изучать"), el("p", "", item.why));
    const questions = el("div", "research-questions"); questions.append(el("p", "research-caption", "Что проверить")); const ul = el("ul"); item.questions.forEach((question) => ul.append(el("li", "", question))); questions.append(ul);
    const outcome = el("div", "research-outcome"); outcome.append(el("p", "research-caption", "Ожидаемый результат"), el("strong", "", item.result));
    if (item.benchmarks.length) { const benchmarks = el("div", "research-benchmarks"); benchmarks.append(el("p", "research-caption", "Benchmark-компании"), benchmarkLinks(item.benchmarks)); body.append(why, questions, outcome, benchmarks); } else { body.append(why, questions, outcome); }
    detail.addEventListener("toggle", () => { if (detail.open) focusWorkstream(item.slug); }); detail.append(summary, body); list.append(detail);
  });
}

document.querySelectorAll("[data-parity-tab]").forEach((button) => button.addEventListener("click", () => { const selected = button.dataset.parityTab; document.querySelectorAll("[data-parity-tab]").forEach((tab) => { const active = tab === button; tab.classList.toggle("active", active); tab.setAttribute("aria-selected", String(active)); }); document.querySelectorAll("[data-parity-panel]").forEach((panel) => panel.classList.toggle("mobile-active", panel.dataset.parityPanel === selected)); }));

renderModels(); renderParity(); renderResearch();
document.querySelector('[data-parity-panel="must"]')?.classList.add("mobile-active");
const requestedFocus = new URLSearchParams(window.location.search).get("focus"); if (requestedFocus) focusWorkstream(requestedFocus, true);
