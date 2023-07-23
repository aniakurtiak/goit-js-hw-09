import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

 function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
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

    document.addEventListener("click", function (event) {
      const datePicker = document.getElementById("datetime-picker");
      const startButton = document.querySelector("[data-start]");
      const daysValue = document.querySelector("[data-days]");
      const hoursValue = document.querySelector("[data-hours]");
      const minutesValue = document.querySelector("[data-minutes]");
      const secondsValue = document.querySelector("[data-seconds]");

      if (event.target === startButton) {
        const selectedDate = new Date(datePicker.value).getTime();

        function updateTimer() {
          const currentDate = new Date().getTime();
          const timeRemaining = selectedDate - currentDate;

          if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            startButton.disabled = true;
            return;
          }

          const time = convertMs(timeRemaining);
          daysValue.textContent = addLeadingZero(time.days);
          hoursValue.textContent = addLeadingZero(time.hours);
          minutesValue.textContent = addLeadingZero(time.minutes);
          secondsValue.textContent = addLeadingZero(time.seconds);

          requestAnimationFrame(updateTimer);
        }

        updateTimer();
      }
    });

    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const startButton = document.querySelector("[data-start]");

        if (selectedDate < new Date()) {
          window.alert("Please choose a date in the future");
          startButton.disabled = true;
        } else {
          startButton.disabled = false;
        }
      },
    };

    flatpickr("#datetime-picker", options);