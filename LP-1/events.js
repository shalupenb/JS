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