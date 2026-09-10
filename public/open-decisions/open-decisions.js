const decisionGroups = [
  {
    title: "Регуляторный периметр продукта",
    decisions: [
      "Покрывает ли действующая регистрация Canada MSB полный цикл Pay By Link: прием виртуальной валюты, перевод в пользу мерчанта, конвертацию и фиатный settlement? Нужно ли обновить сведения FINTRAC до запуска?",
      "Для каких стран мерчантов и покупателей запускается MVP и как география, тип мерчанта, его организационно-правовая форма, KYB/KYC-уровень и вид деятельности ограничивают доступные валюты, активы, сети и функции? Какая компания группы оказывает каждый этап услуги и какие дополнительные лицензии или ограничения применимы?",
      "Применимы ли к фиатной части продукта Retail Payment Activities Act и требования Bank of Canada, а к отдельным цифровым активам — регулирование securities или derivatives?",
      "Какие сценарии Pay By Link разрешены, а какие должны быть запрещены: оплата товаров и услуг, депозиты, пожертвования, P2P, marketplace, пополнение баланса, выплаты третьим лицам и иные переводы?",
      "В какой валюте мерчант может номинировать счет, какими фиатными валютами или цифровыми активами покупатель может его оплатить и в какой валюте Cicada осуществляет settlement мерчанту?",
      "Допускается ли оплата счета активом, отличным от указанного мерчантом? Кто в этом случае оказывает exchange, когда фиксируется курс и какие disclosures должны быть показаны покупателю?"
    ]
  },
  {
    title: "Роли сторон и движение активов",
    decisions: [
      "Кто на каждом этапе является client, requester, originator, conductor, beneficiary, third party и владельцем виртуальной валюты?",
      "Считается ли покупатель клиентом Cicada или лицом, запрашивающим transfer или exchange, когда он открывает страницу Cicada, выбирает актив и отправляет платеж?",
      "Достаточно ли постоянного поручения мерчанта на конвертацию, чтобы считать requester именно мерчанта? Кто является beneficiary входящего платежа?",
      "Как меняется квалификация при использовании отдельного адреса на инвойс, постоянного адреса мерчанта, omnibus wallet, стороннего VASP, self-hosted wallet или нескольких плательщиков?"
    ]
  },
  {
    title: "Данные покупателя, KYC и Travel Rule",
    decisions: [
      "В каких случаях покупателя необходимо идентифицировать: при платеже от CAD 1 000, при повышенном риске, при подозрении или при достижении CAD 10 000 одним платежом либо по агрегации?",
      "Какие данные и записи обязательны для обычного платежа CAD 1 000–9 999, если мерчант считается requester и полный KYC покупателя не проводится?",
      "Применяется ли Travel Rule к входящему платежу покупателя и какие сведения об originator и beneficiary должны быть получены? Как обрабатывать self-hosted wallets и неполные данные?",
      "Может ли мерчант собирать или проверять данные покупателя как agent или mandatary Cicada? Какие договоры, методы проверки, доказательства, сроки передачи и аудит необходимы?",
      "Какие поля checkout обязательны для каждого сценария и в какой момент должна завершаться проверка: до создания ссылки, до показа адреса, до зачисления или до конвертации?"
    ]
  },
  {
    title: "Пороги, агрегация и отчетность",
    decisions: [
      "В какой момент и на какой срок фиксируются котировка и CAD-эквивалент? Что происходит после истечения котировки и какой уровень недоплаты допускается автоматически? Как обрабатывать изменение цены, переплату, частичный, повторный или поздний платеж?",
      "По каким идентификаторам и в каком часовом окне применять правило 24 часов: покупатель, кошелек, third party, мерчант как beneficiary или их комбинация?",
      "Нужно ли агрегировать платежи разных покупателей одному мерчанту и кого идентифицировать, если совокупная сумма достигает CAD 10 000?",
      "Какие данные, сроки, ответственные и процедуры требуются для LVCTR, STR и санкционной отчетности, включая исправления, одновременную подачу нескольких отчетов и предотвращение tipping-off?"
    ]
  },
  {
    title: "Мерчанты и контроль использования продукта",
    decisions: [
      "Какой KYB-пакет обязателен: регистрационные документы, UBO и control structure, директора, представители, банковский счет, бизнес-модель, география, PEP, санкции и adverse media?",
      "Какие отрасли, товары, страны, типы мерчантов и цифровые активы запрещены либо требуют EDD и индивидуального согласования?",
      "Как без интеграции с сайтом подтверждать реальность underlying transaction и не допустить использования ссылок для P2P, cash-out, third-party collection, мошенничества или запрещенных товаров?",
      "Какие лимиты и ongoing monitoring необходимы на мерчанта, покупателя, кошелек, инвойс, сутки и месяц? Когда пересматривать KYB и risk rating и что происходит при истечении документов, понижении KYB-уровня или повышении риска: блокируются ли новые ссылки, прием платежей, конвертация, settlement и возвраты?"
    ]
  },
  {
    title: "KYT, санкции, возвраты и settlement",
    decisions: [
      "Какие активы и сети разрешены и какие KYT-категории, глубина blockchain exposure и risk thresholds приводят к автоматическому approve, hold, reject или ручной проверке?",
      "После какого количества blockchain confirmations платеж считается обнаруженным, подтвержденным и окончательным? Когда Cicada вправе уведомить мерчанта об успешной оплате и начать settlement?",
      "Какие лица, организации, VASP и кошельки проверяются по санкциям и кто принимает решение о блокировке, освобождении средств и регуляторной отчетности?",
      "Как обрабатывать возвраты на исходный, новый или omnibus wallet, а также ошибочную сеть, неверный токен, переплату и платеж после истечения ссылки? Нужен ли повторный KYT и sanctions screening?",
      "Допускается ли фиатный settlement только на счет мерчанта в том же юридическом имени? Как фиксируются курс, spread, тарифы, комиссии, сроки выплаты и основания для hold? Кто несет blockchain network или gas fees при оплате, конвертации, settlement, возврате и reversal и как они раскрываются мерчанту и покупателю?"
    ]
  },
  {
    title: "Договоры, данные и готовность к запуску",
    decisions: [
      "Какие документы обязательны: Merchant Agreement, Product Terms, Acceptable Use Policy, Payer Terms, Privacy Notice и Refund Policy? Какие права Cicada на запрос данных, лимиты, hold, reject, freeze и reporting необходимо закрепить?",
      "Кто является controller или processor данных покупателя, на каком основании данные передаются от мерчанта, где они хранятся и как совмещаются privacy-запросы с обязательным AML retention?",
      "Какие записи и audit trail нужно хранить, в каком формате и в течение какого срока, чтобы их можно было оперативно предоставить FINTRAC?",
      "Что должно быть утверждено до запуска: схема ролей и потоков, legal opinion, risk assessment, AML и sanctions procedures, Compliance Officer, обучение, case management, отчетность, контроль провайдеров и incident response?"
    ]
  }
];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const list = document.querySelector("#decision-list");
const head = element("div", "decision-row decision-head");
head.append(element("span", "", "Вопросы для решения"));
list.append(head);

decisionGroups.forEach((group, groupIndex) => {
  const groupSection = element("section", "decision-group");
  const groupTitle = element("button", "decision-group-title");
  const groupBody = element("div", "decision-group-body");
  const groupBodyId = `decision-group-${groupIndex + 1}`;

  groupTitle.type = "button";
  groupTitle.setAttribute("aria-expanded", "false");
  groupTitle.setAttribute("aria-controls", groupBodyId);
  groupTitle.append(element("span", "decision-group-heading", group.title), element("span", "decision-group-toggle", "+"));
  groupBody.id = groupBodyId;
  groupBody.hidden = true;

  group.decisions.forEach((decision, decisionIndex) => {
    const row = element("div", "decision-row");
    const title = element("div", "decision-title");
    title.append(element("b", "", String(decisionIndex + 1).padStart(2, "0")), element("strong", "", decision));
    row.append(title);
    groupBody.append(row);
  });

  groupTitle.addEventListener("click", () => {
    const isOpen = groupTitle.getAttribute("aria-expanded") === "true";
    groupTitle.setAttribute("aria-expanded", String(!isOpen));
    groupTitle.classList.toggle("is-open", !isOpen);
    groupTitle.querySelector(".decision-group-toggle").textContent = isOpen ? "+" : "−";
    groupBody.hidden = isOpen;
  });

  groupSection.append(groupTitle, groupBody);
  list.append(groupSection);
});
