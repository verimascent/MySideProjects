import '../scss/style.scss';

// eslint-disable-next-line no-undef
const btnHamburger = document.querySelector('#btnHamburger');
// eslint-disable-next-line no-undef
const header = document.querySelector('.header');
// eslint-disable-next-line no-undef
const overlay = document.querySelector('.overlay');

btnHamburger.addEventListener('click', () => {
  if (header.classList.contains('open')) { // close hamburger menu
    header.classList.remove('open');
    overlay.classList.remove('fade-in');
  } else { // open hamburger menu
    header.classList.add('open');
    overlay.classList.add('fade-in');
  }
});
