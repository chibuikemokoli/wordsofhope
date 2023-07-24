/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  toggle.addEventListener('click', () => {
    // Add show-menu class to nav menu
    nav.classList.toggle('show-menu')

    // Add show-icon to show and hide the menu icon
    toggle.classList.toggle('show-icon')
  })
}

showMenu('nav-toggle', 'nav-menu')

/*===== SHOW SCROLL TOP =====*/
function scrollTop() {
  const scrollTop = document.getElementById('scroll-top')
  if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

// ========NAV BAR========
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("header").style.top = "0";
//   } else {
//     document.getElementById("header").style.top = "-135px";
//   }
//   prevScrollpos = currentScrollPos;
// }

/*===== GSAP ANIMATION =====*/
// gsap.from('.text-box', {opacity: 0, duration: 5, delay:1.2, x:60})
gsap.from('.header__image', { opacity: 0, duration: 2, delay: .5, x: -25 })
gsap.from('.header__content', { opacity: 0, duration: 2, delay: .5, x: 25 })
gsap.from('.video__image, .hgf', { opacity: 0, duration: 2, delay: 1.4, y: 25, ease: 'expo.out' })
gsap.from('.sub__header', { opacity: 0, duration: 2, delay: 1.4, x: 25, ease: 'expo.out' })

gsap.from('.nav__logo, .nav__toggle', { opacity: 0, duration: 1.5, delay: 1, y: 25, ease: 'expo.out' })
gsap.from('.abts', { opacity: 0, duration: 1.5, delay: .8, y: 25, ease: 'expo.out' })
gsap.from('.nav__list', { opacity: 0, duration: 1.2, delay: 1.3, y: 25, ease: 'expo.out' })
// gsap.from('.home__social-icon', {opacity: 0, duration: 2, delay:2.3, y:25, ease:'expo.out'})

// cookies for website
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}

// disabling inspect element
// document.addEventListener("contextmenu", function(e){
//   e.preventDefault(); //this prevents right click
// });
// document.onkeydown=function(e){
//   if(event.keyCode==123){
//     return false;
//   }
//   if(e.ctrlKey && e.shiftKey && e.keyCode=="I".charCodeAt(0)){
//     return false;
//   }
//   if(e.ctrlKey && e.shiftKey && e.keyCode=="C".charCodeAt(0)){
//     return false;
//   }
//   if(e.ctrlKey && e.shiftKey && e.keyCode=="J".charCodeAt(0)){
//     return false;
//   }
//   if(e.ctrlKey && e.keyCode=="U".charCodeAt(0)){
//     return false;
//   }
//   if(e.ctrlKey && e.keyCode=="S".charCodeAt(0)){
//     return false;
//   };
// }

// popup
window.addEventListener("load", function () {
  setTimeout(
    function open(event) {
      document.querySelector(".popup").style.display = "block";
    },
    1000
  )
});

document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});