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
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      window.alert("Please choose a date in the future");
      selectors.buttonStart.disabled = true;
    } else {
      selectors.buttonStart.disabled = false;
    }
  },
});

selectors.buttonStart.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = flatpickr("#datetime-picker").selectedDates[0];
  if (selectedDate) {
    selectors.buttonStart.disabled = true;
    clearInterval(countdownIntervalId);
    countdownIntervalId = setInterval(() => updateCountdown(selectedDate), 1000);
    updateCountdown(selectedDate); // Викликаємо один раз, щоб відображення було зразу
  }
}

function updateCountdown(selectedDate) {
  const timeRemaining = selectedDate - new Date();

  if (timeRemaining <= 0) {
    clearInterval(countdownIntervalId);
    displayCountdown(0, 0, 0, 0);
    selectors.buttonStart.disabled = false;
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
