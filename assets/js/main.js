const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu')

    toggle.classList.toggle('show-icon')
  })
}

showMenu('nav-toggle', 'nav-menu')

function scrollTop() {
  const scrollTop = document.getElementById('scroll-top')
  if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

gsap.from('.header__image', { opacity: 0, duration: 2, delay: 1.2, y: -25 })
gsap.from('.header__content', { opacity: 0, duration: 2, delay: 1.2, y: 25 })
gsap.from('.video__image, .hgf, .ab2', { opacity: 0, duration: 2, delay: 1.4, y: 25, ease: 'expo.out' })
gsap.from('.sub__header', { opacity: 0, duration: 2, delay: 1.4, y: 25, ease: 'expo.out' })

gsap.from('.nav__logo, .nav__toggle', { opacity: 0, duration: 1.5, delay: 2, y: 25, ease: 'expo.out' })
gsap.from('.abts', { opacity: 0, duration: 1.5, delay: 1.8, y: 25, ease: 'expo.out' })
gsap.from('.nav__list, .ab1', { opacity: 0, duration: 1.2, delay: 1.7, y: 25, ease: 'expo.out' })
gsap.from('.delp', { opacity: 0, duration: 1.2, delay: 1.3, y: 25, ease: 'expo.out' })
gsap.from('.delc', { opacity: 0, duration: 1, delay: 1, y: 25, ease: 'expo.out' })
gsap.from('.home__img-2', 1.2, {opacity: 0, y: 200, delay: .1})
gsap.from('.home__img-3', 1.2, {opacity: 0, y: 200, delay: .5})
gsap.from('.home__data', 1.2, {opacity: 0, y: -60, delay: 1})
gsap.from('.home__bird-1', 1.2, {opacity: 0, x: -80, delay: 1.1})
gsap.from('.home__bird-2', 1.2, {opacity: 0, x: 80, delay: 1.2})
gsap.from('.home__img-1', 1.2, {opacity: 0, y: 200, delay: 1.2})
gsap.from('.home__img-4', 1.2, {opacity: 0, x: 200, delay: 1.3})

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var className = "inverted";
var scrollTrigger = 60;

window.onscroll = function() {
  // We add pageYOffset for compatibility with IE.
  if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
    document.getElementsByTagName("header")[0].classList.add(className);
  } else {
    document.getElementsByTagName("header")[0].classList.remove(className);
  }
};

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbymGsr-KQqz0qP5XnEV9CHarqpFlahqP5EiWjQHW_QC6PJVsrS4FziASSwysMujc8rD1A/exec';
const form = document.forms['newsletter'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault();

  const userInput = form.email.value;

  if (!isValidEmail(userInput)) {
    msg.innerHTML = "Invalid email address.";
    return;
  }

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      if (response.ok) {
        msg.innerHTML = "Message Sent Successfully!";
        setTimeout(function () {
          msg.innerHTML = ""
        }, 5000)
        form.reset()
        window.location.href = "success";
      } else {
        console.error('Error!', response.statusText);
      }
    })
    .catch(error => console.error('Error!', error.message));
});

function delayer() {
  setTimeout(downLoad, 800)
}
function downLoad() {
  if (document.all) {
      document.all["preloader"].style.display = "none";
      document.all["layer2"].style.display = "block";
  } else if (document.getElementById) {
      node = document.getElementById("preloader").style.display = 'none';

      node = document.getElementById("layer2").style.visibility = 'visible';

  }
}