import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const selectors = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  buttonStart: document.querySelector('[data-start]'),
};

selectors.buttonStart.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate) {
      const currentDate = new Date();
      currentDate.setSeconds(0); // Обнулюємо секунди для поточного часу
      if (selectedDate <= currentDate) {
        window.alert("Please choose a date and time in the future");
        selectors.buttonStart.disabled = true;
      } else {
        selectors.buttonStart.disabled = false;
      }
    }
  },
});

let countdownIntervalId;

selectors.buttonStart.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = flatpickr("#datetime-picker").selectedDates[0];
  if (selectedDate) {
    const currentDate = new Date();
    currentDate.setSeconds(0); // Обнулюємо секунди для поточного часу
    if (selectedDate <= currentDate) {
      window.alert("Please choose a date and time in the future");
      selectors.buttonStart.disabled = true;
      return;
    }
    selectors.buttonStart.disabled = true;
    clearInterval(countdownIntervalId);
    countdownIntervalId = setInterval(updateCountdown, 1000, selectedDate);
    updateCountdown(selectedDate); // Викликаємо один раз, щоб не очікувати секунду до першого оновлення
  }
}

function updateCountdown(targetDate) {
  const timeRemaining = targetDate - new Date();
  if (timeRemaining <= 0) {
    clearInterval(countdownIntervalId);
    displayCountdown(0, 0, 0, 0);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);
  displayCountdown(days, hours, minutes, seconds);
}

function displayCountdown(days, hours, minutes, seconds) {
  selectors.days.textContent = addLeadingZero(days);
  selectors.hours.textContent = addLeadingZero(hours);
  selectors.minutes.textContent = addLeadingZero(minutes);
  selectors.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}