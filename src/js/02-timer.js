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

let countdownIntervalId;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < this.config.defaultDate) {
      window.alert("Please choose a date in the future");
    } else if (selectedDates[0] > this.config.defaultDate) {
      selectors.buttonStart.disabled = false;
    } else {
      const now = new Date();
      const selectedDate = selectedDates[0];
      if (selectedDate > now) {
        const timeRemaining = selectedDate - now;
        selectors.buttonStart.disabled = false;
        clearInterval(countdownIntervalId);
        countdownIntervalId = setInterval(() => updateCountdown(timeRemaining), 1000);
        updateCountdown(timeRemaining); // Викликаємо один раз, щоб відображення було зразу
      } else {
        window.alert("Please choose a future date and time");
        selectors.buttonStart.disabled = true;
      }
    }
  },
});

selectors.buttonStart.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = flatpickr("#datetime-picker").selectedDates[0];
  if (selectedDate) {
    selectors.buttonStart.disabled = true;
    const timeRemaining = selectedDate - new Date();
    clearInterval(countdownIntervalId);
    countdownIntervalId = setInterval(() => updateCountdown(timeRemaining), 1000);
    updateCountdown(timeRemaining); // Викликаємо один раз, щоб відображення було зразу
  }
}

function updateCountdown(timeRemaining) {
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
