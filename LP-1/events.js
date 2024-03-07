document.addEventListener('DOMContentLoaded', () => {
  // document.getElementById("div1").addEventListener('click', div1Click);
  // document.getElementById("div1-2").addEventListener('click', div1Click);
  for(let btn of document.querySelectorAll(".div1")) {
    btn.addEventListener('click', div1Click);
    document.getElementById("input1").addEventListener('keydown', onKeydown);
    document.getElementById("input1").addEventListener('keypress', onKeypress);
    document.getElementById("input1").addEventListener('change', onChange);
  }
});
function onKeydown(e){
  e.target.parentNode.querySelector('span').innerText = `${e.key} (${e.keyCode})`;
  if(!((e.keyCode > 48 && e.keyCode < 57) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39)){
    e.preventDefault();
  }
}
function onKeypress(e){
  console.log(e);
}
function onChange(e){
  console.log(e);
}
function div1Click(e){
  const div = e.target.closest("div");
  const span = div.nextElementSibling;
  span.textContent = e.target;
  //console.log(e.target);
}
//////////////////DragEndDrop//////////////////
//DragEndDrop  - реалізужться взаємодією кількома подіями - затисканням кнопки миши і відпускання кнопки миші.

document.addEventListener('DOMContentLoaded' , ()=>{
  //затискання миші - лише в середині елементів , які це дозволяють
  for(let d of document.querySelectorAll('[data-type="draggable"]')) {
    d.addEventListener('mousedown', onDownMouse);
  }
  //document.getElementById("draggable").addEventListener("mousedown",onDounMouse);
  //рух та відпускання миші - блок з дозволенним перетягуванням, або весь документ
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  window.dragetElement = null;// взаємодія між подіями забезпечується через (глобальне поле обькту window);
  window.choice = {
    'positive': [],
    'negative': []
  };
});

function onDownMouse(e){
  window.dragetElement = e.target.closest('[data-type="draggable"]');
  e.preventDefault();
  //style.left - це те що прописанно у стилях. Якщо у стилях немає запису , то значення порожнє
  // !!!Для визначення реальних розмірів та позицій , використовуются інші(не стильові поля)
  console.log(window.dragetElement.offsetLeft,  window.dragetElement.offsetTop)
  // треба зафіксувати поточні координати миші - вони будут новою точкою відліку для блоку.
  window.dragetElement.tapX = e.pageX - window.dragetElement.offsetLeft;
  window.dragetElement.tapY = e.pageY - window.dragetElement.offsetTop;
  const container = window.dragetElement.closest(".dnd-container");
  if(!container){
      throw "Element #dnd-container not found";
  }
  window.dragetElement.maxX = container.clientWidth - window.dragetElement.offsetWidth;
  window.dragetElement.startX = window.dragetElement.style.left;
  window.dragetElement.startY = window.dragetElement.style.top;


}

function onMouseMove(e){
  if(window.dragetElement){
      let newX = e.pageX - window.dragetElement.tapX;
      let newY = e.pageY - window.dragetElement.tapY;
      if(newX<0 || newY<0 || newX> window.dragetElement.maxX){
          return;
      }
      window.dragetElement.style.left = newX + 'px';
      window.dragetElement.style.top = newY + 'px';
  }
}

function onMouseUp(e){
  if(window.dragetElement){
      window.dragetElement.style.zIndex = -1;
      const elements = document.elementsFromPoint(e.pageX, e.pageY);
      let isTarget = false;
      for(let element of elements){
        if(element.classList.contains("dnd-target")){
          isTarget = element;
        }
      }
      window.dragetElement.style.zIndex = 1;

      if(isTarget){
          console.log("in target");
          window.dragetElement.style.top = isTarget.offsetTop + isTarget.clientHeight / 2.0 - window.dragetElement.clientHeight / 2.0 + 'px';
          if(isTarget.classList.contains("dnd-positive")) {
            window.choice.positive.push(window.dragetElement);
          }
          else{
            window.choice.negative.push(window.dragetElement);
          }
          let shift = 50;
          for(let elem of window.choice.positive) {
            elem.style.left = shift + 'px';
            shift += 30;
          }
          shift = 400;
          for(let elem of window.choice.negative){
            elem.style.left = shift + 'px';
            shift += 30;
          }
          // if(isAllDragged()) {
          //   alert('Thx for your answers');
          //   location.reload();
          // }

      }
      else{
        window.dragetElement.style.left = window.dragetElement.startX;
        window.dragetElement.style.top = window.dragetElement.startY;
      }
      window.dragetElement = null;
  }
}
function isAllDragged() {
  let res = true;
  for(let d of document.querySelectorAll('[data-type="draggable"]')) {
    let rect = d.getBoundingClientRect();
    const elements = document.elementsFromPoint(rect.x, rect.y);
    let isTarget = false;
    for(let element of elements) {
      if(element.classList.contains("dnd-target")){
        isTarget = true;
      }
    }
    if(!isTarget){
      res = false;
    }
    //console.log(d.getBoundingClientRect());
  }
  return res;
}