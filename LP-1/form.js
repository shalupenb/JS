document.onsubmit = function(e){
    e.preventDefault();

    const userNameInput = e.target.querySelector('[name="user-name"]');
    if(!userNameInput){
        alert('В форме не найден элемент [name="user-name"]');
        return;
    }
    const userName = userNameInput.value.trim();
    
    if(userName.length == 0){
        setHelperMessage(userNameInput, "Поле не должно быть пустым", true);
    }
    else if (userName.length == 1){
        setHelperMessage(userNameInput, "Имя слишком короткое", true);
    }
    else{
        setHelperMessage(userNameInput, "", false)
    }
    const userPassInput = e.target.querySelector('[name="user-password"]');
    if(!userNameInput){
        alert('В форме не найден элемент [name="user-password"]');
        return;
    }
    const userPass = userPassInput.value.trim();
    if(userPass.length == 0){
        userPassInput.parentNode.querySelector(".error-message").innerText = "Поле не должно быть пустым"
        userPassInput.classList.remove("valid");
        userPassInput.classList.add("invalid");
    }
    else if (userPass.length < 3){
        userPassInput.parentNode.querySelector(".error-message").innerText = "Пароль должен содержать больше 3 символов"
        userPassInput.classList.remove("valid");
        userPassInput.classList.add("invalid");
    }
    else{
        userPassInput.classList.add("valid");
        userPassInput.classList.remove("invalid");
    }
    console.log(userName + " : " + userPass);
}

function setHelperMessage(inputElement, message, isError){
    const helper = inputElement.parentNode.querySelector(".helper-text");
    if(isError){
        helper.setAttribute("data-error", message)
        inputElement.classList.remove("valid");
        inputElement.classList.remove("validate");
        inputElement.classList.add("invalid");
    }
    else{
        helper.setAttribute("data-error", message)
        inputElement.classList.add("valid");
        inputElement.classList.add("validate");
        inputElement.classList.remove("invalid");
    }
}