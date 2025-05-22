// // Esperar a que el DOM esté completamente cargado
// document.addEventListener('DOMContentLoaded', function() {
//   // Variables para animaciones
//   const sections = document.querySelectorAll('section');

//   // Animación de las barras de progreso en habilidades
//   function animateSkillBars() {
//       const skillItems = document.querySelectorAll('.skill-item');

//       skillItems.forEach((item, index) => {
//           const progress = item.querySelector('.skill-progress');
//           if (progress) {
//               const progressValue = progress.style.width;

//               // Resetear el valor para la animación
//               progress.style.width = '0';

//               // Delay por elemento para efecto escalonado
//               setTimeout(() => {
//                   progress.style.width = progressValue;
//               }, index * 100);
//           }
//       });
//   }

//   // Animación de entrada para los elementos
//   function animateOnScroll() {
//       const elements = document.querySelectorAll('.animate-on-scroll');

//       elements.forEach(element => {
//           const elementPosition = element.getBoundingClientRect().top;
//           const windowHeight = window.innerHeight;

//           if (elementPosition < windowHeight - 50) {
//               element.classList.add('animate');
//           }
//       });
//   }

//   // Observer para las secciones (animaciones al entrar en viewport)
//   const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//           if (entry.isIntersecting) {
//               if (entry.target.id === 'habilidades') {
//                   animateSkillBars();
//               }
//               entry.target.classList.add('in-view');
//           }
//       });
//   }, {
//       threshold: 0.15
//   });

//   // Observar todas las secciones
//   sections.forEach(section => {
//       observer.observe(section);
//       section.classList.add('animate-section');
//   });

//   // Inicializar los elementos con animación al cargar
//   document.querySelectorAll('.skill-category, .timeline-item, .project-item, .service-card').forEach(item => {
//       item.classList.add('animate-on-scroll');
//   });

//   // Función para el efecto de escritura en la sección hero
//   function typeEffect(element, text, speed = 100) {
//       let i = 0;

//       const timer = setInterval(() => {
//           if (i < text.length) {
//               element.innerHTML += text.charAt(i);
//               i++;
//           } else {
//               clearInterval(timer);
//               // Iniciar el parpadeo del cursor
//               const cursor = document.createElement('span');
//               cursor.className = 'cursor';
//               cursor.innerHTML = '|';
//               element.appendChild(cursor);

//               // Animación del cursor
//               setInterval(() => {
//                   cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
//               }, 500);
//           }
//       }, speed);
//   }

//   // Inicializar efectos de aparición al hacer scroll
//   const observerOptions = {
//       threshold: 0.1,
//   };

//   const fadeObserver = new IntersectionObserver(function (entries, observer) {
//       entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//               entry.target.classList.add("visible");
//               observer.unobserve(entry.target);
//           }
//       });
//   }, observerOptions);

//   // Observar todos los elementos con clases de animación
//   document
//       .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in")
//       .forEach((el) => {
//           fadeObserver.observe(el);
//       });

//   // Animación para cuando se carga la página
//   window.addEventListener("load", function () {
//       const loader = document.querySelector(".page-loader");
//       if (loader) {
//           setTimeout(() => {
//               loader.style.opacity = "0";
//               setTimeout(() => {
//                   loader.style.display = "none";
//               }, 500);
//           }, 1000);
//       }

//       // Animar elementos que deberían aparecer al cargar
//       document.querySelectorAll('.hero-content, .hero h1, .hero h2, .hero p').forEach(el => {
//           el.classList.add('visible');
//       });
//   });

//   // Aplicar clases CSS para animaciones
//   document.querySelectorAll('.burger div').forEach(div => {
//       div.classList.add('transition');
//   });
// });

// // Agregar clases CSS necesarias para las animaciones
// document.addEventListener('DOMContentLoaded', function() {
//   // Añadir clases CSS para el menú móvil si no existen
//   const style = document.createElement('style');
//   style.textContent = `
//       .burger div.rotate-down {
//           transform: rotate(-45deg) translate(-5px, 6px);
//       }

//       .burger div.fade-out {
//           opacity: 0;
//       }

//       .burger div.rotate-up {
//           transform: rotate(45deg) translate(-5px, -6px);
//       }

//       .burger div.transition {
//           transition: all 0.3s ease;
//       }

//       @media (max-width: 768px) {
//           .nav-links.active {
//               height: calc(100vh - 80px) !important;
//               padding: 2rem 0 !important;
//               opacity: 1 !important;
//               visibility: visible !important;
//               display: flex !important;
//               flex-direction: column !important;
//           }
//       }
//   `;
//   document.head.appendChild(style);
// });

// ===== EFECTOS COMPLEMENTARIOS PARA EL CSS MEJORADO =====

// 1. Scroll Indicator Animado
function updateScrollIndicator() {
  const scrollProgress = document.querySelector(".scroll-progress");
  if (scrollProgress) {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";
  }
}

// 2. Navbar Scroll Effect
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
}

// 3. Animaciones de Entrada (Intersection Observer)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observar elementos con clases de animación
  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in")
    .forEach((el) => {
      observer.observe(el);
    });
}

// 4. Cursor Personalizado
function initCustomCursor() {
  const cursor = document.createElement("div");
  const cursorDot = document.createElement("div");
  const cursorCircle = document.createElement("div");

  cursor.classList.add("custom-cursor");
  cursorDot.classList.add("cursor-dot");
  cursorCircle.classList.add("cursor-circle");

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorCircle);

  let mouseX = 0,
    mouseY = 0;
  let dotX = 0,
    dotY = 0;
  let circleX = 0,
    circleY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * 0.8;
    dotY += (mouseY - dotY) * 0.8;
    circleX += (mouseX - circleX) * 0.3;
    circleY += (mouseY - circleY) * 0.3;

    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Efectos hover
  document.querySelectorAll("a, button, .btn").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorCircle.style.transform += " scale(1.5)";
      cursorDot.style.transform += " scale(2)";
    });
    el.addEventListener("mouseleave", () => {
      cursorCircle.style.transform = cursorCircle.style.transform.replace(
        " scale(1.5)",
        ""
      );
      cursorDot.style.transform = cursorDot.style.transform.replace(
        " scale(2)",
        ""
      );
    });
  });
}

// 5. Efectos Magnéticos para Botones
function initMagneticButtons() {
  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });
}

// 6. Partículas Flotantes
function createFloatingParticles() {
  const skillsSection = document.querySelector(".skills");
  if (!skillsSection) return;

  const particlesContainer = document.createElement("div");
  particlesContainer.className = "floating-elements";
  skillsSection.appendChild(particlesContainer);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-element";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 15 + "s";
    particlesContainer.appendChild(particle);
  }
}

// 7. Efecto Parallax Simple
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll(".parallax-element");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const rate = scrolled * -0.5;
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// 8. Animación de Texto Typewriter
function initTypewriterEffect() {
  const typewriterElements = document.querySelectorAll(".typewriter");

  typewriterElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";
    element.style.borderRight = "2px solid var(--secondary-color)";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Efecto de parpadeo del cursor
        setInterval(() => {
          element.style.borderRight =
            element.style.borderRight === "none"
              ? "2px solid var(--secondary-color)"
              : "none";
        }, 500);
      }
    }

    // Iniciar cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(element);
        }
      });
    });
    observer.observe(element);
  });
}

// 9. Contador Animado para Skills
function animateCounters() {
  const counters = document.querySelectorAll(".skill-counter");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.floor(current) + "%";
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + "%";
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    });
    observer.observe(counter);
  });
}

// 10. Filtro de Proyectos Animado
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remover clase activa
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";

          setTimeout(() => {
            item.style.display = "block";
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 300);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// 11. Smooth Scroll Mejorado
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// 12. Menú Móvil Mejorado
function initMobileMenu() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
      burger.classList.toggle("active");

      // Animar links individualmente
      navLinks.forEach((link, index) => {
        if (nav.classList.contains("active")) {
          link.style.animation = `fadeInUp 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        } else {
          link.style.animation = "";
        }
      });
    });

    // Cerrar menú al hacer click en un link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        burger.classList.remove("active");
      });
    });
  }
}

// 13. Detector de Tema del Sistema
function initThemeDetector() {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function handleThemeChange(e) {
    if (e.matches) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }

  prefersDarkScheme.addListener(handleThemeChange);
  handleThemeChange(prefersDarkScheme);
}

// 14. Preloader Animado
function initPreloader() {
  const preloader = document.querySelector(".page-loader");

  window.addEventListener("load", () => {
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  });
}

// 15. Inicialización de Todos los Efectos
function initAllEffects() {
  // Efectos básicos
  initScrollAnimations();
  initSmoothScroll();
  initMobileMenu();
  initPreloader();

  // Efectos visuales avanzados
  createFloatingParticles();
  initMagneticButtons();
  initTypewriterEffect();
  animateCounters();
  initProjectFilters();

  // Efectos opcionales (descomenta para usar)
  // initCustomCursor();
  // initParallaxEffect();
  // initThemeDetector();

  // Event listeners para scroll
  window.addEventListener("scroll", () => {
    updateScrollIndicator();
    handleNavbarScroll();
  });

  // Optimización de rendimiento
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Aquí van las funciones que se ejecutan en cada frame
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
  window.addEventListener("resize", requestTick);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllEffects);
} else {
  initAllEffects();
}

// ===== UTILIDADES ADICIONALES =====

// Función para generar colores aleatorios
function getRandomColor() {
  const colors = ["#3b82f6", "#f43f5e", "#8b5cf6", "#10b981", "#f59e0b"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Función para detectar si el dispositivo soporta hover
function supportsHover() {
  return window.matchMedia("(hover: hover)").matches;
}

// Función para optimizar animaciones según el rendimiento
function optimizeAnimations() {
  const isLowPerformance =
    navigator.hardwareConcurrency < 4 ||
    navigator.connection?.effectiveType === "slow-2g" ||
    navigator.connection?.effectiveType === "2g";

  if (isLowPerformance) {
    document.body.classList.add("reduce-animations");
  }
}

// Ejecutar optimizaciones
optimizeAnimations();
