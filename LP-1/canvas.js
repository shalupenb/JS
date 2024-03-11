document.addEventListener('DOMContentLoaded', () =>{
  const figure = document.getElementById("figure");
  if(!figure) throw "Element '#figure' not found";
  const context = figure.getContext('2d');
  window.figure = figure;
  window.gdc = context;

  const line1Button = document.getElementById("line-1-button");
  if(!line1Button) throw "Element '#line-1-button' not found";
  line1Button.onclick = drawLine1;
  const line2Button = document.getElementById("line-2-button");
  if(!line2Button) throw "Element '#line-2-button' not found";
  line2Button.onclick = drawLine2;
  const expandButton = document.getElementById("expand-button");
  if(!expandButton) throw "Element '#expandButton' not found";
  expandButton.onclick = expand;
  const resolutionButton = document.getElementById("resolution-button");
  if(!resolutionButton) throw "Element '#resolutionButton' not found";
  resolutionButton.onclick = resolute;
  const cosButton = document.getElementById("cos-button");
  if(!cosButton) throw "Element '#cosButton' not found";
  cosButton.onclick = drawCos;
  const axesButton = document.getElementById("axes-button");
  if(!axesButton) throw "Element '#axesButton' not found";
  axesButton.onclick = drawAxes;
  // Update color based on input change
  const colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener('change', () => {
    window.gdc.strokeStyle = colorPicker.value;
  });
});
function drawCos() {
  const w = 2;
  window.gdc.beginPath();
  window.gdc.lineWidth = w;
  window.gdc.lineTo(0,75 + 50 * Math.cos(0));
  for(let i = 0; i < 300; i += w) {
    window.gdc.lineTo(i,75 + 50 * Math.cos(i/10));
  }
  window.gdc.moveTo(29,15);
  window.gdc.stroke();
}
function drawAxes() {
  window.gdc.beginPath();
  window.gdc.lineWidth = 2;
  window.gdc.moveTo(150,0);
  window.gdc.lineTo(150,150);
  window.gdc.stroke();
  window.gdc.moveTo(0,75);
  window.gdc.lineTo(300,75);
  window.gdc.stroke();
}
function resolute() {
  window.figure.width = "600";
  window.figure.height = "300";
}
function expand() {
  window.figure.style.width = "600px";
  window.figure.style.height = "300px";
}
function drawLine1() {
  window.gdc.beginPath();
  window.gdc.lineWidth = 2;
  window.gdc.moveTo(15,15);
  window.gdc.lineTo(285,135);
  window.gdc.stroke();
}
function drawLine2() {
  window.gdc.beginPath();
  window.gdc.lineWidth = 2;
  window.gdc.moveTo(285,15);
  window.gdc.lineTo(15,135);
  window.gdc.stroke();
}

document.addEventListener('DOMContentLoaded', () => {
  loadAssets();
  window.location.hash = "";
  window.onhashchange = coinChanged;
  $("#clear-rates").click(clearRates);
  let canvas = $("#rates-canvas")[0];
  window.dcW = canvas.clientWidth;
  window.dcH = canvas.clientHeight; 
  canvas.width = window.dcW;
  canvas.height = window.dcH;
  window.dc = canvas.getContext('2d');
});
function clearRates() {
  const dc = document.getElementById("rates-canvas").getContext('2d');
  dc.clearRect(0, 0, window.dcW, window.dcH);
  window.location.hash = "";
}
function coinChanged() {
  //console.log(document.location.hash);
  if(window.location.hash.length <= 1) return;
  loadHistory(document.location.hash.substring(1));
}
function loadHistory(assetId) {
  $.ajax({
    method: "GET",
    url: `https://api.coincap.io/v2/assets/${assetId}/history?interval=d1`
  })
  .done(j => {
    const button = document.querySelector(`a[href="#${assetId}"]`);
    let r = Math.floor(200 * Math.random());
    let g = Math.floor(200 * Math.random());
    let b = Math.floor(200 * Math.random());
    let a = 0.8;
    if(button)
    {
      button.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
    }
    else{
      console.log(`#${assetId}`)
    }
    let minRate = Number(j.data[0].priceUsd);
    let maxRate = Number(j.data[0].priceUsd);
    let minTime = j.data[0].time;
    let maxTime = j.data[0].time;
    for(let rec of j.data) {
      let rate = Number(rec.priceUsd);
      if(rate > maxRate) maxRate = rate;
      if(rate < minRate) minRate = rate;
      if(rec.time > maxTime) maxTime = rec.time;
      if(rec.time < minTime) minTime = rec.time;
    }
    a = 1;
    const dc = document.getElementById("rates-canvas").getContext('2d');
    dc.beginPath();
    dc.lineWidth = 1;
    dc.strokeStyle = `rgba(${r},${g},${b},${a})`;
    for(let rec of j.data) {
      let rate = Number(rec.priceUsd);
      let x = (rec.time - minTime) * window.dcW / (maxTime - minTime);
      let y = window.dcH - 20 - (rate - minRate) * (window.dcH - 30) / (maxRate - minRate);
      dc.lineTo(x, y);
    }
    dc.stroke();
    a = 0.3;
    dc.fillStyle = `rgba(${r},${g},${b},${a})`;
    dc.lineTo(window.dcW,window.dcH - 10);
    dc.lineTo(0,window.dcH - 10);
    dc.fill();
    a = 1;
    dc.fillStyle = `rgba(${r},${g},${b},${a})`;
    dc.fillText(Math.round(maxRate), window.dcW - 40, 10);
    dc.fillText(Math.round(minRate), window.dcW - 40, window.dcH - 15);
    let date = new Date(minTime);
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if(mm < 10) mm = '0' + mm;
    if(dd < 10) dd = '0' + dd;
    let timeString = `${dd}.${mm}.${yyyy}`;
    dc.fillText(timeString, 5, window.dcH - 1);
    date = new Date(maxTime);
    yyyy = date.getFullYear();
    mm = date.getMonth() + 1;
    dd = date.getDate();
    if(mm < 10) mm = '0' + mm;
    if(dd < 10) dd = '0' + dd;
    timeString = `${dd}.${mm}.${yyyy}`;
    dc.fillText(timeString, window.dcW - 55, window.dcH - 1);
  });
}
function loadAssets() {
  $.ajax({
    method: "GET",
    url: "https://api.coincap.io/v2/assets?limit=7"
  })
  .done(function(j) {
    let html = "";
    for(let asset of j.data) {
      html +=`<a href="#${asset.id}" class="btn btn-flat lighten-5 rate-button">${asset.name}</a>`;
    }
    document.getElementById("assets-block").innerHTML = html;
  });
}
document.addEventListener("DOMContentLoaded", () => {
  $("#update-time").val("12:00");
  $("#local-button").click(localButtonClick);
  $("#session-button").click(sessionButtonClick);
  let saved = localStorage.getItem("saved");
  if(saved){
    $("#local-input").val(saved);
  }
  $("#local-delete").click( _ => {localStorage.removeItem("saved"); $("#local-input").val("");});
  setInterval(timerTick, 1000);
});
function localButtonClick() {
  localStorage.setItem(
    "saved",
    $("#local-input").val()
  );
  localStorage.setItem(
    "moment",
    new Date()
  );
}
function sessionButtonClick() {
  sessionStorage.setItem(
    "saved",
    $("#session-input").val()
  );
  sessionStorage.setItem(
    "moment",
    new Date()
  );
}
function timerTick() {
  let savedMoment = localStorage.getItem("moment");
  if (savedMoment) {
    let moment = new Date(savedMoment);
    let period = (new Date().getTime() - moment.getTime()) / 1000;
    $("#local-period").text(Math.round(period));
    let updateTime = $("#update-time").val().split(":");
    let updateHour = parseInt(updateTime[0]);
    let updateMinute = parseInt(updateTime[1]);
    let now = new Date();
    let nowHour = now.getHours();
    let nowMinute = now.getMinutes();
    if (nowHour > updateHour || (nowHour === updateHour && nowMinute >= updateMinute)) {
      localStorage.removeItem("saved");
      localStorage.removeItem("moment");
      localButtonClick();
    }
  } else {
    $("#local-period").text("---");
  }
  let savedSessionMoment = sessionStorage.getItem("moment");
  if(savedSessionMoment) {
    let moment = new Date(savedSessionMoment);
    let period = (new Date().getTime() - moment.getTime()) / 1000;
    $("#session-period").text(Math.round(period));
    if(period > 10) {
      sessionStorage.removeItem("saved");
      sessionStorage.removeItem("moment");
    }
  }
  else {
    $("#session-period").text("---");
  }
}