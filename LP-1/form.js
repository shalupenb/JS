document.onsubmit = function(e){
    e.preventDefault();

    const userNameInput = e.target.querySelector('[name="user-name"]');
    data = { inputElement: userNameInput, message: "Проверено", isError: false};
    if(!userNameInput){
        alert('В форме не найден элемент [name="user-name"]');
        return;
    }
    const userName = userNameInput.value.trim();
    if(userName.length == 0){
      data.message = "Не может быть пустым";
      data.isError = true;
    }
    else if (userName.length == 1){
      data.message = "Имя слишком короткое";
      data.isError = true;
    }
    else{
        let regEn = /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/;
        let regUa = /^[А-ЯІЇЄҐ][а-яіїєґ]+(\s+[А-ЯІЇЄҐ][а-яіїєґ]+)*$/;
    }
    setHelperMessage(data);

    //#region Email
    const userEmailInput = e.target.querySelector('[name="user-email"]');
    if(!userEmailInput){
      alert('В форме не найден элемент [name="user-email"]');
      return;
    }
    const userEmail = userEmailInput.value;
    data = { inputElement: userEmailInput, message: "Проверено", isError: false};
    if(userEmail.length == 0){
      data.message = "Не может быть пустым";
      data.isError = true;
    }
    setHelperMessage(data);
    //#endregion

    //#region Password
    const userPasswordInput = e.target.querySelector('[name="user-password"]');
    if(!userPasswordInput){
      alert('В форме не найден элемент [name="user-password"]');
      return;
    }
    const userPassword = userPasswordInput.value;
    data = { inputElement: userPasswordInput, message: "Проверено", isError: false};
    if(userPassword.length == 0){
      data.message = "Не может быть пустым";
      data.isError = true;
    }
    setHelperMessage(data);
    //#endregion

    //#region Phone
    const userPhoneInput = e.target.querySelector('[name="user-phone"]');
    if(!userPhoneInput){
      alert('В форме не найден элемент [name="user-phone"]');
      return;
    }
    let userPhone = userPhoneInput.value;
    data = { inputElement: userPhoneInput, message: "Проверено", isError: false};
    if(userPhone.length == 0){
      data.message = "Не может быть пустым";
      data.isError = true;
    }
    else{
      userPhone = userPhone.replace(/\D+/g, "");
      let reg = /^\d([-\s]?\d){6,10}$/;
      if(!reg.test(userPhone)){
        data.message = "May contain from 6 to 10 symbols";
        data.isError = true;
      }
      else{
        userPhoneInput.value = userPhone;
      }
    }
    setHelperMessage(data);
    //#endregion

    //#region Birthdate
    const userBirthDateInput = e.target.querySelector('[name="user-birthdate"]');
    if(!userBirthDateInput){
      alert('В форме не найден элемент [name="user-birthdate"]');
      return;
    }
    const userBirthDate = userBirthDateInput.value;
    data = { inputElement: userBirthDateInput, message: "Проверено", isError: false};
    if(userBirthDate.length == 0){
      data.message = "Не может быть пустым";
      data.isError = true;
    }
    setHelperMessage(data);
    //#endregion

function setHelperMessage({ inputElement, message, isError }){
    const helper = inputElement.parentNode.querySelector(".helper-text");
    if(isError){
        helper.setAttribute("data-error", message)
        inputElement.classList.remove("valid");
        inputElement.classList.remove("validate");
        inputElement.classList.add("invalid");
    }
    else{
        helper.setAttribute("data-success", message)
        inputElement.classList.add("valid");
        inputElement.classList.add("validate");
        inputElement.classList.remove("invalid");
    }
  }
}