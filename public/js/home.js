const info = document.querySelector('.landing__info');
const textContent = document.querySelector('.hiddenIntro').innerText;

const toggleTextIfClass = (element, ifClass, thenText, elseText) => {
  const hasClass = element.classList.contains(ifClass);

  element.innerText = hasClass ?
    thenText : elseText;
};

info.addEventListener('click', () => {
  info.classList
    .toggle('landing__info--active');
  info.innerText = '';
});

info.addEventListener('transitionend', () => {
  toggleTextIfClass(info, 'landing__info--active', textContent, 'i');
});
