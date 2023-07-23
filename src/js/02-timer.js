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
      window.alert("Please choose a date and time in the future");
      selectors.buttonStart.disabled = true;
    } else {
      selectors.buttonStart.disabled = false;
    }
  },
});

selectors.buttonStart.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = flatpickr("#datetime-picker").selectedDates[0];
  const currentDate = new Date();
  
  if (selectedDate && selectedDate > currentDate) {
    selectors.buttonStart.disabled = true;
    clearInterval(countdownIntervalId);
    countdownIntervalId = setInterval(() => updateCountdown(selectedDate), 1000);
    updateCountdown(selectedDate); // Викликаємо один раз, щоб відображення було зразу
  } else {
    window.alert("Please choose a date and time in the future");
  }
}

function updateCountdown(selectedDate) {
  const timeRemaining = selectedDate - new Date();

