const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu')

    toggle.classList.toggle('show-icon')
  })
}

showMenu('nav-toggle', 'nav-menu')


/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// 1. Select each dropdown item
dropdownItems.forEach((item) => {
  const dropdownButton = item.querySelector('.dropdown__button')

  // 2. Select each button click
  dropdownButton.addEventListener('click', () => {
    // 7. Select the current show-dropdown class
    const showDropdown = document.querySelector('.show-dropdown')

    // 5. Call the toggleItem function
    toggleItem(item)

    // 8. Remove the show-dropdown class from other items
    if (showDropdown && showDropdown !== item) {
      toggleItem(showDropdown)
    }
  })
})

// 3. Create a function to display the dropdown
const toggleItem = (item) => {
  // 3.1. Select each dropdown content
  const dropdownContainer = item.querySelector('.dropdown__container')

  // 6. If the same item contains the show-dropdown class, remove
  if (item.classList.contains('show-dropdown')) {
    dropdownContainer.removeAttribute('style')
    item.classList.remove('show-dropdown')
  } else {
    // 4. Add the maximum height to the dropdown content and add the show-dropdown class
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
    item.classList.add('show-dropdown')
  }
}

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia('(min-width: 1118px)'),
  dropdownContainer = document.querySelectorAll('.dropdown__container')

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () => {
  // Validate if the media query reaches 1118px
  if (mediaQuery.matches) {
    // Remove the dropdown container height style
    dropdownContainer.forEach((e) => {
      e.removeAttribute('style')
    })

    // Remove the show-dropdown class from dropdown item
    dropdownItems.forEach((e) => {
      e.classList.remove('show-dropdown')
    })
  }
}

addEventListener('resize', removeStyle)

function scrollTop() {
  const scrollTop = document.getElementById('scroll-top')
  if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('testimonialSlider');
  const dotsContainer = document.getElementById('dotsContainer');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  let currentIndex = 0;
  let isPlaying = true;
  let touchStartX = null;
  let touchEndX = null;
  const autoPlayInterval = 5000;
  const minSwipeDistance = 50;

  // Create testimonial cards
  testimonials.forEach((testimonial, index) => {
    const card = document.createElement('div');
    card.className = `testimonial-card ${index === 0 ? 'active' : ''}`;

    card.innerHTML = `
      <div class="card-content">
        <p class="quote">"${testimonial.quote}"</p>
        <div class="author">
          ${testimonial.avatarUrl ? `
            <img 
              src="${testimonial.avatarUrl}" 
              alt="${testimonial.name}'s avatar" 
              class="author-avatar"
            />
          ` : ''}
          <div class="author-info">
            <h4>${testimonial.name}</h4>
            <p>${testimonial.title}${testimonial.company ? `, ${testimonial.company}` : ''}</p>
          </div>
        </div>
      </div>
    `;

    slider.appendChild(card);
  });

  // Create dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active states
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });

    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateSlider();
  }

  // Event listeners
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Touch events for mobile swipe
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchEndX = null;
  });

  slider.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });

  // Auto-play functionality
  const testimonialSection = document.querySelector('.testimonial-section');

  function startAutoPlay() {
    return setInterval(() => {
      if (isPlaying) nextSlide();
    }, autoPlayInterval);
  }

  let autoPlayTimer = startAutoPlay();

  testimonialSection.addEventListener('mouseenter', () => {
    isPlaying = false;
    clearInterval(autoPlayTimer);
  });

  testimonialSection.addEventListener('mouseleave', () => {
    isPlaying = true;
    autoPlayTimer = startAutoPlay();
  });
});


const services = [
  {
    icon: 'instagram',
    title: 'Therapy plans',
    description: 'Every session is customized to meet your unique needs, ensuring a focused and effective healing experience.',
  },
  {
    icon: 'tool',
    title: 'Experienced therapy',
    description: 'Our qualified therapists provide a safe, non-judgmental space to help you explore and challenges.',
  },
  {
    icon: 'users',
    title: 'Safe & Supportive',
    description: 'We offer a welcoming atmosphere designed to make you feel comfortable and supported through.',
  },
  {
    icon: 'megaphone',
    title: 'Holistic approach',
    description: 'Our methods address emotional, mental, and physical well-being, promoting a comprehensive path.',
  },
  {
    icon: 'trending-up',
    title: 'Flexible scheduling',
    description: 'We provide convenient session times to fit seamlessly into your busy lifestyle and commitments.',
  },
  {
    icon: 'bar-chart',
    title: 'Practical tools',
    description: 'Learn actionable strategies and coping mechanisms that empower you to thrive in everyday life.',
  }
];

const testimonials = [
  {
    name: "Anonymous",
    title: "",
    company: "",
    quote: "Premarital counselling with Words of Hope Trauma relief Foundation transformed our marriage preparation. Rooted in biblical teachings, it refreshed our approach.",
    avatarUrl: "https://wordsofhope.vercel.app/assets/images/anon.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Anonymous",
    title: "",
    company: "",
    quote: "A therapy session with Words Of Hope Trauma Relief Foundation transformed our perspective from planning a wedding to planning a marriage.",
    avatarUrl: "https://wordsofhope.vercel.app/assets/images/anon.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Anonymous",
    title: "",
    company: "",
    quote: "You're amazing at what you do. A real class act!",
    avatarUrl: "https://wordsofhope.vercel.app/assets/images/anon.jpg?auto=compress&cs=tinysrgb&w=600"
  }
];

const icons = {
    // a: `assets/`
    instagram: `<svg viewBox="-3.36 -3.36 30.72 30.72" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 17H9V19.5885C9 19.7554 8.80766 19.8489 8.67644 19.7458L2 14.5L8.67644 9.25423C8.80766 9.15112 9 9.24461 9 9.41149V12H15" stroke="#fff" stroke-width="0.9120000000000001"></path> <path d="M11 7H15V4.41149C15 4.24461 15.1923 4.15112 15.3236 4.25423L22 9.5L15.3236 14.7458C15.1923 14.8489 15 14.7554 15 14.5885V12H9" stroke="#fff" stroke-width="0.9120000000000001"></path> </g></svg>`,
    tool: `<svg viewBox="-4.48 -4.48 40.96 40.96" fill="#ffffff" stroke="#ffffff" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .feather_een{fill:#ffffff;} </style> <path class="feather_een" d="M18.211,14.894c0.737-0.369,0.737-1.42,0-1.789L14,11l-2.106-4.211C11.71,6.42,11.355,6.236,11,6.236 s-0.71,0.184-0.894,0.553L8,11l-4.211,2.106c-0.737,0.369-0.737,1.42,0,1.789L8,17l2.106,4.211c0.184,0.369,0.539,0.553,0.894,0.553 s0.71-0.184,0.894-0.553L14,17L18.211,14.894z M13.255,16.255l-0.149,0.298L11,20.764l-2.106-4.211l-0.149-0.298l-0.298-0.149 L4.236,14l4.211-2.106l0.298-0.149l0.149-0.298l2.1-4.21c0,0,0.003-0.001,0.005-0.001l2.106,4.211l0.149,0.298l0.298,0.149 L17.764,14l-4.211,2.106L13.255,16.255z M27.679,7.072L25,6l-1.072-2.679C23.761,2.902,23.38,2.693,23,2.693 s-0.761,0.21-0.928,0.629L21,6l-2.679,1.072c-0.838,0.335-0.838,1.522,0,1.857L21,10l1.072,2.679 c0.168,0.419,0.548,0.629,0.928,0.629s0.761-0.21,0.928-0.629L25,10l2.679-1.072C28.517,8.593,28.517,7.407,27.679,7.072z M24.629,9.072l-0.398,0.159l-0.159,0.398L23,12.307l-1.072-2.679l-0.159-0.398l-0.398-0.159L18.693,8l2.679-1.072l0.398-0.159 l0.159-0.398l1.064-2.678c0.001,0,0.004-0.001,0.008-0.001l1.072,2.679l0.159,0.398l0.398,0.159L27.307,8L24.629,9.072z M22.679,24.072L20,23l-1.072-2.679c-0.168-0.419-0.548-0.629-0.928-0.629s-0.761,0.21-0.928,0.629L16,23l-2.679,1.072 c-0.838,0.335-0.838,1.522,0,1.857L16,27l1.072,2.679c0.168,0.419,0.548,0.629,0.928,0.629s0.761-0.21,0.928-0.629L20,27 l2.679-1.072C23.517,25.593,23.517,24.407,22.679,24.072z M19.629,26.072l-0.398,0.159l-0.159,0.398L18,29.307l-1.072-2.679 l-0.159-0.398l-0.398-0.159L13.693,25l2.679-1.072l0.398-0.159l0.159-0.398l1.064-2.678c0.001,0,0.004-0.001,0.008-0.001 l1.072,2.679l0.159,0.398l0.398,0.159L22.307,25L19.629,26.072z M27.195,17.598L26,17l-0.598-1.195 C25.32,15.639,25.16,15.556,25,15.556s-0.32,0.083-0.403,0.249L24,17l-1.195,0.598c-0.332,0.166-0.332,0.639,0,0.805L24,19 l0.597,1.195c0.083,0.166,0.243,0.249,0.403,0.249s0.32-0.083,0.402-0.249L26,19l1.195-0.597 C27.527,18.237,27.527,17.763,27.195,17.598z M25.255,18.255L25,18.764l-0.255-0.509L24.236,18l0.509-0.255L25,17.236l0.255,0.509 L25.764,18L25.255,18.255z M12.805,4.403L14,5l0.597,1.195C14.68,6.361,14.84,6.444,15,6.444s0.32-0.083,0.402-0.249L16,5 l1.195-0.597c0.332-0.166,0.332-0.639,0-0.805L16,3l-0.598-1.195C15.32,1.639,15.16,1.556,15,1.556s-0.32,0.083-0.403,0.249L14,3 l-1.195,0.598C12.473,3.763,12.473,4.237,12.805,4.403z M14.745,3.745L15,3.236l0.255,0.509L15.764,4l-0.509,0.255L15,4.764 l-0.255-0.509L14.236,4L14.745,3.745z M9.195,24.598L8,24l-0.598-1.195C7.32,22.639,7.16,22.556,7,22.556s-0.32,0.083-0.403,0.249 L6,24l-1.195,0.598c-0.332,0.166-0.332,0.639,0,0.805L6,26l0.597,1.195C6.68,27.361,6.84,27.444,7,27.444s0.32-0.083,0.402-0.249 L8,26l1.195-0.597C9.527,25.237,9.527,24.763,9.195,24.598z M7.255,25.255L7,25.764l-0.255-0.509L6.236,25l0.509-0.255L7,24.236 l0.255,0.509L7.764,25L7.255,25.255z"></path></g></svg>`,
    users: `<svg viewBox="-3.36 -3.36 30.72 30.72" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22.0004 17.1999C22.0004 18.0999 21.7504 18.9499 21.3004 19.6699C20.4704 21.0599 18.9504 21.9999 17.2004 21.9999C15.4504 21.9999 13.9204 21.0599 13.1004 19.6699C12.6604 18.9499 12.4004 18.0999 12.4004 17.1999C12.4004 14.5499 14.5504 12.3999 17.2004 12.3999C19.8504 12.3999 22.0004 14.5499 22.0004 17.1999Z" stroke="#ffffff" stroke-width="1.44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M22 8.69012C22 10.6601 21.49 12.4001 20.69 13.9101C19.81 12.9801 18.57 12.4001 17.2 12.4001C14.55 12.4001 12.4 14.5501 12.4 17.2001C12.4 18.4301 12.87 19.5501 13.63 20.4001C13.26 20.5701 12.92 20.7101 12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.69012C2 5.60012 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.98014 12 5.33014C13.01 3.98014 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.60012 22 8.69012Z" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
    megaphone: `<svg viewBox="-3.36 -3.36 30.72 30.72" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 6L14.8686 4.13137C15.2646 3.73536 15.4627 3.53735 15.691 3.46316C15.8918 3.3979 16.1082 3.3979 16.309 3.46316C16.5373 3.53735 16.7354 3.73535 17.1314 4.13137L19.8686 6.86863C20.2646 7.26465 20.4627 7.46265 20.5368 7.69098C20.6021 7.89183 20.6021 8.10817 20.5368 8.30902C20.4627 8.53735 20.2646 8.73535 19.8686 9.13137L18 11M13 6L11.9499 6.30002M13 6L18 11M3 21L5.63622 9.57637C5.73171 9.16261 5.77945 8.95573 5.86132 8.77473C6.04707 8.36411 6.36605 8.02826 6.76656 7.82162C6.94311 7.73054 7.14726 7.67221 7.55556 7.55556M3 21L14.4236 18.3638C14.8374 18.2683 15.0443 18.2206 15.2253 18.1387C15.6359 17.9529 15.9717 17.634 16.1784 17.2334C16.2695 17.0569 16.3278 16.8527 16.4444 16.4444M3 21L8.43934 15.5605M18 11L17.7 12.0501M3 3L21 21M11 14.5C11 15.3284 10.3284 16 9.5 16C8.67157 16 8 15.3284 8 14.5C8 13.6716 8.67157 13 9.5 13C10.3284 13 11 13.6716 11 14.5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
    'trending-up': `<svg fill="#ffffff" viewBox="-190 -190 1380.00 1380.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M531 624l-88-1q18-44 51.5-76.5T572 500q55-18 110.5-3.5T778 554q4 5 10.5 5t11.5-4l26-24q5-5 5.5-12t-4.5-12q-53-58-127-77.5T553 433q-65 21-112.5 71.5T373 623h-93q-4 0-5 3t1 6l126 144q1 1 3 1t4-1l126-143q2-3 1-6t-5-3zm451 143L857 623q-2-2-4-2t-3 2L724 766q-3 2-1.5 5.5t4.5 3.5h88q-17 45-51 77.5T686 899q-55 18-110 3t-95-57q-5-5-11-5.5t-11 4.5l-26 23q-5 5-5.5 12t4.5 13q38 41 88.5 63.5T626 978q41 0 80-13 65-21 112.5-71T885 776h94q3 0 4.5-3.5T982 767zM70 252v447q0 14 9.5 23.5T103 732h127q6 0 11-4.5t5-11.5v-22q0-7-5-12t-11-5H125V296h568v56q0 7 4.5 12t11.5 5h21q7 0 12-5t5-12V252H70zm677-32v-55q0-13-9.5-23T714 132H613v-13q0-12-6-23t-16.5-17-22.5-6-22.5 6T529 96t-6 23v13H293v-13q0-19-13-32t-31.5-13T217 87t-13 32v13H103q-14 0-23.5 10T70 165v55h677z"></path></g></svg>`,
    'bar-chart': `<svg fill="#ffffff" viewBox="-5.12 -5.12 42.24 42.24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g data-name="Layer 7" id="Layer_7"> <path d="M23.91,16.14l3.88-3.62a3,3,0,0,0,.15-4.24L24.53,4.63a3,3,0,0,0-4.23-.15L16.13,8.36l-4-4a3,3,0,0,0-4.24,0L4.33,7.87a3,3,0,0,0,0,4.24l3.76,3.75L4.21,19.48a3,3,0,0,0-.15,4.24l3.41,3.65a3,3,0,0,0,2.1,1h.1a2.94,2.94,0,0,0,2-.81l4.17-3.88,2.06,2.07h0a.77.77,0,0,0,.29.19s0,0,.07,0a1,1,0,0,0,.34.07h6.74a1.09,1.09,0,0,0,.39-.08,1,1,0,0,0,.32-.21l1.58-1.58h0a3,3,0,0,0,0-4.24ZM17.55,9.78l4.12-3.84a1,1,0,0,1,.7-.27,1,1,0,0,1,.7.32l3.41,3.65a1,1,0,0,1,.27.72,1,1,0,0,1-.32.7h0l-3.94,3.66L18.58,10.8Zm-3.1,12.44-4.12,3.84a1,1,0,0,1-.7.27,1,1,0,0,1-.7-.32L5.52,22.36a1,1,0,0,1-.27-.72,1,1,0,0,1,.32-.7l3.94-3.66,4.17,4.17ZM20.19,24l.33-.72,1.79.72Zm6.06-1.29h0l-.56.57a1,1,0,0,0-.32-.21l-5-2a1,1,0,0,0-1.28.52l-.76,1.68L5.75,10.69a1,1,0,0,1,0-1.4L9.29,5.75a1,1,0,0,1,1.4,0L26.25,21.31a1,1,0,0,1,0,1.4Z"></path> <path d="M11.5,9A2.5,2.5,0,1,0,14,11.5,2.5,2.5,0,0,0,11.5,9Zm0,3a.5.5,0,1,1,.5-.5A.5.5,0,0,1,11.5,12Z"></path> </g> </g></svg>`
};

const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) {
  services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.innerHTML = `
      <div class="service-icon">
        ${icons[service.icon]}
      </div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    `;
    servicesGrid.appendChild(serviceCard);
  });
}

gsap.from('.header__image', { opacity: 0, duration: 2, delay: 1.2, y: -25 })
gsap.from('.header__content', { opacity: 0, duration: 2, delay: 1.2, y: 25 })
gsap.from('.video__image, .hgf, .ab2', { opacity: 0, duration: 2, delay: 1.4, y: 25, ease: 'expo.out' })
gsap.from('.sub__header', { opacity: 0, duration: 2, delay: 1.4, y: 25, ease: 'expo.out' })

// gsap.from('.nav__logo, .nav__toggle', { opacity: 0, duration: 1.5, delay: 2, y: 25, ease: 'expo.out' })
// gsap.from('.abts', { opacity: 0, duration: 1.5, delay: 1.8, y: 25, ease: 'expo.out' })
// gsap.from('.ab1', { opacity: 0, duration: 1.2, delay: 1.7, y: 25, ease: 'expo.out' })
// gsap.from('.delp', { opacity: 0, duration: 1.2, delay: 1.3, y: 25, ease: 'expo.out' })
// gsap.from('.delc', { opacity: 0, duration: 1, delay: 1, y: 25, ease: 'expo.out' })
gsap.from('.home__img-2', 1.2, { opacity: 0, y: 200, delay: .1 })
gsap.from('.home__img-3', 1.2, { opacity: 0, y: 200, delay: .5 })
gsap.from('.home__data', 1.2, { opacity: 0, y: -60, delay: 1 })
gsap.from('.home__bird-1', 1.2, { opacity: 0, x: -80, delay: 1.1 })
gsap.from('.home__bird-2', 1.2, { opacity: 0, x: 80, delay: 1.2 })
gsap.from('.home__img-1', 1.2, { opacity: 0, y: 200, delay: 1.2 })
gsap.from('.home__img-4', 1.2, { opacity: 0, x: 200, delay: 1.3 })

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

const scriptURL = 'https://script.google.com/macros/s/AKfycby0b-kBTAJv2lG8uRS6X1zAfiCLWUOnD3o5qnXnN4ZVIe1U9hhm-r20utn5trshtYLjVw/exec';
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