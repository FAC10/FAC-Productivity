const maxLength = 17;
const m = document.getElementById('m')
m.addEventListener('keyup', displayLength);

function displayLength() { let strLength = maxLength - m.value.length
  strLength -= 1;
  document.getElementById('charLeft').innerText = strLength + ' characters left';
}
