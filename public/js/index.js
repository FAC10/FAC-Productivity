console.log('hi');

const button = document.querySelector('.github_star_link');


const setStars = (starCount, element) => {
  element.innerText = starCount;
  element.classList.add('github_star_link--starcount');
};

button.addEventListener('click', () => {
  fetch('/star', {
    credentials: 'same-origin',
  }).then(res => res.json())
    .then(({ starCount }) => setStars(starCount, button))
    .catch((err) => {
      console.log(err);
    });
});
