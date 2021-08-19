import "../scss/style.scss";

const btnHamburger = document.querySelector("#btnHamburger");

const header = document.querySelector(".header");

const overlay = document.querySelector(".overlay");
// eslint-disable-next-line
const fadeElems = document.querySelector('.has-fade');

btnHamburger.addEventListener("click", () => {
  if (header.classList.contains("open")) { // close hamburger menu
    header.classList.remove("open");
    overlay.classList.remove("fade-in");
    overlay.classList.add("fade-out");
  } else { // open hamburger menu
    header.classList.add("open");
    overlay.classList.remove("fade-out");
    overlay.classList.add("fade-in");
  }
});
