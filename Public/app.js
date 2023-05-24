const minutes = document.querySelector('.timerMinutes');
const btnsBreaks = document.querySelectorAll('.breaks');
const startTimer = document.querySelector('.startButton');
const pFocus = document.getElementById('pFocus');

const times = {
  Pomodoro: '25:00',
  LongBreak: '15:00',
  ShortBreak: '05:00'
};

let intervalId; // Almacenar el identificador del intervalo de tiempo que se este ejecutando
let timeInSeconds;
btnsBreaks.forEach((button) => {
    button.addEventListener('click', () => {
        const time = times[button.id];
        if (time) {
            minutes.innerHTML = time;
            clearInterval(intervalId);
            intervalId = null;
        }
    });
});

startTimer.addEventListener('click', () => {

  // Mensaje time to focus
    const timeToFocus = setInterval(() => {
        pFocus.style.display = 'block';
      }, 2000);
      
      setTimeout(() => {
        clearInterval(timeToFocus);
        pFocus.style.display = 'none';
      }, 5000);

  timeInSeconds = convertToSeconds(minutes.innerHTML);


  intervalId = setInterval(() => {
    const minutesRemaining = Math.floor(timeInSeconds / 60); 
    const secondsRemaining = timeInSeconds - (minutesRemaining * 60);

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
  const minutes = parseInt(time.split(':')[0]);
  const seconds = parseInt(time.split(':')[1]);
  return minutes * 60 + seconds;
}


