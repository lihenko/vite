import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './style.scss'

const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 3000,       // час у мс між автозмінами (3 секунди)
    disableOnInteraction: true, // не зупиняти автоплей після взаємодії користувача
  },
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  modules: [Navigation, Pagination, Autoplay, Scrollbar],
});

// Menu Toggles
function stopScroll (event) {
    event.preventDefault();
    return false;
}

const body = document.body;
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.querySelector('.omni-mobile-menu');
const menuLinks = document.querySelectorAll('.omni-mobile-menu a');
const dropdownToggles = document.querySelectorAll('.omni-dropdown-toggle');
const toggleBtn = document.querySelector('.toggle-btn');

function toggleMenu () {
    body.classList.toggle('menu-open');
    body.removeEventListener('touchmove', stopScroll);
    hamburger.classList.toggle('active');

    if (body.classList.contains('menu-open')) {
        body.addEventListener('touchmove', stopScroll);
    }
}

function closeMenu () {
    if (body.classList.contains('menu-open')) {
        body.removeEventListener('touchmove', stopScroll);
        body.classList.remove('menu-open');
        hamburger.classList.remove('active');
    }
}

if (mobileMenu !== null) {
    mobileMenu.addEventListener('touchmove', function (event) {
        event.stopPropagation();
    });
}

// Submenus
for (let i = 0; i < dropdownToggles.length; i++) {
    dropdownToggles[i].addEventListener('click', function (event) {
        event.stopPropagation();
        let toggle = this;
        let menu = this.nextElementSibling;
        toggle.classList.toggle('omni-menu-open');
        menu.classList.toggle('menu-collapsed');
    });
}

// Close Menu on Links With '#'
for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function () {
        if (this.href.indexOf('#') === -1) {
            return;
        }
        closeMenu();
    });
}

// Toggle the menu
if (toggleBtn !== null) {
    toggleBtn.addEventListener('click', toggleMenu);
}

// Close menu on resize
window.addEventListener('resize', closeMenu);

// Scroll to top
let mybutton = document.getElementById("btn-back-to-top");


window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);


function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}