document.addEventListener('DOMContentLoaded', () =>{
  const loadRatesButton = document.getElementById("load-rates-button")
  if(!loadRatesButton){
    throw "Element #load-rates-button not found";
  }
  loadRatesButton.addEventListener('click', loadRatesButtonClick);
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
    },
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
    // const sortRatesButton = document.getElementById("sort-rate")
    // if(!sortRatesButton){
    //   throw "Element #sortRatesButton not found";
    // }
    // const sortNamesButton = document.getElementById("sort-name")
    // if(!sortNamesButton){
    //   throw "Element #sortNamesButton not found";
    // }
    // const sortCodesButton = document.getElementById("sort-code")
    // if(!sortCodesButton){
    //   throw "Element #sortCodesButton not found";
    // }
  });
}
function addSortListeners() {
  for(let b of document.querySelectorAll("[data-sort]")){
    b.addEventListener('click', console.log);
  }
}