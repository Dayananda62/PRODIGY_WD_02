let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    const timeElapsed = elapsedTime + (currentTime - startTime);
    display.textContent = formatTime(timeElapsed);
}

startButton.addEventListener('click', function() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
    }
});

pauseButton.addEventListener('click', function() {
    if (isRunning) {
        isRunning = false;
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
    }
});

resetButton.addEventListener('click', function() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
    lapCounter = 1;
});

lapButton.addEventListener('click', function() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime + (Date.now() - startTime));
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapElement.className = 'lap';
        lapsContainer.appendChild(lapElement);
        lapCounter++;
    }
});