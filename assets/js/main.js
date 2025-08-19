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
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.455 2.30885L11.9998 2.07617L11.5447 2.30885C10.3952 2.89646 9.35317 3.6638 8.45557 4.57394C9.77392 5.26024 10.9693 6.15018 12.0001 7.20207C13.0308 6.15028 14.2261 5.26041 15.5443 4.57414C14.6466 3.66391 13.6045 2.8965 12.455 2.30885ZM10.6993 8.73433C8.98925 6.93503 6.72625 5.66541 4.18066 5.19783L3 4.98096V13.0002C3 16.8047 5.36065 20.0579 8.69711 21.3748C8.24472 19.9984 8 18.5278 8 17C8 13.9083 9.00215 11.0507 10.6993 8.73433ZM21 4.98096L19.8193 5.19783C14.233 6.22396 10 11.1168 10 17.0002C10 18.5362 10.2891 20.0071 10.8167 21.3598L11.0569 21.9754C11.3711 21.9852 11.6856 22.0002 12 22.0002C16.9706 22.0002 21 17.9708 21 13.0002V4.98096Z"></path></svg>`,
  tool: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.53614 4 7.33243 5.11383 5.86492 6.86543L8 9H2V3L4.44656 5.44648C6.28002 3.33509 8.9841 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 9C4 6.49238 5.71351 5 7.5 5C9.40609 5 10.7537 6.58211 12 7.82843C13.2463 6.58211 14.5939 5 16.5 5C18.3158 5 20 6.48356 20 9C20 10.1222 19.7639 11.1501 19.3509 12.1019L21.1856 12.8981C21.7005 11.7114 22 10.4135 22 9C22 5.49592 19.5337 3 16.5 3C14.5905 3 13.1464 3.9848 12 5.02802C10.8536 3.9848 9.40952 3 7.5 3C4.50355 3 2 5.49623 2 9C2 12.0199 3.36207 14.4702 5.20346 16.445C7.03313 18.4073 9.38528 19.955 11.4916 21.1985L12.5084 19.4762C10.441 18.2557 8.29313 16.8259 6.66623 15.0811C5.05106 13.3489 4 11.3626 4 9ZM19 17V14H17V17H14V19H16.999L17 22H19L18.999 19H22V17H19Z"></path></svg>`,
  megaphone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>`,
  'trending-up': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 14V16H6V14H8ZM18 14V16H10V14H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg>`,
  'bar-chart': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.32943 3.27158C6.56252 2.8332 7.9923 3.10749 8.97927 4.09446C10.1002 5.21537 10.3019 6.90741 9.5843 8.23385L20.293 18.9437L18.8788 20.3579L8.16982 9.64875C6.84325 10.3669 5.15069 10.1654 4.02952 9.04421C3.04227 8.05696 2.7681 6.62665 3.20701 5.39332L5.44373 7.63C6.02952 8.21578 6.97927 8.21578 7.56505 7.63C8.15084 7.04421 8.15084 6.09446 7.56505 5.50868L5.32943 3.27158ZM15.6968 5.15512L18.8788 3.38736L20.293 4.80157L18.5252 7.98355L16.7574 8.3371L14.6361 10.4584L13.2219 9.04421L15.3432 6.92289L15.6968 5.15512ZM8.97927 13.2868L10.3935 14.7011L5.09018 20.0044C4.69966 20.3949 4.06649 20.3949 3.67597 20.0044C3.31334 19.6417 3.28744 19.0699 3.59826 18.6774L3.67597 18.5902L8.97927 13.2868Z"></path></svg>`
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