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
  initPreloader();

  // Efectos visuales avanzados
  createFloatingParticles();
  initMagneticButtons();
  initTypewriterEffect();
  animateCounters();
  initProjectFilters();

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
