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

const gatewayShortlist = [
  {
    name: "NOWPayments",
    site: "https://nowpayments.io/",
    reason: "Функциональный benchmark для быстрого запуска массового merchant-продукта. Сильные стороны: 300+ активов, hosted checkout, инвойсы, payment links, POS, подписки, плагины, custody/customer accounts и mass payouts. Особое внимание стоит уделить модульности API, breadth of integrations и пути от простого checkout к платформенному wallet-продукту. Главный риск анализа — отсутствие собственной публичной VASP/payment licence и зависимость fiat-функций от партнёров."
  },
  {
    name: "CoinGate",
    site: "https://coingate.com/",
    reason: "Регулируемый европейский benchmark с наиболее цельным end-to-end контуром: checkout, billing, постоянные payment channels, conversion, refunds, payouts и fiat settlement. Сильные стороны: MiCA CASP и Payment Institution permissions, зрелый API v2, sandbox, OpenAPI, granular API permissions и прозрачная обработка callbacks. В анализе важны операционные controls, reconciliation, payout approvals и сочетание crypto и fiat внутри одного business account."
  },
  {
    name: "0xProcessing",
    site: "https://0xprocessing.com/",
    reason: "API-first benchmark для crypto-native и high-risk сценариев. Сильные стороны: invoices, static wallets, recurring payments, white label, Web3 checkout, virtual POS, массовые выплаты и широкая multi-chain поддержка. Компания полезна для изучения гибкости кастомной интеграции и прямых blockchain-flow. При этом публичная VASP/payment licence не найдена, поэтому продуктовые идеи нужно отделять от regulatory и counterparty-risk модели."
  }
];

const gatewayComparison = [
  {
    feature: "Hosted checkout",
    description: "Готовая платёжная страница принимает сумму и валюту заказа, показывает доступные активы, адрес или QR и отслеживает подтверждение. Она сокращает время интеграции и переносит основную поддержку payer UX на провайдера.",
    values: ["Да", "Да", "Да: redirect/iFrame"],
    conclusion: "Базовый паритет для всех трёх. Нужны адаптивная страница, брендирование, выбор сети, понятный таймер, статусы подтверждений и восстановление незавершённого платежа. Для снижения зависимости от провайдера checkout должен использовать тот же Payment Intent, что и собственный embedded flow."
  },
  {
    feature: "Инвойсы и payment links",
    description: "Инвойс фиксирует сумму, валюту, назначение и срок оплаты. Payment link позволяет принять платёж без разработки сайта и подходит для продаж, услуг, billing и ручного выставления счетов.",
    values: ["Да", "Да: Billing API", "Да"],
    conclusion: "Функция обязательна для self-service и sales-assisted onboarding. Паритет включает branded links, срок действия, повторную отправку, metadata/order ID, PDF или printable view и единый lifecycle с API-инвойсами."
  },
  {
    feature: "REST API и webhooks",
    description: "API создаёт платежи, получает статусы и управляет связанными операциями. Webhooks передают изменения серверу мерчанта и устраняют необходимость постоянного polling.",
    values: ["Да", "Да", "Да"],
    conclusion: "Все три закрывают базовый API flow. Для паритета нужны idempotency, подпись webhook, retry policy, event IDs, replay из кабинета, IP allowlist, versioning и журнал доставки. Документация должна описывать underpayment, reorg и late-payment edge cases."
  },
  {
    feature: "Sandbox и developer tooling",
    description: "Sandbox позволяет тестировать интеграцию без реальных средств. К developer tooling относятся SDK, OpenAPI/Postman, тестовые callbacks, примеры ошибок и диагностические логи.",
    values: ["Да", "Да: sandbox/OpenAPI", "Тестовые платежи"],
    conclusion: "CoinGate задаёт самый полный публичный стандарт. Паритет должен включать отдельные test keys, детерминированное прохождение всех статусов, webhook simulator и production checklist. У 0xProcessing нужно проверить, является ли test flow полноценной изолированной средой."
  },
  {
    feature: "CMS и e-commerce плагины",
    description: "Готовые плагины добавляют crypto payment method в интернет-магазин и синхронизируют статусы заказа. Они уменьшают стоимость подключения малого и среднего бизнеса.",
    values: ["Да", "Да", "Не подтверждено"],
    conclusion: "NOWPayments и CoinGate закрывают plugin-led acquisition. Первый набор целесообразно ограничить WooCommerce, Shopify и WHMCS/OpenCart, вести version compatibility и automated regression tests. Для 0xProcessing публичное покрытие плагинами нужно подтвердить отдельно."
  },
  {
    feature: "Активы и сети",
    description: "Широкое покрытие активов повышает вероятность, что клиент найдёт удобный coin/network. Для реального продукта важнее поддержка BTC, ETH, USDT и USDC в нужных сетях, чем максимальное число малоиспользуемых токенов.",
    values: ["300+ активов", "Основные assets и L2", "85+ токенов / 18 сетей"],
    conclusion: "NOWPayments лидирует по широте, 0xProcessing — по заявленной multi-chain глубине, CoinGate — по управляемому набору с fiat conversion. Паритет следует строить вокруг приоритетной network matrix, memo/tag, confirmation policy и единого asset directory API."
  },
  {
    feature: "Постоянные адреса",
    description: "Постоянный deposit address закрепляется за клиентом и принимает повторные пополнения без нового invoice. Сценарий нужен для gaming, wallets, exchanges и внутренних customer balances.",
    values: ["Через Customer/Custody API", "Да: Payment Channels", "Да: static wallets"],
    conclusion: "CoinGate и 0xProcessing дают наиболее явную модель customer-to-address. Паритет включает один customer ID, несколько asset/network addresses, webhook attribution, Travel Rule fields, minimum deposit, архивирование и безопасную ротацию."
  },
  {
    feature: "Rate lock и отклонения оплаты",
    description: "Rate lock фиксирует курс на время оплаты. Правила underpayment, overpayment, late payment и partial payment определяют, когда заказ считается оплаченным и что происходит с расхождением.",
    values: ["Fixed-rate option", "Да: tolerance/callbacks", "Да"],
    conclusion: "Нужен управляемый state machine, а не только флаг paid. Паритет включает configurable tolerance, доплату, refund или merchant acceptance, неизменяемый audit trail и отдельные webhook events. Курс и срок фиксации должны быть видны payer и мерчанту."
  },
  {
    feature: "Автоконвертация",
    description: "Автоконвертация меняет входящий актив на выбранный stablecoin, crypto или fiat. Она снижает volatility exposure и упрощает treasury management.",
    values: ["Да", "Да", "Да: в stablecoins"],
    conclusion: "Все три подтверждают автоматическую конвертацию, но глубина правил различается. Паритет требует target asset, trigger, minimum amount, прозрачный spread/rate, исключения по активам и историю каждой conversion leg."
  },
  {
    feature: "Crypto и fiat settlement",
    description: "Settlement определяет, в каком активе мерчант получает выручку и когда она становится доступна. Fiat settlement дополнительно требует банковских партнёров, safeguarding и country-specific permissions.",
    values: ["Crypto + fiat через партнёров", "Crypto + EUR/USD/GBP", "Crypto; SEPA/SWIFT заявлены"],
    conclusion: "CoinGate является наиболее сильным подтверждённым benchmark. Для паритета нужны selectable settlement currency, расписание, minimum payout, settlement statement и reconciliation reference. У NOWPayments и 0xProcessing необходимо отдельно проверять партнёров и доступность по странам."
  },
  {
    feature: "Массовые выплаты",
    description: "Mass payouts отправляют средства множеству получателей через API или batch-файл. Сценарии включают withdrawals, affiliates, marketplace sellers, payroll и refunds.",
    values: ["Да", "Да: API/CSV/links", "Да"],
    conclusion: "Паритет включает API и CSV, address validation, fee preview, duplicate detection, approvals, whitelist, per-item statuses и повтор только failed items. CoinGate дополнительно показывает полезный pattern payout links и разделение creator/approver."
  },
  {
    feature: "Refunds",
    description: "Refund создаёт отдельную blockchain-выплату после необратимого входящего платежа. Он должен сохранять связь с исходным invoice и повторно проверять адрес, сеть и compliance risk.",
    values: ["Частично: через payout", "Да: full/partial API", "Не подтверждено"],
    conclusion: "CoinGate задаёт целевой уровень: full и partial refund, status tracking и callbacks. Паритет должен включать approval, KYT адреса, rate/fee policy и связь с original payment. Для NOWPayments и 0xProcessing требуется подтвердить нативный refund workflow."
  },
  {
    feature: "Recurring payments",
    description: "Recurring flow автоматизирует регулярные crypto-платежи для SaaS, memberships и donations. В зависимости от модели это серия инвойсов, recurring deposit channel или подтверждённый план списаний.",
    values: ["Да", "Да: billing/channels", "Да"],
    conclusion: "Все три закрывают сценарий разными моделями. Паритет должен явно разделять recurring invoice и wallet-authorized payment, хранить consent, поддерживать retry/dunning, pause/cancel и webhooks каждого периода."
  },
  {
    feature: "POS и QR",
    description: "POS позволяет принять платёж при физическом присутствии клиента. Кассир задаёт сумму, а клиент сканирует динамический QR или открывает checkout на своём устройстве.",
    values: ["Да", "Да", "Да: virtual POS"],
    conclusion: "Функцию можно строить на общем Payment Intent без отдельного backend. Для паритета нужны mobile-friendly merchant mode, кассиры и смены, receipts, быстрый refresh курса и восстановление оплаты после закрытия экрана."
  },
  {
    feature: "Custody и business balances",
    description: "Custody или внутренний business balance позволяет хранить выручку, конвертировать её и финансировать выплаты. Это расширяет продукт, но добавляет требования к safeguarding, ledger controls и лицензированию.",
    values: ["Да: Custody API", "Да: business account", "Wallet infrastructure"],
    conclusion: "NOWPayments и CoinGate предлагают наиболее явный account-based контур. Если custody входит в стратегию, нужны segregated ledger, withdrawal controls, proof/reconciliation, roles и policy для dormant funds. У 0xProcessing следует подтвердить юридическую и техническую модель хранения."
  },
  {
    feature: "White label и кастомизация",
    description: "White label скрывает бренд провайдера и позволяет адаптировать checkout, домен, цвета и коммуникации под мерчанта. Функция важна для PSP, платформ и enterprise-клиентов.",
    values: ["Да", "Частично: API/plugins", "Да"],
    conclusion: "NOWPayments и 0xProcessing сильнее позиционируют white label. Паритет должен включать custom domain, logo/colors, локализацию, receipt/email templates и configurable asset list. Полное скрытие провайдера не должно нарушать обязательные legal disclosures."
  },
  {
    feature: "Команды, роли и approvals",
    description: "Роли ограничивают доступ сотрудников к balances, API keys, refunds и payouts. Approvals снижают риск ошибочной или мошеннической выплаты.",
    values: ["Не подтверждено", "Да: permissions/approvals", "Не подтверждено"],
    conclusion: "CoinGate — основной benchmark операционного контроля. Паритет требует owner/admin/developer/finance roles, separate API permissions, maker-checker для payout/refund, audit log и немедленный revoke. У двух других глубину RBAC нужно проверять на demo."
  },
  {
    feature: "KYT, AML и санкции",
    description: "KYT анализирует blockchain exposure, а AML/KYB controls проверяют мерчанта и транзакции. Это влияет на автоматическое зачисление, review, freeze и возможность settlement.",
    values: ["Проверки заявлены", "Да: compliance checks", "KYT/KYB заявлены"],
    conclusion: "Паритет включает risk score, configurable decision rules, case management, evidence trail, sanctions screening и понятный appeal/release workflow. Само наличие проверки недостаточно: необходимо оценить providers, thresholds, false positives и coverage по сетям."
  },
  {
    feature: "Dashboard и reconciliation",
    description: "Dashboard объединяет платежи, balances, fees, conversions, refunds и settlements. Reconciliation связывает provider transaction с order ID, blockchain tx и банковским payout.",
    values: ["Да", "Да", "Да"],
    conclusion: "Все три имеют кабинет, но целевой паритет определяется качеством данных. Нужны фильтры и поиск, gross/net/fee breakdown, tx hash, settlement reference, CSV/XLSX export, часовые пояса, saved views и audit history."
  },
  {
    feature: "Регуляторный и юридический контур",
    description: "Юридический контур определяет contracting entity, разрешённые услуги и ответственность за средства. Регистрация, лицензия и партнёрская услуга имеют разный правовой смысл.",
    values: ["SVG entity; собственная licence не заявлена", "MiCA CASP LB002323; PI LB002324", "Seychelles entity; публичная licence не найдена"],
    conclusion: "CoinGate — единственный сильный регулируемый benchmark в этой тройке. NOWPayments и 0xProcessing полезны для функционального анализа, но требуют усиленного due diligence по custody, fiat partners, safeguarding и legal basis. Product parity не должен автоматически переносить их risk model."
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

const cryptoGateways = [
  {
    name: "NOWPayments", site: "https://nowpayments.io/",
    product: "Hosted checkout, инвойсы, payment links и buttons, subscriptions, POS, плагины, white label, custody и customer accounts.",
    integration: "REST API, webhooks, SDK/примеры, sandbox; отдельные API для payments, mass payouts, custody и recurring billing.",
    settlement: "Автоконвертация; crypto settlement и fiat withdrawal через партнёров. Массовые выплаты и управление payout wallets.",
    assets: "300+ активов; stablecoins и основные сети. Глобальное покрытие с исключёнными юрисдикциями.",
    entity: "FD Transfers LLC\nSaint Vincent and the Grenadines",
    regulatory: "Компания прямо указывает, что специальная лицензия в юрисдикции инкорпорации не требуется. Fiat-операции выполняются с лицензированными партнёрами; собственная платёжная/VASP-лицензия не заявлена.",
    risk: "Contracting entity и custody-модель менялись: текущая платформа предлагает и custody API, хотя часть материалов описывает non-custodial flow. Запросить договор, список fiat-партнёров, safeguarding, SLA и доступность по индустрии."
  },
  {
    name: "Cregis", site: "https://cregis.com/",
    product: "Payment Engine с hosted или custom checkout, order lifecycle, rate lock, partial/overpayment, доплатой и refund flow. Дополнительно WaaS и MPC wallet infrastructure.",
    integration: "Payment Engine API, подписанные callbacks/webhooks, test environment, IP allowlist; Team API для кошельков, балансов и отчётности.",
    settlement: "Автоматический crypto settlement примерно каждые 10 минут при достижении порога; внешний или Cregis wallet. Fiat settlement доступен по запросу.",
    assets: "Multi-chain/multi-currency; единое публичное количество активов не найдено. AML screening встроен в payment и wallet flows.",
    entity: "Cregis Technology Limited\nHong Kong\nUnits 2525–2526, Sun Hung Kai Centre, Wan Chai",
    regulatory: "В Terms сервис назван self-custodial blockchain payment infrastructure и «non-financial institution payment service». Публичная VASP/payment licence в проверенных официальных материалах не раскрыта.",
    risk: "Нужно разделить юридическую модель Payment Engine, WaaS и remittance: условия self-custodial wallet не обязательно покрывают custody и fiat settlement. Запросить licence memo, contracting entity, custody allocation и fiat partners."
  },
  {
    name: "0xProcessing", site: "https://0xprocessing.com/",
    product: "Checkout/payment forms, links, invoices, static wallets, recurring payments, crypto billing, Web3 gateway, virtual POS и white label.",
    integration: "API-first integration, webhooks с retry, test payments, iFrame/redirect checkout; статусы underpayment и ручное/автоматическое подтверждение.",
    settlement: "Автоконвертация входящих средств в stablecoins (VRCS), внутренний swap, массовые crypto payouts; заявлены SEPA/SWIFT bank payouts.",
    assets: "85+ токенов в 18 сетях; 20+ wallets. Заявлена работа в 180+ странах без GEO-ограничений.",
    entity: "14partners Limited\nRepublic of Seychelles\ncompany no. 243468",
    regulatory: "Публичная VASP/payment licence не найдена. Сайт сообщает, что специальная лицензия мерчанту не нужна, но не показывает собственный licence number или регулятора.",
    risk: "Очень широкие заявления «без лимитов/holds» и регистрация без KYC требуют усиленного DD. Privacy Policy упоминает KYC/KYB, что расходится с маркетингом; проверить custody, AML-процесс, fiat partners и правовую основу каждого рынка."
  },
  {
    name: "CoinPayments", site: "https://www.coinpayments.net/",
    product: "Hosted и white-label checkout, invoices, buy-now buttons, POS invoices, плагины, wallets и постоянные/временные адреса.",
    integration: "REST API, signed webhooks, SDK/Postman, invoice lifecycle, wallet/address API и per-instance sandbox.",
    settlement: "Auto-settlement в выбранную валюту или внешний адрес, internal wallets, conversion; payouts и refunds зависят от instance и продукта.",
    assets: "Десятки сетей и широкий каталог активов; фактический список и доступность зависят от platform instance и юрисдикции.",
    entity: "UAB Star Ventures\nLithuania\nregistered address: Lvivo str. 25-104, Vilnius",
    regulatory: "Для EEA: зарегистрирована в литовском реестре и уведомила FCIS как Virtual Currency Exchange Operator и Deposit Virtual Currency Wallet Operator. Это регистрационный режим, не подтверждённая MiCA CASP licence.",
    risk: "Contracting entity автоматически меняется по стране/instance. Перед интеграцией определить конкретную платформу A/B/C, актуальный MiCA transition status, custody/safeguarding, fiat partners и список доступных активов."
  },
  {
    name: "CryptoProcessing.com", site: "https://cryptoprocessing.com/",
    product: "Stablecoin/crypto gateway: checkout, invoices, links, channels/static addresses, plugins, API, POS и merchant reconciliation.",
    integration: "API/webhooks, merchant dashboard, payment tracking, compliance/KYT tooling; продукт рассчитан на pay-in, payouts, exchange и settlement.",
    settlement: "Settlement в crypto/stablecoins/fiat в зависимости от entity и рынка; merchant balances, exchange и payouts.",
    assets: "Stablecoins и основные crypto assets; доступность продуктов и активов зависит от юридического лица.",
    entity: "Dream Finance OÜ\nEstonia; registry code 14783543\nТакже Dream Finance US LLC и другие entities",
    regulatory: "Эстонская прежняя VASP licence FVT000166; MiCA CASP application находится на рассмотрении. С июля 2026 Dream Finance OÜ не подключает новых клиентов и ограничила активность. US entity зарегистрирована FinCEN как MSB 31000270020492.",
    risk: "Критический go-live риск: европейская entity прямо сообщает о приостановке onboarding до решения по MiCA. Нужно установить доступную contracting entity, подтвердить действующую авторизацию и state-level permissions для США."
  },
  {
    name: "B2BINPAY", site: "https://b2binpay.com/",
    product: "Merchant и Enterprise wallets, crypto checkout/invoices, custody и segregated wallets, exchange, KYT и treasury operations.",
    integration: "Business API, callbacks/webhooks, deposit addresses, payout API, sandbox, approval workflows и Travel Rule fields.",
    settlement: "Автоконвертация в denomination Merchant Wallet, crypto/fiat exchange и payouts; batch и approval controls. Enterprise Wallet хранит актив в исходной валюте.",
    assets: "350+ currencies заявлены для custodial продукта; основные сети, stablecoins и fiat denominations.",
    entity: "B2BINPAY El Salvador S.A. de C.V.\nB2BINPAY Mauritius Ltd",
    regulatory: "El Salvador: CNAD Digital Asset Service Provider и Central Reserve Bank Bitcoin Service Provider. Mauritius: FSC VASP licence GB24203002, классы broker-dealer, wallet и custodian.",
    risk: "Юрлицо и доступность зависят от региона; El Salvador entity ограничивает активный маркетинг в EU/UK/US. Уточнить contracting entity, wallet type, safeguarding, omnibus/segregated модель и fiat rail partners."
  },
  {
    name: "BitPay", site: "https://www.bitpay.com/",
    product: "Merchant acceptance, hosted invoices/checkout, payment links/buttons, e-commerce integrations, refunds и BitPay Send payouts.",
    integration: "REST API и libraries; invoices, webhooks, refunds, ledger/rates API и merchant dashboard.",
    settlement: "Мерчант может получать bank settlement или crypto в доступных рынках; BitPay действует агентом при приёме платежа. Отдельный BitPay Send для массовых выплат.",
    assets: "BTC, ETH, stablecoins и выбранные crypto assets/networks; список и функции ограничиваются юрисдикцией.",
    entity: "BitPay, Inc.\nDelaware, USA\nBitPay B.V., Netherlands; KvK 58655891 для EEA/UK/CH",
    regulatory: "BitPay Inc.: FinCEN MSB, money transmitter licences в применимых штатах, NY BitLicense no. 0000008. BitPay B.V. зарегистрирована и надзирается DNB по Wwft.",
    risk: "Сильный regulatory benchmark, но restricted-business policy жёстче, чем у offshore gateways. Проверить доступность индустрии, settlement country/currency, reserve/termination clauses и точную contracting entity."
  },
  {
    name: "Triple-A", site: "https://www.triple-a.io/",
    product: "Stablecoin/crypto checkout для web/app/store, invoice payments, crypto payouts и local-currency payouts.",
    integration: "Payment, stablecoin payout и fiat payout APIs; sandbox, webhooks и merchant onboarding/KYB.",
    settlement: "Приём stablecoins с settlement в USD/EUR/GBP и 30+ local currencies; reverse flow для выплат, funded fiat или stablecoins.",
    assets: "Фокус на stablecoins и локальных payout rails, а не максимальном числе altcoins. Несколько региональных entities.",
    entity: "Triple A Technologies Pte. Ltd.\nSingapore\nPaytop SAS (EU), Triple A Technologies Inc. (US)",
    regulatory: "Singapore MAS Major Payment Institution PS20200525. EU: ACPR Payment Institution и AMF MiCA CASP A2026-015. US: FinCEN MSB 31000330633586 и MTL NMLS 2514255. Canada: FINTRAC FMSB C10001348 и Bank of Canada PSP.",
    risk: "Наиболее сильная licence footprint в выборке, но продукт больше stablecoin/fiat orchestration, чем long-tail crypto gateway. Уточнить entity, asset coverage, safeguarding/trust account, charge/refund flow и restricted industries."
  },
  {
    name: "Plisio", site: "https://plisio.net/",
    product: "Hosted/white-label checkout, invoices, payment links, donations, plugins, multi-currency wallet и mass payouts.",
    integration: "API для invoices, balances и payouts; e-commerce plugins, callbacks и no-code invoice/QR flow.",
    settlement: "Crypto balances, auto-conversion в выбранную currency и mass withdrawals до 1,000 операций; fiat bank settlement публично не подтверждён.",
    assets: "15+ coins; отображение/конвертация в 160+ fiat currencies не означает fiat settlement.",
    entity: "Юрлицо и юрисдикция не раскрыты в публичных Terms\nTerms last updated 12.03.2019",
    regulatory: "Публичная VASP/payment licence или registration number в проверенных официальных материалах не найдены.",
    risk: "Высокий legal transparency risk: устаревшие Terms не идентифицируют контрагента и применимое право. До любого теста запросить certificate of incorporation, licence memo, custody architecture, AML/KYB policy и settlement flow."
  },
  {
    name: "CoinGate", site: "https://coingate.com/",
    product: "Hosted checkout, billing/payment links, payment channels, refunds, multi-currency business account, custody и merchant payouts.",
    integration: "REST API, callbacks, sandbox/demo и готовые плагины для популярных e-commerce платформ; роли и управление account access.",
    settlement: "Автоконвертация и settlement в EUR, USD или stablecoins; crypto payouts, deposit, swap и withdrawal внутри business account.",
    assets: "10+ crypto assets и ключевые stablecoins; точные сети и settlement currencies зависят от рынка и подключённого продукта.",
    entity: "UAB Decentralized\nLithuania\nentity code 303423510",
    regulatory: "Bank of Lithuania: MiCA CASP code LB002323. Также Payment Institution code LB002324 для разрешённого контура электронных денег и переводов.",
    risk: "Сильный EU-regulated benchmark. Нужно сопоставить две лицензии с конкретным flow, проверить safeguarding, тариф за conversion/withdrawal, restricted industries и доступность fiat settlement для страны мерчанта."
  },
  {
    name: "Cryptomus", site: "https://cryptomus.com/",
    product: "Hosted checkout, invoices, static wallets, recurring payments, donations, white label, business wallet, AML checker и mass payouts.",
    integration: "Merchant и payout API, webhooks/signatures, SDK и 20+ e-commerce modules; статусы partial/overpayment, recurring API и адреса для пополнений.",
    settlement: "Auto-withdrawal и автоконвертация, массовые выплаты, conversion; на сайте заявлены SEPA/SWIFT fiat withdrawals.",
    assets: "Широкий набор coins/networks и stablecoins; фактическая доступность зависит от юрисдикции, merchant category и текущего compliance review.",
    entity: "Xeltox Enterprises Ltd. (ранее Certa Payments Ltd.)\nBritish Columbia, Canada\nоператор бренда Cryptomus",
    regulatory: "FINTRAC MSB registration M22649585 указана в публичных документах. В октябре 2025 FINTRAC подтвердила штраф CAD 176,960,190 за 2,593 нарушения; компания обжаловала решение в Federal Court.",
    risk: "Критический compliance risk: регистрация MSB не равна лицензии, а санкция касается системных AML/reporting failures. До рассмотрения продукта запросить текущий статус регистрации и апелляции, независимый remediation report, banking partners и полный sanctions/KYT control set."
  },
  {
    name: "Confirmo", site: "https://confirmo.net/",
    product: "Crypto invoices через dashboard/API, checkout с выбором актива и сети, rate hold, QR/address, refunds и merchant payout workflows.",
    integration: "REST API, webhooks и merchant dashboard; invoice lifecycle поддерживает underpayment, overpayment, expiry и reconciliation.",
    settlement: "Settlement в fiat или crypto; crypto settlement выполняется ежедневно. Из-за отсутствия custody permission остаток crypto после двух business days автоматически конвертируется в fiat.",
    assets: "Поддерживаемые crypto/stablecoins и банковские валюты зависят от entity и страны клиента; модель ориентирована на EEA и международных B2B-мерчантов.",
    entity: "Confirmo Limited\nIreland\n8-34 Percy Place, Dublin 4, D04 P5K3\nNon-EEA: Confirmo SRL, Dominican Republic",
    regulatory: "Central Bank of Ireland CASP ref. C570624: exchange crypto↔funds, crypto↔crypto и transfer on behalf of clients; custody не разрешена. Confirmo SRL: trade licence 891936, commercial register 216924SD, tax ID 133565676.",
    risk: "Сильный и прозрачный EU benchmark, но отсутствие custody определяет auto-conversion и timing settlement. Проверить доступность checkout/fiat rails, reserve rules, bank cut-offs, возвраты и то, какая entity заключает договор."
  },
  {
    name: "MoonPay Commerce", site: "https://commerce.moonpay.com/",
    product: "Pay Links, hosted/embedded Checkout Widgets, Dynamic Links, subscriptions, Solana Pay for Shopify и card/Apple Pay on-ramp через MoonPay Ramps.",
    integration: "Developer API, SDK и widgets; merchant-defined checkout, callbacks и прямое зачисление в подключённый wallet без merchant balance у Commerce.",
    settlement: "Платёж направляется напрямую в кошелёк мерчанта. Auto off-ramp может выполняться через отдельного партнёра Iron; settlement perimeter отличается от основного Commerce продукта.",
    assets: "USDC, USDT, BTC, SOL, ETH и ERC-20/SPL assets; сотни токенов заявлены для доступных chains и wallet connections.",
    entity: "Helio Fintech Limited\nEngland and Wales\ncompany no. 13836904\nwholly owned by MoonPay Inc.",
    regulatory: "Commerce Terms описывают peer-to-peer non-custodial software и не указывают отдельную VASP/payment licence Helio. Лицензии других MoonPay group entities нельзя автоматически переносить на Commerce.",
    risk: "Нужно юридически разделить Commerce, Ramps и Iron off-ramp: у них разные providers, custody и договоры. Проверить supported countries/industries, wallet screening, refund handling, subscription consent и SLA внешнего off-ramp."
  },
  {
    name: "BlockBee", site: "https://blockbee.io/",
    product: "Hosted и bespoke checkout, deposit pages, subscriptions, payment links, storefront, POS/QR, Telegram payments, plugins и self-custodial mass payouts.",
    integration: "REST API, IPN/webhooks, libraries и plugins; reusable deposit addresses, custom checkout и API/CSV payouts до 100 адресов за одну транзакцию.",
    settlement: "Входящие средства автоматически пересылаются в wallet мерчанта; доступны автообмен и on-chain payouts из self-custodial wallet.",
    assets: "70+/100+ cryptocurrencies заявлены на разных актуальных страницах; stablecoins и 10+ blockchains. Точный список нужно фиксировать на дату интеграции.",
    entity: "CryptAPI LLC\nSaint Vincent and the Grenadines\nEuro House, Richmond Hill Road, Kingstown, P.O. Box 2897",
    regulatory: "Публичная VASP/payment licence или номер регистрации регулятора в Terms не указан. Сервис позиционируется как non-custodial gateway и проводит customer verification.",
    risk: "Offshore contracting entity и отсутствие публичного licence number требуют усиленного DD. Уточнить incorporation number, независимое подтверждение non-custody, KYT/sanctions providers, conversion counterparty, restricted countries и обработку failed forwarding."
  },
  {
    name: "BVNK", site: "https://www.bvnk.com/",
    product: "Enterprise pay-ins и payouts, virtual fiat accounts, stablecoin wallets, conversion/FX, payment orchestration и embedded wallets для платформ.",
    integration: "API-first platform, webhooks, sandbox, customer onboarding, wallet creation и embedded compliance flows; ориентирована на крупные B2B volumes.",
    settlement: "Приём crypto/stablecoins с settlement в fiat или crypto, global payouts, on/off-ramp и unified fiat/stablecoin balances.",
    assets: "Работа в 130+ странах; stablecoins, crypto и fiat rails USD/EUR/GBP. Публичный eligibility ориентирован на компании от примерно USD 500k monthly volume.",
    entity: "System Pay Services (Malta) Limited\nMalta; company no. C66961\nТакже UK и US regulated group entities",
    regulatory: "Malta: MFSA-authorised EMI и MiCA CASP C66961. UK: System Pay Services Ltd, FCA EMI ref. 901057. US: System Pay Services (US), Inc., FinCEN MSB и state MTLs, NMLS 2531294.",
    risk: "Сильный regulatory и enterprise benchmark, но это более широкий payments stack, чем готовый SMB checkout. Определить contracting entity и модуль, проверить minimum volume, custody/safeguarding, pricing, supported industries и country-by-country licence scope."
  }
];

const canadaRegistry = [
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
  const identity = element("div", "company-identity");
  const icon = element("span", "company-favicon");
  const fallback = element("span", "company-favicon-fallback", item.name.trim().charAt(0).toUpperCase());
  const image = document.createElement("img");
  const hostName = new URL(item.site).hostname.replace(/^www\./, "");
  image.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostName)}&sz=64`;
  image.alt = "";
  image.loading = "lazy";
  image.decoding = "async";
  image.addEventListener("error", () => icon.classList.add("is-fallback"));
  const link = element("a", "company-link", item.name);
  link.href = item.site;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  const copy = element("div", "company-copy");
  const host = element("span", "company-host", hostName);
  icon.append(fallback, image);
  copy.append(link, host);
  identity.append(icon, copy);
  wrapper.append(identity);
  return wrapper;
}

function renderShortlist() {
  const body = document.querySelector("#shortlist-body");
  shortlist.forEach((item, index) => {
    const row = document.createElement("tr");
    row.id = `company-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}`;
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

function renderGatewayShortlist() {
  const body = document.querySelector("#gateway-shortlist-body");
  gatewayShortlist.forEach((item, index) => {
    const row = document.createElement("tr");
    row.id = `company-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}`;
    row.append(element("td", "index-cell", String(index + 1).padStart(2, "0")));
    const company = document.createElement("td");
    company.append(companyLink(item));
    row.append(company, element("td", "description-cell", item.reason));
    body.append(row);
  });
}

function renderGatewayComparison() {
  const body = document.querySelector("#gateway-comparison-body");
  gatewayComparison.forEach((item) => {
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
  canadaRegistry.forEach((item, index) => {
    const row = document.createElement("tr");
    row.append(element("td", "index-cell", String(index + 1).padStart(2, "0")));
    const company = document.createElement("td");
    company.append(companyLink(item), element("span", "canada-badge", "Canada entity"));
    row.append(company, element("td", "description-cell", item.product), element("td", "entity-cell", item.entity), element("td", "risk-cell", item.risk));
    body.append(row);
  });
}

function renderCryptoGateways() {
  const body = document.querySelector("#gateways-body");
  cryptoGateways.forEach((item, index) => {
    const row = document.createElement("tr");
    row.append(element("td", "index-cell", String(index + 1).padStart(2, "0")));
    const company = document.createElement("td");
    company.append(companyLink(item));
    row.append(
      company,
      element("td", "description-cell", item.product),
      element("td", "description-cell", item.integration),
      element("td", "description-cell", item.settlement),
      element("td", "description-cell", item.assets),
      element("td", "entity-cell", item.entity),
      element("td", "regulatory-cell", item.regulatory),
      element("td", "risk-cell", item.risk)
    );
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
renderGatewayShortlist();
renderGatewayComparison();
renderRegistry();
renderCryptoGateways();
const requestedView = new URLSearchParams(window.location.search).get("view");
selectView(["shortlist", "registry", "gateways"].includes(requestedView) ? requestedView : "shortlist");
if (window.location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ block: "start" }));

const productCards = [...document.querySelectorAll(".gateway-product")];

function closeProductCards(exceptCard) {
  productCards.forEach((card) => {
    if (card === exceptCard) return;
    card.classList.remove("is-open");
    card.querySelector(".product-info-toggle").setAttribute("aria-expanded", "false");
  });
}

productCards.forEach((card) => {
  const toggle = card.querySelector(".product-info-toggle");
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !card.classList.contains("is-open");
    closeProductCards(card);
    card.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".gateway-product")) closeProductCards();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProductCards();
});
