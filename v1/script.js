let timerInterval;
let startTime;
let running = false;
let laps = [];

const displayElement = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.remove('btn-start');
        startStopBtn.classList.add('btn-stop');
        lapResetBtn.textContent = 'Lap';
        startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1].totalTime : 0);
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('btn-stop');
        startStopBtn.classList.add('btn-start');
        lapResetBtn.textContent = 'Reset';
        running = false;
    }
});

lapResetBtn.addEventListener('click', () => {
    if (!running) {
        if (lapResetBtn.textContent === 'Reset') {
            resetStopwatch();
        }
    } else {
        recordLap();
    }
});

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    displayElement.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let seconds = Math.floor((milliseconds % 60000) / 1000);
    let millis = Math.floor(milliseconds % 1000);

    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millis, 3)}`;
}

function pad(num, size) {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}

function recordLap() {
    const elapsedTime = Date.now() - startTime;
    const lapTime = elapsedTime - (laps.length > 0 ? laps[laps.length - 1].totalTime : 0);
    const lap = {
        lapNumber: laps.length + 1,
        lapTime: formatTime(lapTime),
        totalTime: elapsedTime
    };
    laps.push(lap);
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${lap.lapNumber}</td>
        <td>${lap.lapTime}</td>
    `;
    lapsList.prepend(tr);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    running = false;
    displayElement.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('btn-stop');
    startStopBtn.classList.add('btn-start');
    lapResetBtn.textContent = 'Reset';
    laps = [];
    lapsList.innerHTML = '';
}
