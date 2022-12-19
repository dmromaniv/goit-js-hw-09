import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('[data-start]');
startBtnRef.disabled = true;

const timerRef = document.querySelector('.timer').children;
let timerId = null;

let timerInstance = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtnRef.disabled = false;
    }
  },
});

startBtnRef.addEventListener('click', () => {
  timerId = setInterval(startTimer, 1000, timerInstance, timerRef);
});

function startTimer(instance, elementsRef) {
  const currentTime = new Date();
  const startTime = convertMs(
    instance.selectedDates[0].getTime() - currentTime.getTime()
  );
  updateTimer(elementsRef, startTime);
}

function updateTimer(elements, timeObj) {
  elements[0].firstElementChild.textContent = addLeadingZero(timeObj.days);
  elements[1].firstElementChild.textContent = addLeadingZero(timeObj.hours);
  elements[2].firstElementChild.textContent = addLeadingZero(timeObj.minutes);
  elements[3].firstElementChild.textContent = addLeadingZero(timeObj.seconds);

  if (Object.values(timeObj).every(el => el == 0)) {
    clearInterval(timerId);
    Notify.success('The countdown is complete');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, 0);
  }
  return value;
}
