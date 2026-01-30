// Animation au scroll
document.addEventListener('DOMContentLoaded', function() {
  // Animation des éléments au scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // Observer les éléments avec la classe 'animate-on-scroll'
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Effet parallaxe sur la section hero
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Contrôle de la vidéo hero
  const videoHero = document.getElementById('hero-video');
  if (videoHero) {
    videoHero.playbackRate = 0.8;
  }

  // Animation des compteurs CORRIGÉE
  animateCountersWithEffect();
  
  // Animation des éléments flottants
  initFloatingElements();
  
  // ANIMATIONS "WAOW" - BKS Concept
  animateTitles();
  glitchEffect();
  createParticles();
  init3DHover();
  gradientWaveEffect();
  neonGlowEffect();
  textRevealEffect();
  
  // Initialiser les autres animations
  initCardAnimations();
  initMobileMenu();
});

// Animation des compteurs numériques AVEC EFFET
function animateCountersWithEffect() {
  const counters = document.querySelectorAll('.counter-effect');
  
  if (counters.length === 0) {
    console.log('Aucun compteur trouvé avec la classe .counter-effect');
    return;
  }
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (isNaN(target)) {
      console.log('data-target non valide pour le compteur:', counter);
      return;
    }
    
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    
    // Démarrer l'animation quand le compteur est visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// Animation des éléments flottants
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
  });
}

// Animation des cartes au hover
function initCardAnimations() {
  const cards = document.querySelectorAll('.hover-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
  });
}

// Animation du menu mobile
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });
  }
}

// Netlify gère maintenant le formulaire, donc on désactive notre JS
// Le formulaire est désormais géré par Netlify Forms
/*
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Envoi en cours...';
      submitBtn.disabled = true;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const successMsg = document.createElement('div');
      successMsg.className = 'alert alert-success mt-4 animate-fade-in';
      successMsg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Message envoyé avec succès! Nous vous répondrons dans les 24h.</span>
      `;
      
      contactForm.appendChild(successMsg);
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
      
      setTimeout(() => {
        successMsg.style.opacity = '0';
        setTimeout(() => {
          successMsg.remove();
        }, 500);
      }, 5000);
    });
  }
});
*/

// ANIMATIONS "WAOW"
function animateTitles() {
  const titles = document.querySelectorAll('.title-animate');
  if (titles.length === 0) return;
  
  titles.forEach(title => {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(title);
  });
}

function glitchEffect() {
  const logo = document.querySelector('.logo-glitch');
  if (!logo) return;
  
  setInterval(() => {
    if (Math.random() > 0.95) {
      logo.style.transform = 'translateX(2px)';
      logo.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff';
      
      setTimeout(() => {
        logo.style.transform = 'translateX(0)';
        logo.style.textShadow = 'none';
      }, 100);
    }
  }, 3000);
}

function createParticles() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? '#3B82F6' : '#8B5CF6'};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.3 + 0.1};
      pointer-events: none;
      z-index: 0;
    `;
    hero.appendChild(particle);
  }
}

function init3DHover() {
  const cards = document.querySelectorAll('.card-3d');
  if (cards.length === 0) return;
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = ((centerY - y) / centerY) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

function gradientWaveEffect() {
  const buttons = document.querySelectorAll('.btn-wave');
  if (buttons.length === 0) return;
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)';
      btn.style.backgroundSize = '400% 100%';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.background = '';
      btn.style.backgroundSize = '';
    });
  });
}

function neonGlowEffect() {
  const sections = document.querySelectorAll('.neon-section');
  if (sections.length === 0) return;
  
  sections.forEach(section => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('neon-active');
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(section);
  });
}

function textRevealEffect() {
  const elements = document.querySelectorAll('.text-reveal');
  if (elements.length === 0) return;
  
  elements.forEach(element => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(element);
  });
}

// Initialiser quand la page est chargée
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});