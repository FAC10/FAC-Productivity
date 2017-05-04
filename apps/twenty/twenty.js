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
  if (document.getElementsByClassName('twenty').length < 1) {
    addTwenty()
  };
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
    var twenties = [].slice.call(document.getElementsByClassName('twenty'));
    twenties.forEach(function (twenty) {
      twenty.parentElement.removeChild(twenty);
    });
  }
}

function resetTwenty () {
  delete stopwatch.stopTime;
  delete stopwatch.startTime;
  startTiming();
}

var stopwatch = {};
var count = 0;

function timeDifference(start,current) {
  return current - start;
}

function toReadableTime(time) {
  var ms = time % 1000;
  time -= ms;
  var secs = time % 60000;
  time -= secs;
  var mins = time % 3600000;

  var seconds = twoDigitPadding(secs / 1000);
  var minutes = twoDigitPadding(mins / 60000);

  return minutes + ':' + seconds; 
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
	var clock = setTime(stopwatch.startTime, stopwatch.stopTime || getTime());
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
}

function createTwentyElement(start, end, className) {
	var twenty = document.createElement('div');
	twenty.className += className || 'twenty';
	var twentyText= ["Try to solve the problem yourself","You should ask for help to your team or to your cohort","You should ask for help to a mentor","I hope you solved your problem by now"];
	var twentyI = document.getElementsByClassName('twenty').length;
  	twenty.innerText = twentyText[twentyI]; 
  	return twenty;
}

function addTwenty() {
  if (hasStart(stopwatch) && !hasStop(stopwatch)) {
    var twenty = createTwentyElement(stopwatch.startTime, getTime());
    document.getElementById('twentycontainer').appendChild(twenty);
  }
}

get('start').addEventListener('click', startTiming);
get('stop').addEventListener('click', stopTiming);
get('reset').addEventListener('click', resetTime);

setInterval(addTimeToDom, 500);
