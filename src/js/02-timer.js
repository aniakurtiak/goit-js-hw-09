import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectors = {
  datePicker: document.getElementById("datetime-picker"),
  startButton: document.querySelector("[data-start]"),
  daysValue: document.querySelector("[data-days]"),
  hoursValue: document.querySelector("[data-hours]"),
  minutesValue: document.querySelector("[data-minutes]"),
  secondsValue: document.querySelector("[data-seconds]"),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notify.info("Please choose a date in the future");
      selectors.startButton.disabled = true;
    } else {
      selectors.startButton.disabled = false;
    }
  },
};



let countdownInterval;

function startTimer() {
  const selectedDate = new Date(selectors.datePicker.value).getTime();

  function updateTimer() {
    const currentDate = new Date().getTime();
    const timeRemaining = selectedDate - currentDate;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      selectors.startButton.disabled = true;
      return;
    }

    const time = convertMs(timeRemaining);
    selectors.daysValue.textContent = addLeadingZero(time.days);
    selectors.hoursValue.textContent = addLeadingZero(time.hours);
    selectors.minutesValue.textContent = addLeadingZero(time.minutes);
    selectors.secondsValue.textContent = addLeadingZero(time.seconds);
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

selectors.startButton.addEventListener("click", handlerClick);
  function handlerClick() {
     selectors.startButton.disabled = true;
  startTimer();
};

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
  return value.toString().padStart(2, '0');
}

flatpickr("#datetime-picker", options);