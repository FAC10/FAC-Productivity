const hasStart = obj => obj.hasOwnProperty('startTime');
const hasStop = obj => obj.hasOwnProperty('stopTime');


const stopwatch = {};
const count = 0;

const startTiming = () => {
  if (!hasStart(stopwatch)) {
    stopwatch.startTime = Date.now();
  }
  if (hasStop(stopwatch)) {
    stopwatch.startTime = Date.now() - timeDifference(stopwatch.startTime, stopwatch.stopTime);
  }
  if (document.getElementsByClassName('twenty').length < 1) {
    addTwenty();
  }
  delete stopwatch.stopTime;
};


const stopTiming = () => {
  if (!hasStop(stopwatch) && hasStart(stopwatch)) {
    stopwatch.stopTime = Date.now();
  }
};

const resetTime = () => {
  if (hasStop(stopwatch)) {
    delete stopwatch.stopTime;
    delete stopwatch.startTime;
    const twenties = [].slice.call(document.getElementsByClassName('twenty'));
    twenties.forEach((twenty) => {
      twenty.parentElement.removeChild(twenty);
    });
  }
};

const resetTwenty = () => {
  delete stopwatch.stopTime;
  delete stopwatch.startTime;
  startTiming();
};


const timeDifference = (start, current) => current - start;

const toReadableTime = (time) => {
  const ms = time % 1000;
  time -= ms;
  const secs = time % 60000;
  time -= secs;
  const mins = time % 3600000;

  const seconds = twoDigitPadding(secs / 1000);
  const minutes = twoDigitPadding(mins / 60000);

  return `${minutes}:${seconds}`;
};

const getHours = ms => Math.floor((ms % 216000000) / 3600000);

const twoDigitPadding = number => (`00${number}`).substr(-2, 2);

const setTime = (start, end) => {
  if (start > end) { throw 'start time is after end time'; }
  return toReadableTime(timeDifference(start, end));
};

const setHours = (start, end) => getHours(timeDifference(start, end));

const replaceDomElementContent = (text, element) => {
  element.innerText = text;
};

const get = (element) => {
  if (element) {
    return document.getElementById(element);
  }
};

const addTimeToDom = () => {
  const clock = setTime(stopwatch.startTime, stopwatch.stopTime || Date.now());
  replaceDomElementContent(clock, get('display'));
  if (!hasStart(stopwatch)) { // if empty start then reset display to 0
    replaceDomElementContent(setTime(0, 0), get('display'));
  }

  if (clock === '20:00') {
    addTwenty();
    resetTwenty();
  }
  if (document.getElementsByClassName('twenty').length == 4) {
    stopTiming();
  }
};

const createTwentyElement = (start, end, className) => {
  const twenty = document.createElement('div');
  twenty.className += className || 'twenty';
  const twentyText = ['Try to solve the problem yourself first!', 'You should ask for help to your team or to your cohort', 'You should ask for help to a mentor', 'I hope you solved your problem by now'];
  const twentyI = document.getElementsByClassName('twenty').length;
  	twenty.innerText = twentyText[twentyI];
  	return twenty;
};

const addTwenty = () => {
  if (hasStart(stopwatch) && !hasStop(stopwatch)) {
    const twenty = createTwentyElement(stopwatch.startTime, Date.now());
    document.getElementById('twentycontainer').appendChild(twenty);
  }
};

get('start').addEventListener('click', startTiming);
get('pause').addEventListener('click', stopTiming);
get('restart').addEventListener('click', resetTime);

setInterval(addTimeToDom, 500);
