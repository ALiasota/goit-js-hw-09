import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  DELLAY: 1000,
  timePicker: document.getElementById('datetime-picker'),
  strartBtn: document.querySelector('[data-start]'),
  dDays: document.querySelector('[data-days]'),
  dHours: document.querySelector('[data-hours]'),
  dMinutes: document.querySelector('[data-minutes]'),
  dSeconds: document.querySelector('[data-seconds]')
}
refs.strartBtn.disabled = true;
let chosenDate = null;
let interval = null;

Notify.info();


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {      
    if (selectedDates[0] - Date.now() < 0) {
      Notify.info("Please choose a date in the future");
          // alert("Please choose a date in the future");
          return;
      }
    chosenDate = selectedDates[0];

      refs.strartBtn.disabled = false;
  },
};

flatpickr(refs.timePicker, options);

const objTimer = {
  oldDate: chosenDate,
  timer: null,
  math: null,

  onClick() {
    if (this.oldDate !== chosenDate) {
      this.oldDate = chosenDate;
        }
    interval = setInterval(
      () => {
          this.timer = addLeadingZero(convertMs(this.oldDate - Date.now()));
        this.math = Math.round((this.oldDate % Date.now()) / 600);
        refs.dDays.textContent = this.timer.days;
        refs.dHours.textContent = this.timer.hours;
        refs.dMinutes.textContent = this.timer.minutes;
        refs.dSeconds.textContent = this.timer.seconds;

        if (this.math === 1) {
          clearInterval(interval);    
          return;
        }
        
         
        
      }
      , refs.DELLAYDELLAY);  
  },
}

refs.strartBtn.addEventListener('click', objTimer.onClick);



function addLeadingZero({ days, hours, minutes, seconds }) {
  days = String(days).padStart(2, '0');
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  return { days, hours, minutes, seconds };
 };

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

