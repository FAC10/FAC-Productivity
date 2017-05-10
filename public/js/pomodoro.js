const pomodoro = (workLen, breakLen, onSwitchFunc) => {
  let startTime = null;
  let pausedAt = null;
  let isWork = true;

  const difference = (start, end) => end - start;
  const toReadableTime = time => new Date(time).toISOString().substr(-10, 5);
  const checkIfSwitch = (time, len) => time > len;
  const fractionComplete = (time, target) => time / target;

  const setStart = (time) => { startTime = time; };
  const getStart = () => startTime;

  const setPause = (pause) => { pausedAt = difference(startTime, pause); };
  const getPause = () => pausedAt;

  const update = (currentTime) => {
    getStart() ? '' : setStart(currentTime);
    const time = difference(startTime, currentTime);
    const amountComplete = isWork ?
      fractionComplete(time, workLen) :
      fractionComplete(time, breakLen);
    const swap = isWork ? checkIfSwitch(time, workLen) : checkIfSwitch(time, breakLen);
    if (swap) {
      isWork = !isWork;
      setStart(currentTime);
      onSwitchFunc(isWork);
      return { time: 0, amountComplete: 0, isWork };
    }
    return { time, amountComplete, isWork };
  };

  return {
    setStart,
    getStart,
    difference,
    fractionComplete,
    toReadableTime,
    checkIfSwitch,
    getPause,
    setPause,
    update,
  };
};
