
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('[data-start]');
 buttonStart.disabled = true;

let currentDate = new Date();
function getCopyOfCurrentDate() {
  const currentDate = new Date();
  return new Date(currentDate.getTime());
}

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: getCopyOfCurrentDate(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < currentDate) {
            window.alert("Please choose a date in the future");
        } else if (selectedDates[0] > currentDate) {
            buttonStart.disabled = false;
        }
    
        // if (selectedDates[0] > currentDate) {
        //   buttonStart.disabled = false; 
        // } else {
        //   buttonStart.disabled = true;
        //   window.alert("Please choose a date in the future");
        // }
        // console.log(selectedDates[0]);
        // }
    }
});