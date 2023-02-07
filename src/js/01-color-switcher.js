const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');


startBtn.addEventListener('click', startInterval);
stopBtn.addEventListener('click', stopInterval);

let intervalID = null;



function startInterval() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    handleChangeColor();
    intervalID = setInterval(handleChangeColor, 1000);
}

function stopInterval() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(intervalID);
}

function handleChangeColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
