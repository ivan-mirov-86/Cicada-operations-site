const shortlist = [
  {
    name: "NordPay",
    site: "https://nord-pay.com/",
    reason: "Ближайший прямой benchmark по полному merchant journey: инвойс или checkout, приём платежа, обработка отклонений, конвертация, settlement и payouts. Сильная сторона — широкий набор функций в одном кабинете: 80+ токенов и 17+ сетей, постоянные адреса, mass payouts, workspaces, роли и AML scoring. В анализе важно изучить UX high-risk мерчантов, модель командной работы и глубину автоматизации, отдельно проверяя публичные regulatory и custody-заявления."
  },
  {
    name: "EukaPay",
    site: "https://eukapay.com/",
    reason: "Канадский benchmark с наиболее цельным набором инструментов для обычного бизнеса: checkout, payment links, регулярные инвойсы, подписки, POS, плагины и payouts. Сильная сторона — связка crypto acceptance с банковским settlement в USD/EUR/GBP/CAD и бухгалтерским контуром, включая Xero. Особое внимание стоит уделить reconciliation, возвратам, омниканальному сценарию и качеству API/webhooks."
  },
  {
    name: "PassimPay",
    site: "https://passimpay.io/",
    reason: "Выбран как benchmark широты криптопроцессинга и готовых способов интеграции. Сильные стороны — 74+ активов в 18+ сетях, 12 CMS-плагинов, статические адреса, scheduled transfers, batching, Multisender, recurring payments и автоконвертация. Нужно изучить работу с большим потоком транзакций, массовыми выплатами и постоянными адресами, а также проверить фактическую доступность fiat settlement по рынкам."
  },
  {
    name: "Cryptix",
    site: "https://www.cryptix.io/",
    reason: "Представляет enterprise/high-risk сегмент, где важны быстрый запуск, контроль транзакций и compliance workflow. Сильные стороны — API, iFrame и payment links, real-time конвертация, refunds, instant/mass payouts, KYT/AML и выделенная поддержка. В фокусе анализа должны быть white-label UX, ручная обработка спорных платежей, SLA и разделение ответственности между техническим оператором и регулируемой компанией."
  },
  {
    name: "Cryptomus",
    site: "https://cryptomus.com/",
    reason: "Функциональный benchmark максимальной широты, а не образец regulatory posture. Сильные стороны — 100+ активов, большая библиотека плагинов, инвойсы и статические wallets, recurring payments, mass payouts, гибкие статусы under/overpayment, auto-convert и auto-withdrawal. Изучать стоит продуктовые edge cases, self-service настройки и developer tooling; регуляторные риски требуют использовать компанию только как функциональный ориентир."
  }
];

const comparison = [
  {
    feature: "Hosted checkout",
    description: "Готовая платёжная страница с суммой, активами и сетями, адресом или QR-кодом, таймером и статусом подтверждения.",
    values: ["Да", "Да", "Да", "Да: iFrame", "Да"],
    conclusion: "Нужен mobile-first checkout с брендингом, локализацией, выбором сети и понятными состояниями оплаты. Отдельно проверить deep-link в кошельки и восстановление сессии."
  },
  {
    feature: "Инвойсы и payment links",
    description: "No-code сценарий с суммой, валютой, назначением и сроком оплаты для B2B, услуг и удалённых продаж.",
    values: ["Да", "Да", "Да", "Да", "Да"],
    conclusion: "Паритет требует создания из dashboard и API, PDF, ссылки, QR, брендинга, expiry, customer reference и автоматической сверки с заказом."
  },
  {
    feature: "REST API",
    description: "Создание платежей и инвойсов, статусы, балансы, возвраты и выплаты из системы мерчанта.",
    values: ["Да", "Да", "Да", "Да", "Да"],
    conclusion: "Сравнивать нужно полноту жизненного цикла, версионирование, idempotency, pagination, rate limits и качество примеров. Нужны OpenAPI/Postman и единая модель объектов."
  },
  {
    feature: "Webhooks и статусы",
    description: "События об обнаружении транзакции, подтверждениях, изменении суммы, блокировке и settlement.",
    values: ["Да", "Да", "Да", "Да", "Да"],
    conclusion: "Нужны журнал доставок, ручной resend, signature rotation и статусы pending, paid, partial, overpaid, expired, refunded и blocked."
  },
  {
    feature: "Мультисеть и stablecoins",
    description: "Выбор блокчейна по кошельку, комиссии и скорости; stablecoins как основной платёжный актив B2B и gaming.",
    values: ["80+ / 17+", "Да", "74+ / 18+", "Да", "100+"],
    conclusion: "Базовое покрытие — USDT и USDC в TRON, Ethereum, BSC, Polygon и Solana плюс BTC/ETH. Важны memo/tag, confirmations и ошибочно выбранная сеть."
  },
  {
    feature: "Crypto и fiat settlement",
    description: "Получение мерчантом исходной криптовалюты, выбранного stablecoin или денег на банковский счёт.",
    values: ["Да", "Да", "Да", "Да", "Да"],
    conclusion: "Проверять реальные коридоры, contracting entity, settlement SLA и полный effective cost с учётом spread. Желателен выбор правила по workspace и активу."
  },
  {
    feature: "Rate lock и under/overpayment",
    description: "Фиксация курса и обработка недоплаты или переплаты из-за комиссии либо изменения отправленной суммы.",
    values: ["Да", "Да", "Частично", "Не подтверждено", "Да"],
    conclusion: "Нужны tolerance, доплата, ручное принятие, возврат переплаты и неизменяемый audit trail решения."
  },
  {
    feature: "KYB, AML/KYT и санкции",
    description: "Проверка компании и бенефициаров, происхождения средств и blockchain-риска до зачисления платежа.",
    values: ["Да", "Да", "Да", "Да", "Да"],
    conclusion: "Сравнивать момент screening, провайдера аналитики, thresholds, false positives, case management и время review. Мерчанту нужны ясные hold-статусы."
  },
  {
    feature: "Dashboard и reconciliation",
    description: "Связка order ID, invoice, blockchain transaction и банковской выплаты в единую цепочку.",
    values: ["Да", "Да", "Да", "Да", "Да"],
    conclusion: "Нужны поиск и фильтры, tx hash, gross/net amounts, fee breakdown, settlement reference, CSV/XLSX и audit log для нескольких юрлиц."
  },
  {
    feature: "Refunds",
    description: "Полный или частичный возврат отдельной blockchain-транзакцией с повторной проверкой адреса.",
    values: ["Частично", "Да", "Не подтверждено", "Да", "Да"],
    conclusion: "Нужны full/partial refund, approval workflow, KYT адреса, связь с исходным invoice и отдельный webhook. Определить network fee и курс возврата."
  },
  {
    feature: "CMS/e-commerce plugins",
    description: "Готовые модули, которые связывают заказ, crypto checkout и изменение статуса после webhook.",
    values: ["Да", "Да", "Да", "Не подтверждено", "20+"],
    conclusion: "Первый parity-набор целесообразно ограничить WooCommerce, Shopify, WHMCS/OpenCart и поддерживать отдельно с версиями и regression tests."
  },
  {
    feature: "Постоянные адреса",
    description: "Deposit address, закреплённый за клиентом или его внутренним балансом и используемый многократно.",
    values: ["Да", "Не подтверждено", "Да", "Не подтверждено", "Да"],
    conclusion: "Для gaming нужен адрес на customer ID, deposit webhooks, minimum deposit, архивирование и безопасная ротация."
  },
  {
    feature: "Массовые выплаты",
    description: "Отправка средств множеству получателей через CSV или API для withdrawals, комиссий и refunds.",
    values: ["Да", "Да", "Да", "Да", "Да"],
    conclusion: "Нужны предварительный расчёт fees, 2FA/approvals, whitelist, payout webhooks, частичное выполнение и повтор только failed items."
  },
  {
    feature: "Команды, роли и workspaces",
    description: "Разделение доступа сотрудников, брендов, проектов и юридических лиц внутри одного аккаунта.",
    values: ["Да", "Частично", "Не подтверждено", "Не подтверждено", "Частично"],
    conclusion: "Нужны custom roles, approval matrix, отдельные balances/API keys, audit log и быстрое отключение пользователя."
  },
  {
    feature: "Sandbox и developer tooling",
    description: "Test keys, документация, SDK, OpenAPI/Postman, тестовые webhooks и диагностические журналы.",
    values: ["Документация", "Да", "Частично", "Да", "Да"],
    conclusion: "Нужны изолированные test keys, детерминированные статусы, webhook simulator, примеры ошибок и соответствие production API contract."
  },
  {
    feature: "POS и QR",
    description: "Приём crypto-платежа при физическом присутствии клиента через динамический QR или терминал.",
    values: ["QR", "POS", "QR", "Не подтверждено", "QR"],
    conclusion: "Для retail нужен общий Payment Intent для web и POS, merchant app, смены кассиров, чеки и восстановление незавершённой оплаты."
  },
  {
    feature: "Автоконвертация",
    description: "Автоматический обмен входящих активов на stablecoin или fiat сразу, по расписанию или по достижении суммы.",
    values: ["По расписанию", "Settlement choice", "По правилам", "Автоматически", "Автоматически"],
    conclusion: "Нужны target asset, trigger, частичная конвертация, прозрачный rate/spread и история операций по workspace."
  },
  {
    feature: "Recurring payments",
    description: "Серия регулярных инвойсов или заранее подтверждённый платёжный план для подписок и memberships.",
    values: ["Не подтверждено", "Да: инвойсы/подписки", "Да", "Не подтверждено", "Да"],
    conclusion: "Не обязательная часть первого релиза, но важный SaaS-дифференциатор. Нужно определить consent, retry/dunning, отмену плана и webhooks каждого периода."
  }
];

const registry = [
  {
    name: "EukaPay", site: "https://eukapay.com/",
    product: "Hosted и встраиваемый checkout, payment links, разовые и регулярные инвойсы, подписки, POS и e-commerce плагины. REST API и webhooks для pay-in/payout; locked crypto→fiat conversion, выплаты на банк в USD/EUR/GBP/CAD, stablecoin settlement и интеграция с Xero.",
    entity: "NUCL Technologies Inc.\nOntario; corp. 2790229\nFINTRAC M22233887",
    risk: "Для клиентов вне США договор заключается с NUCL Technologies Inc.; для США используется отдельная компания. До интеграции подтвердить contracting entity, схему хранения средств, банковских партнёров, settlement SLA и тариф для нужной страны/индустрии."
  },
  {
    name: "PayitFast", site: "https://payitfast.com/",
    product: "Merchant Platform для криптоинвойсов и payment links: клиент платит поддерживаемым виртуальным активом, сервис конвертирует поступление в согласованную crypto/fiat валюту. Linked virtual IBAN, раздельный merchant balance, вывод и remittance, мониторинг платёжных потоков и доступы для команды.",
    entity: "Silverleaf E-Money Services Ltd.\nBritish Columbia; corp. BC1394414\nFINTRAC M23026009",
    risk: "Terms заявляют FINTRAC и регистрацию PSP в Bank of Canada, но часть операций выполняется через лицензированных партнёров. Запросить актуальную запись PSP, flow of funds, правила safeguarding, ответственность партнёров, сроки settlement и основания отклонения платежа."
  },
  {
    name: "Cryptopay Business", site: "https://cryptopay.me/business/",
    product: "Инвойсы, hosted checkout/widget, payment links, payment buttons и постоянные channel-адреса. REST API, callbacks, sandbox и CMS-плагины; business wallet, обмен, refunds, массовые выплаты и автоматический/банковский settlement, включая next-day bank settlement.",
    entity: "RICHIELD FINANCIAL SERVICES INC.\nBritish Columbia; corp. BC1507884\nFINTRAC C100000420",
    risk: "У группы несколько юридических лиц, и канадская компания не гарантирована для каждого продукта/региона. Получить проект service agreement с точной contracting entity, перечнем субподрядчиков, fiat-коридоров, ограниченных индустрий, reserve/hold и refund-процедур."
  },
  {
    name: "Breet Business", site: "https://breet.io/business",
    product: "Business Dashboard, crypto invoicing и OTC desk. API включает on-ramp, off-ramp, одноразовые или постоянные адреса, webhooks, конвертацию и payouts; 12+ активов. Входящий crypto автоматически конвертируется и выводится в USD/NGN/GHS на банк или mobile money.",
    entity: "Wonesupport Inc.\nAlberta; corp. 2023367614\nFINTRAC N300000354",
    risk: "Канадская компания есть, но продукт и банковский settlement ориентированы главным образом на Нигерию и Гану. В FINTRAC присутствуют ceased-запись и новая registered-запись той же компании; уточнить основание регистрации N300000354 и доступность USD settlement."
  },
  {
    name: "PawPayments", site: "https://pawpayments.com/",
    product: "Crypto-only gateway: hosted invoice checkout, REST API, webhooks и WooCommerce-плагин. Адреса и QR, 30+ криптовалют, настройка допустимого отклонения платежа, transaction tracking; автоконвертация в USDT/USDC, merchant balance и вывод на внешний crypto wallet.",
    entity: "PawPayments Inc.\nOntario; corp. 1001222007\nFINTRAC C10001337",
    risk: "Компания и FINTRAC-регистрация новые (2025), а публичная история операций короткая. Подтвердить отсутствие fiat settlement, custody/non-custody модель, объёмы, security audit, SLA, процесс AML-блокировок и возвратов."
  },
  {
    name: "DogPay", site: "https://www.dogpay.com/",
    product: "Payment-as-a-Service с checkout API, SDK, webhooks и плагинами для Shopify, WooCommerce, WordPress, Wix и Telegram. Приём USDT/USDC/ETH/BTC, crypto→fiat settlement, merchant dashboard, аналитика и reconciliation. Платформа также включает WaaS, BaaS, CaaS и fiat acquiring.",
    entity: "Stratuspay Fintech Limited\nBritish Columbia; corp. BC1516708\nFINTRAC C100000785",
    risk: "DogPay работает через группу компаний; канадская Stratuspay может быть не contracting entity для всех продуктов. Зафиксировать владельца средств и данных, поставщиков custody/cards/banking, применимое право, safeguarding, payout SLA и ответственность при блокировке."
  },
  {
    name: "Wyrei", site: "https://www.wyrei.com/",
    product: "API-интеграция и настраиваемый merchant dashboard. Управление несколькими crypto wallets, выбор способов оплаты и комиссий по сегментам/типам транзакций, мониторинг операций, отчётность и настройки аккаунта. Детальные checkout, payout и settlement-сценарии публично не раскрыты.",
    entity: "Wyrei Pay Inc.\nBritish Columbia; corp. BC1414574\nFINTRAC M23924381",
    risk: "На сайте FINTRAC registration называется лицензией, что юридически неточно. Публичных terms, тарифов и API-документации мало; проверить custody, банковских партнёров, safeguarding, complaints/refunds, settlement schedule, сети и независимые security-аудиты."
  },
  {
    name: "Cryptomus", site: "https://cryptomus.com/",
    product: "Инвойсы и payment links, hosted payment page, статические адреса, QR, REST API/SDK, webhooks и 20+ e-commerce модулей. Under/overpayment, доплата и refunds; recurring payments, mass payouts, auto-convert/auto-withdrawal, business wallet и вывод fiat через SEPA/SWIFT.",
    entity: "Xeltox Enterprises Ltd.\nBritish Columbia; corp. BC1368872\nFINTRAC M22649585",
    risk: "Критический regulatory risk: штраф FINTRAC CAD 176,96 млн в 2025 году и действия BCSC. В выгрузке FINTRAC статус указан Registered при expiry 2025-06-30; нужны юридическая проверка текущего статуса, результат апелляций и подтверждение права обслуживать выбранные рынки."
  },
  {
    name: "Sendcoins", site: "https://www.sendcoins.ca/payment-gateway",
    product: "Early-access gateway: dashboard, hosted checkout и charge links, API, real-time status webhooks, Shopify/WooCommerce плагины. Приём BTC/ETH/USDC в Mainnet, Arbitrum, Optimism и Base; хранение crypto либо автоматический CAD settlement на канадский банк.",
    entity: "Sendcoin Inc.\nNova Scotia; Registry ID 4657335\nFINTRAC: не найден / pending",
    risk: "Продукт находится в early access, а FINTRAC registration заявлена как pending и не найдена в реестре. Нет подтверждённой production-истории, публичного SLA, тарифов, custody/settlement-схемы и банковских партнёров; не включать в core shortlist до регистрации и тестовой транзакции."
  },
  {
    name: "NordPay", site: "https://nord-pay.com/",
    product: "Инвойсы, branded hosted checkout, REST API/webhooks и постоянные crypto wallets; 80+ токенов в 17+ сетях. Rate lock, partial/overpayment, auto-conversion, exchange, crypto/fiat settlement через SEPA/SWIFT, mass payouts CSV/API, workspaces, роли и AML risk scoring.",
    entity: "Chiang Huat Global Capital Limited\nFederal / Ontario; corp. 1569180-0\nFINTRAC C100000500",
    risk: "Канадская компания и FINTRAC подтверждены, но Terms используют право Кипра и Limassol, контактный телефон имеет код Грузии. Уточнить contracting entity и место операций; согласовать custody-формулировки, проверить good standing, PSP status, safeguarding и fiat settlement partners."
  },
  {
    name: "Pallapay", site: "https://www.pallapay.com/",
    product: "Hosted payment links и online checkout через API с IPN, sandbox, Python/PHP SDK и плагины WooCommerce/Magento/OpenCart/WHMCS. Multi-crypto acceptance, POS crypto→fiat, dashboard/balances и settlement в USD/EUR/GBP.",
    entity: "Pallapay Ltd.\nFederal / Ontario; corp. 1497760-2\nFINTRAC M23088601",
    risk: "Сайт указывает Pallapay Ltd. в Канаде, одновременно бренд связывается с Emirates Coin Investment LLC и другими компаниями группы. Требуются точная contracting entity, роль канадской компании, flow of funds, custody и fiat partners, применимое право, segregated accounts, reserves/holds и payout SLA."
  },
  {
    name: "Cryptix", site: "https://www.cryptix.io/",
    product: "Интеграция через REST API, HTML iFrame или payment links. Crypto checkout с real-time конвертацией в stablecoin/fiat, instant и mass payouts, refund workflow, KYT/AML screening, payment status tracking и merchant support; ориентирован также на gambling, betting и high-risk verticals.",
    entity: "IZOLDA PAY INC.\nBritish Columbia; corp. BC1442624\nFINTRAC M23274246",
    risk: "Регулируемые virtual-currency услуги новым клиентам оказывает IZOLDA PAY INC., а RSG Universal Payments Ltd. является техническим оператором. Зафиксировать разделение ответственности, обработчика данных, custody/safeguarding, complaints, payout SLA и применимое право."
  },
  {
    name: "EnoviPay", site: "https://enovipay.com/",
    product: "Managed crypto gateway с multi-asset invoices (USDT/USDC/BTC/ETH), QR, wallet-to-wallet и payment links. On/off-ramp через card/bank/APM, crypto↔fiat conversion, merchant wallet/account settlement, KYC/AML/KYT и автоматизация платёжных workflow через API integrations.",
    entity: "Enovipay Solutions Inc.\nBritish Columbia; corp. BC1428796\nFINTRAC M23335114",
    risk: "На сайте corporate number BC1428796 ошибочно назван номером FINTRAC; официальный MSB № M23335114. Проверить заявленную Bank of Canada PSP registration, settlement partners, flow of funds, custody, тарифы, SLA и референсы действующих мерчантов."
  },
  {
    name: "Overchain", site: "https://overchain.io/accept-crypto-payments/",
    product: "Payment widget для web/app/POS, digital invoices, payment links и development API. Уникальный адрес на транзакцию и 15-минутный rate lock; auto-convert в fiat, same-day bank settlement, crypto/fiat payouts, swap и reporting. Fireblocks custody, Chainalysis monitoring, 2FA и dual approval.",
    entity: "Overchain (Canada) Limited\nOntario; corp. 1000853786\nFINTRAC C100000561",
    risk: "Компания называет FINTRAC registration лицензией и использует широкие формулировки о надзоре. Terms предусматривают custodial wallet; запросить поставщика custody, сегрегацию и страхование, proof of reserves, PSP status, fiat rails, порядок AML freeze/appeal и security audit."
  },
  {
    name: "PassimPay", site: "https://passimpay.io/",
    product: "REST API, 12 CMS-плагинов, инвойсы, payment links, QR и статические адреса. 74+ активов / 18+ сетей; deposit/withdrawal/exchange webhooks, auto-conversion в stablecoins, scheduled transfers, transaction batching и Multisender, crypto exchange и EUR/USD settlement для eligible merchants.",
    entity: "NILESPAY FINANCE INC.\nBritish Columbia; corp. BC1516629\nFINTRAC C100000852",
    risk: "Канадская инкорпорация и FINTRAC подтверждены, но business address указан в Польше; у бренда также есть польская компания. Определить contracting entity и юрисдикцию данных/средств. Заявленные объёмы self-reported — нужны референсы, audit/SLA и подтверждение fiat-коридоров."
  },
  {
    name: "Due", site: "https://www.opendue.com/",
    product: "Stablecoin payments API и business account: virtual accounts для локальных pay-ins, automatic fiat→stablecoin conversion, USDT/USDC/EURC swaps и self-custodial wallet. Bulk payouts и payout links в 80+ стран через ACH/SEPA/Faster Payments/PIX/mobile money, роли, лимиты, approvals и audit trail.",
    entity: "Due Payments Inc.\nOntario; corp. 1000864948\nFINTRAC C100000185",
    risk: "Сильный смежный провайдер pay-in/pay-out и on/off-ramp, но публичный merchant checkout выражен слабее. Проверить возможность invoice acquiring, payer UX, webhooks, refunds, merchant reconciliation и точную entity на каждом payment rail."
  },
  {
    name: "ArtPay", site: "https://artpay.co/",
    product: "B2B business accounts с fiat и digital-asset balances. Входящие и исходящие domestic/cross-border платежи, FX, OTC-конвертация e-money↔stablecoins↔fiat и stablecoin on/off-ramp; удалённый onboarding и API-доступ. Публичный merchant checkout/инвойс не подтверждён.",
    entity: "BUYEASY TECHNOLOGY CO., LTD\nFederal / Ontario; corp. 1500317-2\nFINTRAC M23877619",
    risk: "Текущий ArtPay (artpay.co) — BUYEASY TECHNOLOGY CO., LTD; его нельзя смешивать с artpay.cloud/ARTCLUB 88. Позиционирование ближе к B2B accounts и stablecoin rails. Проверить checkout/invoice API, PSP record, account/custody providers, safeguarding и ownership бренда/IP."
  },
  {
    name: "Pay4B", site: "https://www.pay4b.com/",
    product: "B2B multicurrency e-wallet и выделенные/виртуальные IBAN. Внутренние переводы, SEPA/SWIFT pay-in/pay-out, transfers to/from crypto exchanges и crypto↔fiat операции для корпоративных клиентов. Публичные checkout, invoice API, webhooks и merchant acquiring flow не подтверждены.",
    entity: "Pay4B Limited\nOntario; corp. 1000707154\nFINTRAC N300000219",
    risk: "Публичные материалы подтверждают B2B payment infrastructure и crypto↔fiat, но merchant checkout, API, сети и settlement SLA описаны недостаточно. Запросить demo/API docs, contracting/partner map, custody/safeguarding, PSP record, pricing и reserve/hold policy."
  }
];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function companyLink(item) {
  const wrapper = element("div", "company-cell");
  const link = element("a", "company-link", item.name);
  link.href = item.site;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  const host = element("span", "company-host", new URL(item.site).hostname.replace(/^www\./, ""));
  wrapper.append(link, host);
  return wrapper;
}

function renderShortlist() {
  const body = document.querySelector("#shortlist-body");
  shortlist.forEach((item, index) => {
    const row = document.createElement("tr");
    row.append(element("td", "index-cell", String(index + 1).padStart(2, "0")));
    const company = document.createElement("td");
    company.append(companyLink(item));
    row.append(company, element("td", "description-cell", item.reason));
    body.append(row);
  });
}

function statusClass(value) {
  if (value.startsWith("Да")) return "status-yes";
  if (value === "Частично") return "status-partial";
  if (value === "Не подтверждено") return "status-unconfirmed";
  return "status-info";
}

function renderComparison() {
  const body = document.querySelector("#comparison-body");
  comparison.forEach((item) => {
    const row = document.createElement("tr");
    const feature = document.createElement("td");
    feature.append(element("strong", "feature-name", item.feature), element("span", "feature-description", item.description));
    row.append(feature);
    item.values.forEach((value) => {
      const cell = document.createElement("td");
      cell.append(element("span", `status-pill ${statusClass(value)}`, value));
      row.append(cell);
    });
    row.append(element("td", "conclusion-cell", item.conclusion));
    body.append(row);
  });
}

function renderRegistry() {
  const body = document.querySelector("#registry-body");
  registry.forEach((item, index) => {
    const row = document.createElement("tr");
    row.append(element("td", "index-cell", String(index + 1).padStart(2, "0")));
    const company = document.createElement("td");
    company.append(companyLink(item), element("span", "canada-badge", "Canada entity"));
    row.append(company, element("td", "description-cell", item.product), element("td", "entity-cell", item.entity), element("td", "risk-cell", item.risk));
    body.append(row);
  });
}

const tabs = [...document.querySelectorAll(".competitor-tab")];
const panels = [...document.querySelectorAll(".competitor-panel")];

function selectView(view) {
  tabs.forEach((tab) => {
    const selected = tab.dataset.view === view;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    const selected = panel.id === `${view}-panel`;
    panel.hidden = !selected;
    panel.classList.toggle("active", selected);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectView(tab.dataset.view));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let targetIndex = index;
    if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") targetIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") targetIndex = 0;
    if (event.key === "End") targetIndex = tabs.length - 1;
    tabs[targetIndex].focus();
    selectView(tabs[targetIndex].dataset.view);
  });
});

renderShortlist();
renderComparison();
renderRegistry();
selectView("shortlist");
