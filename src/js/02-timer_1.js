// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');


startBtn.addEventListener('click', startInterval);


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        alertDateInThePast(selectedDates[0]);
    }
};

let intervalID = null;

const pickedDate = flatpickr(inputEl, options);


function startInterval() {
    dateUpdate();

    intervalID = setInterval(dateUpdate, 1000);
}

// console.log('id_ff', intervalID);

function dateUpdate() {
    const diff = pickedDate.selectedDates[0] - Date.now();
    if (diff >= 0) {
        startBtn.disabled = 'true';
        insertElInTimer(convertMs(diff));
        return;
    }
    clearInterval(intervalID);
    return;
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


function alertDateInThePast(date) {
    if (date < Date.now()) {
        window.alert("Please choose a date in the future");
        return;
    }
    startBtn.disabled = false;
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




function insertElInTimer({ days, hours, minutes, seconds }) {
    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);
}


