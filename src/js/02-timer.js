import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

    function convertMs(ms) {
      // Кількість мілісекунд у одиниці часу
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Залишок днів
      const days = Math.floor(ms / day);
      // Залишок годин
      const hours = Math.floor((ms % day) / hour);
      // Залишок хвилин
      const minutes = Math.floor(((ms % day) % hour) / minute);
      // Залишок секунд
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    }

    // Додає ведучий нуль до чисел менших 10
    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }

    // Функція, яка оновлює таймер і викликається кожну секунду
    function updateTimer(endDate) {
      const currentTime = new Date().getTime();
      const timeLeft = endDate - currentTime;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById('start-btn').disabled = false;
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeLeft);

      const formattedTime = `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
      document.getElementById('timer').textContent = formattedTime;
    }

    // Обробник кліку на кнопку "Start"
    function startTimer() {
      const selectedDate = new Date(document.getElementById('datetime-picker').value).getTime();
      const currentDate = new Date().getTime();

      if (selectedDate <= currentDate) {
        // Вибрано неприпустиму дату
        Notify.failure('Please choose a date in the future');
        return;
      }

      document.getElementById('start-btn').disabled = true;

      const endDate = new Date(selectedDate);
      // Оновлювати таймер кожну секунду
      timerInterval = setInterval(() => updateTimer(endDate), 1000);

      Notify.success('Timer started!');
    }

    // Ініціалізація бібліотеки flatpickr
    const picker = flatpickr("#datetime-picker", {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const selectedDate = new Date(selectedDates[0]).getTime();
        const currentDate = new Date().getTime();
        if (selectedDate > currentDate) {
          document.getElementById('start-btn').disabled = false;
        } else {
          document.getElementById('start-btn').disabled = true;
        }
      },
    });

    // Додавання обробника кліку на кнопку "Start"
    document.getElementById('start-btn').addEventListener('click', startTimer);
