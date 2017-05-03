function getTime() { return Date.now(); }
function hasStart (obj) { return obj.hasOwnProperty('startTime'); }
function hasStop (obj) { return obj.hasOwnProperty('stopTime'); }

function startTiming() {
  if (!hasStart(stopwatch)) {
    stopwatch.startTime = getTime();
  }
  if (hasStop(stopwatch)) {
    stopwatch.startTime = getTime() - timeDifference(stopwatch.startTime, stopwatch.stopTime);
  }
  delete stopwatch.stopTime;
}

function stopTiming() {
  if (!hasStop(stopwatch) && hasStart(stopwatch)) {
    stopwatch.stopTime = getTime();
  }
}

 function resetTime () {
  if (hasStop(stopwatch)) {
    delete stopwatch.stopTime;
    delete stopwatch.startTime;
    var laps = [].slice.call(document.getElementsByClassName('lap'));
    laps.forEach(function (lap) {
      lap.parentElement.removeChild(lap);
    });
  }
}

var stopwatch = {};

function timeDifference(start,current) {
  return current - start;
}

function toReadableTime(time) {
  var ms = time % 1000;
  time -= ms;
  var secs = time % 60000;
  time -= secs;
  var mins = time % 3600000;

  var centiseconds = twoDigitPadding(Math.floor(ms / 10));
  var seconds = twoDigitPadding(secs / 1000);
  var minutes = twoDigitPadding(mins / 60000);

  return minutes + ':' + seconds + '.' + centiseconds;
}

function getHours(ms) {
    return Math.floor((ms % 216000000)/3600000);
}

function twoDigitPadding(number) {
  return ('00' + number).substr(-2, 2);
}

function setTime(start, end) {
  if (start > end) { throw 'start time is after end time'; }
  return toReadableTime(timeDifference(start, end));
}

function setHours (start, end) {
  return getHours(timeDifference(start, end));
}

function replaceDomElementContent(text, element) {
  element.innerText = text;
}

function get(element) {
  if (element) {
    return document.getElementById(element);
  }
}

function addTimeToDom() {
  var hours = setHours(stopwatch.startTime, stopwatch.stopTime || getTime());
  var clock = setTime(stopwatch.startTime, stopwatch.stopTime || getTime());
  hours = hours ? hours + ":" : ''; // if hours display hours
  replaceDomElementContent(hours, get('hourdisplay'));
  replaceDomElementContent(clock, get('display'));
  if (!hasStart(stopwatch)) { // if empty start then reset display to 0
    replaceDomElementContent(setTime(0, 0), get('display'));
  }
}

function createLapElement(start, end, className) {
  var lap = document.createElement('div');
  lap.className += className || 'lap';
  var lapNumber = document.getElementsByClassName('lap').length + 1;
  var hour = setHours(start, end);
  hour = hour ? hour + ":" : '';
  lap.innerText = "Lap number " + lapNumber + " " + hour + setTime(start, end);
  return lap;
}

function addLap() {
  if (hasStart(stopwatch) && !hasStop(stopwatch)) {
    var lap = createLapElement(stopwatch.startTime, getTime());
    document.getElementById('lapcontainer').appendChild(lap);
  }
}

get('start').addEventListener('click', startTiming);
get('stop').addEventListener('click', stopTiming);
get('reset').addEventListener('click', resetTime);
get('lap').addEventListener('click', addLap);

setInterval(addTimeToDom, 10);
