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

const profile = document.querySelector('.profile_img');
const logout = document.querySelector('.profile__logout');
logout.addEventListener('click', e => e.stopPropagation());
profile.addEventListener('click', () => {
  logout.classList.toggle('profile__logout--active');
});
