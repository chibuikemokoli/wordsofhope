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
  instagram: `<i class="ri-flower-fill"></i>`,
  tool: `<i class="ri-history-line"></i>`,
  users: `<i class="ri-heart-add-2-line"></i>`,
  megaphone: `<i class="ri-login-circle-line"></i>`,
  'trending-up': `<i class="ri-calendar-todo-fill"></i>`,
  'bar-chart': `<i class="ri-tools-line"></i>`
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