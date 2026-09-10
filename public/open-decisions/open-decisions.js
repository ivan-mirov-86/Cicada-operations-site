const decisions = ["Custodial, non-custodial или hybrid модель", "Основной сегмент: e-commerce, gaming, platforms или general B2B", "Нужен ли fiat settlement в первом релизе", "Нужны ли постоянные адреса в MVP", "Какие активы и сети входят в первую network matrix", "Будут ли payouts частью первого релиза", "Какой уровень white label требуется", "Какой юридический и банковский контур используется в Канаде"];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const list = document.querySelector("#decision-list");
const head = element("div", "decision-row decision-head");
["Решение", "Owner", "Target date", "Status", "Документ"].forEach((label) => head.append(element("span", "", label)));
list.append(head);

decisions.forEach((decision, index) => {
  const row = element("div", "decision-row");
  const title = element("div", "decision-title");
  title.append(element("b", "", String(index + 1).padStart(2, "0")), element("strong", "", decision));
  const owner = element("span", "decision-empty", "—"); owner.dataset.label = "Owner";
  const date = element("span", "decision-empty", "—"); date.dataset.label = "Target date";
  const status = element("span", "decision-status", "Не решено"); status.dataset.label = "Status";
  const documentLink = element("span", "decision-empty", "Не добавлен"); documentLink.dataset.label = "Документ";
  row.append(title, owner, date, status, documentLink);
  list.append(row);
});
