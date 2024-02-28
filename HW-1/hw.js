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