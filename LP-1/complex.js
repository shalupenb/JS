document.addEventListener('DOMContentLoaded', () => {
  window.obj = {
    "Name": "User",
    "Surname":  "Smith"
  };
  updateCurrentFields();
  const addEventButton = document.getElementById("add-field-button");
  if(addEventButton) addEventButton.onclick = addFieldClick;
  window.users = [
    { name: "User", surname: "Experienced" },
    { name: "Admin", surname: "Networker" },
    { name: "Moder", surname: "Designer" },
  ];
  updateRegisteredUsers();
});

function updateRegisteredUsers() {
  const usersContainer = document.getElementById("registered-users");
  if (!usersContainer) throw "Element #registered-users not found";
  usersContainer.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
      </tr>
      <tr>
        <td>------------</td>
        <td>-----------------</td>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  for (let user of window.users) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.surname}</td>
    `;
    table.querySelector('tbody').appendChild(tr);
  }

  usersContainer.appendChild(table);
}

function updateCurrentFields(){
  const currentFields = document.getElementById("current-fields");
  if(!currentFields) throw "Element #current-field not found";
  currentFields.innerHTML = "";
  for(let key in window.obj){
    currentFields.innerHTML += `${key}:${window.obj[key]} <button data-key="${key}">X</button> <br/>` ;
  }
  processDeleteButtons();
}

function processDeleteButtons() {
  const buttons = document.querySelectorAll('button[data-key]');
  for( let button of buttons ){
    button.onclick = deleteButtonClick ;
  }
}

function deleteButtonClick(e) {
  const key = e.target.getAttribute("data-key");
  //console.log(key);
  delete window.obj[key];
  updateCurrentFields();
}

function addFieldClick(){
  const newFieldName = document.getElementById("add-field-name");
  if(!newFieldName) throw "Element #add-field-name not found";
  const newFieldValue = document.getElementById("add-field-value");
  if(!newFieldValue) throw "Element #add-field-value not found";
  
  const fieldName = newFieldName.value;
  const fieldValue = newFieldValue.value;
  
  if(Object.keys(window.obj).includes(fieldName)) {
    alert(`В об'єкті вже наявне поле '${fieldName}'`);
    return;
  }
  
  if(Object.values(window.obj).includes(fieldValue)) {
    alert(`В об'єкті вже наявне поле із значенням '${fieldValue}'`);
    return;
  }
  
  window.obj[fieldName] = fieldValue;
  updateCurrentFields();
}