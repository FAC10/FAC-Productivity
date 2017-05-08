const pomoDom = (() => {
  const timer = pomodoro(60000, 5000, console.log);
  const pomodoroDomText = document.querySelector('.pomodoro__text');
  const pomodoroDomInner = document.querySelector('.pomodoro__inner');
  const pause = document.querySelector('.pomodoro__pause');

  const update = () => {
    const { time, amountComplete } = timer.update(Date.now());
    pomodoroDomInner.style.transform = `scale(1, ${amountComplete})`;
    pomodoroDomText.textContent = timer.toReadableTime(time);
  };

  let updateInterval = setInterval(update, 250);
  let paused = false;

  const pauseTimer = () => {
    timer.setPause(Date.now());
    clearInterval(updateInterval);
  };

  const resumeTimer = () => {
    timer.setStart(Date.now() - timer.getPause());
    updateInterval = setInterval(update, 250);
  };

  pause.addEventListener('click', () => {
    paused ? resumeTimer() : pauseTimer();
    paused = !paused;
  });
})();
