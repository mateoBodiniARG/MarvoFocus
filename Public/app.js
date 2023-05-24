const minutes = document.querySelector('.timerMinutes');
const btnsBreaks = document.querySelectorAll('.breaks');
const startTimer = document.querySelector('.startButton');
const pFocus = document.querySelector('.pFocus');

const times = {
  Pomodoro: '25:00',
  LongBreak: '15:00',
  ShortBreak: '05:00'
};

let intervalId;
let timeInSeconds;
let intervalFocus
btnsBreaks.forEach((button) => {
    button.addEventListener('click', () => {
        const time = times[button.id];
        if (time) {
            minutes.innerHTML = time;
            timeInSeconds = convertToSeconds(time);
            clearInterval(intervalId);
            intervalId = null;
        }
    });
});

startTimer.addEventListener('click', () => {
    if (intervalId) {
        return;
    }
    const intervalFocus = setInterval(() => {
        pFocus.style.display = 'block';
      }, 2000);
      
      setTimeout(() => {
        clearInterval(intervalFocus);
      }, 10000);

  timeInSeconds = convertToSeconds(minutes.innerHTML);

  intervalId = setInterval(() => {
    const minutesRemaining = Math.floor(timeInSeconds / 60);
    const secondsRemaining = timeInSeconds % 60;

    const formattedMinutes = String(minutesRemaining).padStart(2, '0');
    const formattedSeconds = String(secondsRemaining).padStart(2, '0');

    minutes.innerHTML = `${formattedMinutes}:${formattedSeconds}`;

    timeInSeconds--;

    if (timeInSeconds < 0) {
      clearInterval(intervalId);
      intervalId = null;
      alert('Tiempo Terminado!');
    }
  }, 1000);
});

function convertToSeconds(time) {
  const [minutes, seconds] = time.split(':');
  return parseInt(minutes) * 60 + parseInt(seconds);
}
