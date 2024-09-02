let minutesDisplay = document.getElementById("minutes");
let secondsDisplay = document.getElementById("seconds");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let hourglass = document.querySelector('.hourglass');
const progressBar = document.getElementById("progress-bar");
let timerInterval;
const totalMinutes = parseInt(prompt("How long would you like to study for : ")) *60*60;

let timeLeft = totalMinutes; 

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
    updateProgressBar();
}

 function updateProgressBar() {
    const percent = ((totalMinutes - timeLeft) / totalMinutes) * 100;
   progressBar.style.width = `${percent}%`;
}

function startTimer() {
    if (!timerInterval) {
        hourglass.style.animationPlayState = 'running'; // Start the hourglass animation
        hourglass.style.animation = 'flip 4s linear infinite'; // Apply flip animation
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                hourglass.style.animationPlayState = 'paused'; // Pause the hourglass animation
                alert("Time's up!");
            } else {
                timeLeft--;
                updateTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    hourglass.style.animationPlayState = 'paused'; // Pause the hourglass animation
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = totalMinutes;
    updateTimer();
    hourglass.style.animationPlayState = 'paused'; // Pause the hourglass animation
    hourglass.style.animation = 'none'; // Reset animation
    setTimeout(() => {
        hourglass.style.animation = ''; // Restart animation
    }, 0);
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateTimer();
