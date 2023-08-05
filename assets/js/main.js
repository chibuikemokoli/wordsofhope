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

/*===== GSAP ANIMATION =====*/
// gsap.from('.text-box', {opacity: 0, duration: 5, delay:1.2, x:60})
gsap.from('.header__image', { opacity: 0, duration: 2, delay: .5, y: -25 })
gsap.from('.header__content', { opacity: 0, duration: 2, delay: .5, y: 25 })
gsap.from('.video__image, .hgf, .ab2', { opacity: 0, duration: 2, delay: 1.4, y: 25, ease: 'expo.out' })
gsap.from('.sub__header', { opacity: 0, duration: 2, delay: 1.4, y: 25, ease: 'expo.out' })

gsap.from('.nav__logo, .nav__toggle', { opacity: 0, duration: 1.5, delay: 1, y: 25, ease: 'expo.out' })
gsap.from('.abts', { opacity: 0, duration: 1.5, delay: .8, y: 25, ease: 'expo.out' })
gsap.from('.nav__list, .ab1', { opacity: 0, duration: 1.2, delay: 1.3, y: 25, ease: 'expo.out' })
// gsap.from('.home__social-icon', {opacity: 0, duration: 2, delay:2.3, y:25, ease:'expo.out'})
gsap.from('.home__img-2', 1.2, {opacity: 0, y: 200, delay: .1})
gsap.from('.home__img-3', 1.2, {opacity: 0, y: 200, delay: .5})
gsap.from('.home__data', 1.2, {opacity: 0, y: -60, delay: 1})
gsap.from('.home__bird-1', 1.2, {opacity: 0, x: -80, delay: 1.1})
gsap.from('.home__bird-2', 1.2, {opacity: 0, x: 80, delay: 1.2})
gsap.from('.home__img-1', 1.2, {opacity: 0, y: 200, delay: 1.2})
gsap.from('.home__img-4', 1.2, {opacity: 0, x: 200, delay: 1.3})

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

// submit to google sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbxmuCz6v88jXsGlhiBkAyAvc8FOxBsPB6dYuWshetc7Bci1FwiiPhZRTsIK9DOkxKzP/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
  
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message Sent Successfully!"
            setTimeout(function(){
                msg.innerHTML = ""
            },5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})




/*===== CHANGE BACKGROUND HEADER =====*/ 
function scrollHeader(){
  const header = document.getElementById('header')
  if(this.scrollY >= 200) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header')
}
window.addEventListener('scroll',scrollHeader)
