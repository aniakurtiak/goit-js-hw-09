import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('[data-start]');
 buttonStart.disabled = false;


flatpickr("#datetime-picker", {
    enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = this.config.defaultDate;
    if (selectedDates[0] < currentDate) {
                window.alert("Please choose a date in the future"); 
        //     } else {
        //         buttonStart.disabled = true;
        //   }
      }
    console.log(selectedDates[0]);
    }
});