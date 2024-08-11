import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// const startButton = document.querySelector('[data-start]');
// const dateTimePicker = document.getElementById('datetime-picker');
// const dayOutput = document.querySelector('[data-days]');
// const hoursOutput = document.querySelector('[data-hours]');
// const minutesOutput = document.querySelector('[data-minutes]');
// const secondsOutput = document.querySelector('[data-seconds]');

// let currentSelectedDate = null;
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] <= new Date()) {
//       return iziToast.error({
//         position: 'topRight',
//         message: 'Please choose a date in the future',
//       });
//     }
//     currentSelectedDate = selectedDates[0];
//     startButton.disabled = false;
//   },
// };

// flatpickr(dateTimePicker, options);

// startButton.addEventListener('click', startTimer);

// let intervalId = null;

// function startTimer() {
//   intervalId = setInterval(() => updateTimer, 1000);
// }

// function updateTimer() {
//   dateTimePicker.disabled = true;
//   startButton.disabled = true;
//   const currentTime = currentSelectedDate - new Date();

//   if (currentTime <= 0) {
//     dateTimePicker.disabled = false;
//     return;
//   }
// }
// const { days, hours, minutes, seconds } = convertMs(currentTime);
// dayOutput.textContent = String(days).padStart(2, 0);
// hoursOutput.textContent = String(hours).padStart(2, 0);
// minutesOutput.textContent = String(minutes).padStart(2, 0);
// secondsOutput.textContent = String(seconds).padStart(2, 0);
// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);

//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }
//nhwvgieahvbeipbneob;neobnoebnebe'bepbeipb

// let userSelectedDate = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     userSelectedDate = selectedDates[0];
//     if (userSelectedDate <= new Date()) {
//       iziToast.error({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//       });
//       startButton.disabled = true;
//     } else {
//       startButton.disabled = false;
//     }
//   },
// };

// flatpickr(dateTimePicker, options);

// startButton.addEventListener('click', () => {
//   startButton.disabled = true;
//   dateTimePicker.disabled = true;

//   const timerInterval = setInterval(() => {
//     const currentTime = new Date();
//     const timeRemaining = userSelectedDate - currentTime;

//     if (timeRemaining <= 0) {
//       clearInterval(timerInterval);
//       updateTimer(0, 0, 0, 0);
//       dateTimePicker.disabled = false;
//     } else {
//       const { days, hours, minutes, seconds } = convertMs(timeRemaining);
//       updateTimer(days, hours, minutes, seconds);
//     }
//   }, 1000);
// });

// function updateTimer(days, hours, minutes, seconds) {
//   document.querySelector('[data-days]').textContent = addLeadingZero(days);
//   document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
//   document.querySelector('[data-minutes]').textContent =
//     addLeadingZero(minutes);
//   document.querySelector('[data-seconds]').textContent =
//     addLeadingZero(seconds);
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const datetimePicker = document.querySelector('#datetime-picker');

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        position: 'topRight',

        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      datetimePicker.disabled = false;
      startButton.disabled = true;
      iziToast.success({
        title: 'Success',
        message: 'Time is up!',
      });
      updateTimerDisplay(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
});

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysSpan.textContent = String(days).padStart(2, '0');
  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');
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
