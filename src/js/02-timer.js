
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('[data-start]');
 buttonStart.disabled = true;

const currentDate = new Date();

flatpickr("#datetime-picker", {
    enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
                window.alert("Please choose a date in the future"); 
            } else if (selectedDates[0] > currentDate){
                buttonStart.disabled = false;
          }
    console.log(selectedDates[0]);
    }
});