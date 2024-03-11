function loadQuestions() {
  return [
    "Вопрос один",
    "Вопрос два",
    "Вопрос три",
    "Вопрос четыре"
  ]
}
async function generateTable(questions) {
  let res = '<table class="quest-table">';
  let n = 1;
  for(let quest of questions) {
    res += 
    `<tr data-quest="${n}">
      <td>${quest}</td>
      <td><input name="quest-radio-${n}" id="quest-radio-${n}1" value="negative" type="radio"><label for="quest-radio-${n}1">:(</label></td>
      <td><input name="quest-radio-${n}" id="quest-radio-${n}2" value="neutral" type="radio"><label for="quest-radio-${n}2">:|</label></td>
      <td><input name="quest-radio-${n}" id="quest-radio-${n}3" value="positive" type="radio"><label for="quest-radio-${n}3">:)</label></td>
    </tr>`;
    n += 1;
  }
  res += "</table><button onclick='doneClick()'>Готово</button>";
  return res;
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("table-container").innerHTML = generateTable(loadQuestions());
  generateTable(loadQuestions()).then(html => document.getElementById("table-container").innerHTML = html);
});
function doneClick() {
  const questElements = document.querySelectorAll('[data-quest]');
  let results = [];
  let missing = [];
  for(let quest of questElements){
    let n = quest.getAttribute('data-quest');
    let name = `quest-radio-${n}`;
    let radio = quest.querySelector(`input[name="${name}"]:checked`);
    if(radio == null ){
      missing += n;
    }
    if(missing.length == 0){
      results.push({
        "question" : n,
        "answer": radio.value
      });
    }
  }
  let str = "Вы забыли ответить на вопросы: "
  for(let num of missing){
    str += num + " ";
  }
  alert(str);
  if(missing.length == 0){
    return;
  }
  console.log(results);
}