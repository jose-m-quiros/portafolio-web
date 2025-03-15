// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Variables para animaciones
  const sections = document.querySelectorAll('section');
  
  // Animación de las barras de progreso en habilidades
  function animateSkillBars() {
      const skillItems = document.querySelectorAll('.skill-item');
      
      skillItems.forEach((item, index) => {
          const progress = item.querySelector('.skill-progress');
          if (progress) {
              const progressValue = progress.style.width;
              
              // Resetear el valor para la animación
              progress.style.width = '0';
              
              // Delay por elemento para efecto escalonado
              setTimeout(() => {
                  progress.style.width = progressValue;
              }, index * 100);
          }
      });
  }
  
  // Animación de entrada para los elementos
  function animateOnScroll() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 50) {
              element.classList.add('animate');
          }
      });
  }
  
  // Observer para las secciones (animaciones al entrar en viewport)
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              if (entry.target.id === 'habilidades') {
                  animateSkillBars();
              }
              entry.target.classList.add('in-view');
          }
      });
  }, {
      threshold: 0.15
  });
  
  // Observar todas las secciones
  sections.forEach(section => {
      observer.observe(section);
      section.classList.add('animate-section');
  });
  
  // Inicializar los elementos con animación al cargar
  document.querySelectorAll('.skill-category, .timeline-item, .project-item, .service-card').forEach(item => {
      item.classList.add('animate-on-scroll');
  });
  
  // Función para el efecto de escritura en la sección hero
  function typeEffect(element, text, speed = 100) {
      let i = 0;
      
      const timer = setInterval(() => {
          if (i < text.length) {
              element.innerHTML += text.charAt(i);
              i++;
          } else {
              clearInterval(timer);
              // Iniciar el parpadeo del cursor
              const cursor = document.createElement('span');
              cursor.className = 'cursor';
              cursor.innerHTML = '|';
              element.appendChild(cursor);
              
              // Animación del cursor
              setInterval(() => {
                  cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
              }, 500);
          }
      }, speed);
  }
  
  // Inicializar efectos de aparición al hacer scroll
  const observerOptions = {
      threshold: 0.1,
  };

  const fadeObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  // Observar todos los elementos con clases de animación
  document
      .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in")
      .forEach((el) => {
          fadeObserver.observe(el);
      });
  
  // Animación para cuando se carga la página
  window.addEventListener("load", function () {
      const loader = document.querySelector(".page-loader");
      if (loader) {
          setTimeout(() => {
              loader.style.opacity = "0";
              setTimeout(() => {
                  loader.style.display = "none";
              }, 500);
          }, 1000);
      }
      
      // Animar elementos que deberían aparecer al cargar
      document.querySelectorAll('.hero-content, .hero h1, .hero h2, .hero p').forEach(el => {
          el.classList.add('visible');
      });
  });
  
  // Aplicar clases CSS para animaciones
  document.querySelectorAll('.burger div').forEach(div => {
      div.classList.add('transition');
  });
});

// Agregar clases CSS necesarias para las animaciones
document.addEventListener('DOMContentLoaded', function() {
  // Añadir clases CSS para el menú móvil si no existen
  const style = document.createElement('style');
  style.textContent = `
      .burger div.rotate-down {
          transform: rotate(-45deg) translate(-5px, 6px);
      }
      
      .burger div.fade-out {
          opacity: 0;
      }
      
      .burger div.rotate-up {
          transform: rotate(45deg) translate(-5px, -6px);
      }
      
      .burger div.transition {
          transition: all 0.3s ease;
      }
      
      @media (max-width: 768px) {
          .nav-links.active {
              height: calc(100vh - 80px) !important;
              padding: 2rem 0 !important;
              opacity: 1 !important;
              visibility: visible !important;
              display: flex !important;
              flex-direction: column !important;
          }
      }
  `;
  document.head.appendChild(style);
});