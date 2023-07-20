import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const currentDate = new Date();


flatpickr("#datetime-picker", {
    enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        for (let i = 0; i < selectedDates.length; i += 1) {
            if (selectedDates[0] < currentDate) {
                window.alert("Please choose a date in the future"); 
          } 
      }
    console.log(selectedDates[0]);
    }
});