document.addEventListener('DOMContentLoaded', function(){
  const decrementButton = document.getElementById("decrement-button");
  const incrementButton = document.getElementById("increment-button");
  if(decrementButton) decrementButton.addEventListener('click', decrementButtonClick);
  if(incrementButton) incrementButton.addEventListener('click', incrementButtonClick);
  const calcValue = document.getElementById("calc-value");
  if (calcValue) {
    const value = calcValue.innerText;
    window.calcValue = Number(value);
  }
});
function decrementButtonClick(){
  window.calcValue-=1;
  const calcValue = document.getElementById("calc-value");
  calcValue.innerText = window.calcValue;
}
function incrementButtonClick(){
  window.calcValue+=1;
  const calcValue = document.getElementById("calc-value");
  calcValue.innerText = window.calcValue;
}


document.addEventListener('DOMContentLoaded', function(){
  const decrementButton2 = document.getElementById("decrement-button2");
  const incrementButton2 = document.getElementById("increment-button2");
  if(decrementButton2) decrementButton2.addEventListener('click', decrementButtonClick2);
  if(incrementButton2) incrementButton2.addEventListener('click', incrementButtonClick2);
  const calcValue2 = document.getElementById("calc-value2");
  if (calcValue2) {
    window.calc2 = {
      "element": calcValue2,
      "value" : Number(calcValue2.innerText)
    };
  }
});
function decrementButtonClick2(){
  window.calc2.element.innerText = (window.calc2.value -= 1);
}
function incrementButtonClick2(){
  window.calc2.element.innerText = (window.calc2.value += 1);
}
function helloClick(){
  const userInput = document.getElementById("user-name");
  const userInputSur = document.getElementById("user-surname");
  if( !userInput ){
    throw "Element 'user-name' not found";
  }
  const userName = userInput.value;
  const userSurName = userInputSur.value;
  if( !userName){
    alert('Please enter your name')
    return;
  }
  const outBlock = document.querySelector("#out-block");
  if(!outBlock) throw "Element #out-block not found";
  outBlock.innerHTML = `Hello, <B>${userName}</B> <B>${userSurName}</B>` ;
}