const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

stopBtnRef.disabled = true;
let intervalId = null;

startBtnRef.addEventListener(
  'click',
  changeBgColor.bind(null, startBtnRef, stopBtnRef)
);
stopBtnRef.addEventListener(
  'click',
  stopChangingBgColor.bind(null, startBtnRef, stopBtnRef)
);

// Setting interval for changing backgroundColor
function changeBgColor(startBtn, stoptBtn) {
  startBtn.disabled = true;
  stoptBtn.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
// Clear interval
function stopChangingBgColor(startBtn, stoptBtn) {
  startBtn.disabled = false;
  stoptBtn.disabled = true;
  clearInterval(intervalId);
}
// Generating random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
