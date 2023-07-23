
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const selectors = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    buttonStart: document.querySelector('[data-start]'),
}
 selectors.buttonStart.disabled = true;


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
          selectors.buttonStart.disabled = true;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      setTimeout(() => {
        startCountdown();
        selectors.buttonStart.disabled = false;
      }, tomorrow - new Date());
        }
    }
});

let countdownIntervalId;

selectors.buttonStart.addEventListener('click', handlerClick);
function handlerClick(evt) {
const selectedDate = flatpickr("#datetime-picker").selectedDates[0];
  if (selectedDate) {
    selectors.buttonStart.disabled = true;
    clearInterval(countdownIntervalId);
    countdownIntervalId = setInterval(updateCountdown, 1000, selectedDate);
    updateCountdown(selectedDate); 
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