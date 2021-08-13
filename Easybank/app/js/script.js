import '../scss/style.scss';

// eslint-disable-next-line no-undef
const btnHamburger = document.querySelector('#btnHamburger');

btnHamburger.addEventListener('click', () => {
  if (btnHamburger.classList.contains('open')) {
    btnHamburger.classList.remove('open');
  } else {
    btnHamburger.classList.add('open');
  }
});
