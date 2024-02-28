document.addEventListener('DOMContentLoaded', () =>{
  const loadRatesButton = document.getElementById("load-rates-button")
  if(!loadRatesButton){
    throw "Element #load-rates-button not found";
  }
  loadRatesButton.addEventListener('click', loadRatesButtonClick);
  const loadRatesButton2 = document.getElementById("load-rates-button2")
  if(!loadRatesButton2){
    throw "Element #load-rates-button2 not found";
  }
  loadRatesButton2.addEventListener('click', loadRatesByDateButtonClick);
});
function loadRatesButtonClick(){
  const outBlock = document.getElementById("out-block");
  if(!outBlock){
    throw  "Element #out-block not found";
  }
  const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
  fetch(url,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Connection': 'close'
    }
  })
  .then(r => {
    console.log(r);
    outBlock.innerHTML = `status-code: <b>${r.status}</b></br>ok: <b>${r.ok}</b><br>`;
    return r.json();
  })
  .then(j =>{
    let table = "<table class=\"rates-table\"><tr><th>Code<b data-sort='cc'>▼</b></th><th>Name<b data-sort='cc'>▼</b></th><th>Rate<b data-sort='cc'>▼</b></th></tr>";
    for(let rate of j){
      table += `<tr><td>${rate.cc}</td><td>${rate.txt}</td><td>${rate.rate}</td></tr>`;
    }
    table += "</table>";
    outBlock.innerHTML += table;
  });
}
function addSortListeners() {
  for(let b of document.querySelectorAll("[data-sort]")){
    b.addEventListener('click', console.log);
  }
}
function loadRatesByDateButtonClick(){
  const outBlock = document.getElementById("out-block2");
  if(!outBlock){
    throw  "Element #out-block2 not found";
  }
  const inputDate = document.getElementById("date-block");
  if(!inputDate){
    throw  "Element #date-block not found";
  }
  const formattedDate = inputDate.value.split('-').join('');
  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${formattedDate}&json`;
  console.log(url);
  fetch(url,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Connection': 'close'
    }
  })
  .then(r => {
    console.log(r);
    outBlock.innerHTML = `status-code: <b>${r.status}</b></br>ok: <b>${r.ok}</b><br>`;
    return r.json();
  })
  .then(j =>{
    let table = "<table class=\"rates-table\" id=\"ratesT\"><tr><th>R030<b id=\"sortTable0\">▼</b></th><th>Code<b id=\"sortTable1\">▼</b></th><th>Name<b id=\"sortTable2\">▼</b></th><th>Rate<b id=\"sortTable3\">▼</b></th></tr>";
    for(let rate of j){
      table += `<tr><td>${rate.r030}</td><td>${rate.cc}</td><td>${rate.txt}</td><td>${rate.rate}</td></tr>`;
    }
    table += "</table>";
    outBlock.innerHTML += table;
    const sortTableButton0 = document.getElementById("sortTable0");
    sortTableButton0.addEventListener('click', function() {sortTable(0);});
    const sortTableButton1 = document.getElementById("sortTable1");
    sortTableButton1.addEventListener('click', function() {sortTable(1);});
    const sortTableButton2 = document.getElementById("sortTable2");
    sortTableButton2.addEventListener('click', function() {sortTable(2);});
    const sortTableButton3 = document.getElementById("sortTable3");
    sortTableButton3.addEventListener('click', function() {sortTable(3);});
  });
}
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("ratesT");
  switching = true;
  dir = "asc";
  const headers = table.querySelectorAll("th");
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
      headers.forEach(header => header.classList.remove("active"));
      headers[n].classList.add("active");
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}