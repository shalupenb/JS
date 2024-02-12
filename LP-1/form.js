document.onsubmit = function(e)
{
  e.preventDefault();
  const userNameInput = e.target.querySelector('[name="user-name"]');
  if(!userNameInput){
    alert('Cant find user-name');
    return;
  }
  const userName = userNameInput.value.trim();
  if(userName.length == 0) {
    userNameInput.parentNode.querySelector(".error-message").innerText = "Cant be empty";
    userNameInput.classList.remove("valid");
    userNameInput.classList.add("invalid");
  }
  else if(userName.length == 1) {
    userNameInput.parentNode.querySelector(".error-message").innerText = "Too short";
    userNameInput.classList.remove("valid");
    userNameInput.classList.add("invalid");
  }
  else {
    userNameInput.classList.add("valid");
    userNameInput.classList.remove("invalid");
  }
  
  const userPasswordInput = e.target.querySelector('[name="user-password"]');
  if(!userPasswordInput){
    alert('Cant find user-password');
    return;
  }
  const userPassword = userPasswordInput.value;
  console.log(userName + " : " + userPassword);
}