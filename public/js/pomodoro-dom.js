const pomoDom = ((workLen, breakLen) => {
  const timer = pomodoro(workLen * 60 * 1000, breakLen * 60 * 1000, console.log);
  const pomodoroDomText = document.querySelector('.pomodoro__text');
  const pomodoroDomInner = document.querySelector('.pomodoro__inner');
  const pause = document.querySelector('.pomodoro__pause');

  const flipTime = (minsSecs, len) => timer.toReadableTime(len - minsSecs);

  const update = () => {
    const { time, amountComplete, isWork } = timer.update(Date.now());
    const len = isWork ? workLen : breakLen;
    pomodoroDomInner.style.transform = `scale(1, ${amountComplete})`;
    pomodoroDomText.textContent = flipTime(time, len * 60 * 1000);
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
})(20, 5);
