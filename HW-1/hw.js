document.addEventListener('DOMContentLoaded', () =>{
  const inputField = document.getElementById("username");
  if(!inputField){
    throw "Element #username not found";
  }
  inputField.addEventListener('input', validateInput);
  const openModalButton = document.getElementById("open-modal-button");
  if(!openModalButton){
    throw "Element #open-modal-button not found";
  }
  openModalButton.addEventListener('click', open);
  const closeModalButton = document.getElementById("close-modal-button");
  if(!closeModalButton){
    throw "Element #close-modal-button not found";
  }
  closeModalButton.addEventListener('click', close);
  const changeLightButton = document.getElementById("change-light-button"); 
  if(!changeLightButton){
    throw "Element #change-light-button not found";
  }
  changeLightButton.addEventListener('click', cnahgeLights);
  const changeLightButton1 = document.getElementById("change-light-button1"); 
  if(!changeLightButton1){
    throw "Element #change-light-button not found";
  }
  changeLightButton1.addEventListener('click', cnahgeLights1);
  const changeLightButton2 = document.getElementById("change-light-button2"); 
  if(!changeLightButton2){
    throw "Element #change-light-button not found";
  }
  changeLightButton2.addEventListener('click', cnahgeLights2);
});
function validateInput() {
  const usernameInput = document.getElementById("username");
  usernameInput.value = usernameInput.value.replace(/\d/g, "");
}
function open() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
}
function close() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
let currentLight = "red";
function cnahgeLights() {
  const redLight = document.getElementById("red-light");
  const yellowLight = document.getElementById("yellow-light");
  const greenLight = document.getElementById("green-light");
  switch (currentLight) {
    case "red":
        redLight.style.backgroundColor = "gray";
        yellowLight.style.backgroundColor = "yellow";
        currentLight = "yellow";
        break;
    case "yellow":
        yellowLight.style.backgroundColor = "gray";
        greenLight.style.backgroundColor = "green";
        currentLight = "green";
        break;
    case "green":
        greenLight.style.backgroundColor = "gray";
        redLight.style.backgroundColor = "red";
        currentLight = "red";
        break;
  } 
}
function cnahgeLights1() {
  const redLight = document.getElementById("red-light1");
  const yellowLight = document.getElementById("yellow-light1");
  const greenLight = document.getElementById("green-light1");
  switch (currentLight) {
    case "red":
        redLight.style.backgroundColor = "gray";
        yellowLight.style.backgroundColor = "yellow";
        currentLight = "yellow";
        break;
    case "yellow":
        yellowLight.style.backgroundColor = "gray";
        greenLight.style.backgroundColor = "green";
        currentLight = "green";
        break;
    case "green":
        greenLight.style.backgroundColor = "gray";
        redLight.style.backgroundColor = "red";
        currentLight = "red";
        break;
  } 
}
function cnahgeLights2() {
  const redLight = document.getElementById("red-light2");
  const yellowLight = document.getElementById("yellow-light2");
  const greenLight = document.getElementById("green-light2");
  switch (currentLight) {
    case "red":
        redLight.style.backgroundColor = "gray";
        yellowLight.style.backgroundColor = "yellow";
        currentLight = "yellow";
        break;
    case "yellow":
        yellowLight.style.backgroundColor = "gray";
        greenLight.style.backgroundColor = "green";
        currentLight = "green";
        break;
    case "green":
        greenLight.style.backgroundColor = "gray";
        redLight.style.backgroundColor = "red";
        currentLight = "red";
        break;
  } 
}