// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const navbar = document.querySelector(".navbar");
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  const sections = document.querySelectorAll("section");
  
  // Variables del formulario y modal
  const contactForm = document.getElementById("contactForm");
  const modalContacto = document.getElementById("modal-contacto");
  const modalClose = document.querySelector(".modal-close");

  // Función para añadir la clase 'scrolled' a la navegación cuando se hace scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Destacar elemento del menú según la sección visible
    highlightNavOnScroll();
  });

  // Función para destacar menú de navegación según la sección visible
  function highlightNavOnScroll() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");
      }
    });
  }

  // Navegación móvil (hamburguesa)
  if (burger) {
    burger.addEventListener("click", function (e) {
      // Prevenir propagación para evitar conflictos
      e.stopPropagation();

      // Toggle para mostrar/ocultar menú
      navLinks.classList.toggle("active");
      burger.classList.toggle("active");

      // Animación del icono hamburguesa
      const burgerLines = document.querySelectorAll(".burger div");
      burgerLines[0].classList.toggle("rotate-down");
      burgerLines[1].classList.toggle("fade-out");
      burgerLines[2].classList.toggle("rotate-up");

      // Aplicar estilos inline para asegurar visibilidad
      if (navLinks.classList.contains("active")) {
        navLinks.style.display = "flex";
        navLinks.style.opacity = "1";
        navLinks.style.visibility = "visible";
      } else {
        setTimeout(() => {
          if (!navLinks.classList.contains("active")) {
            navLinks.style.display = "";
          }
        }, 300);
      }
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navLinks.classList.remove("active");
      burger.classList.remove("active");

      // Resetear animación del icono hamburguesa
      const burgerLines = document.querySelectorAll(".burger div");
      burgerLines[0].classList.remove("rotate-down");
      burgerLines[1].classList.remove("fade-out");
      burgerLines[2].classList.remove("rotate-up");
    });
  });

  // Cerrar menú cuando se hace clic fuera
  document.addEventListener("click", function (event) {
    if (
      navLinks &&
      navLinks.classList.contains("active") &&
      !navLinks.contains(event.target) &&
      !burger.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      burger.classList.remove("active");

      // Resetear animación del icono hamburguesa
      const burgerLines = document.querySelectorAll(".burger div");
      burgerLines[0].classList.remove("rotate-down");
      burgerLines[1].classList.remove("fade-out");
      burgerLines[2].classList.remove("rotate-up");
    }
  });

  // Filtro de proyectos
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remover clase 'active' de todos los botones
      filterBtns.forEach((btn) => btn.classList.remove("active"));

      // Añadir clase 'active' al botón clicado
      this.classList.add("active");

      // Obtener el valor del filtro
      const filterValue = this.getAttribute("data-filter");

      // Filtrar proyectos
      projectItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
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

  // Inicializar sección de títulos con atributos data-text
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    if (!title.hasAttribute("data-text")) {
      title.setAttribute("data-text", title.textContent.toUpperCase());
    }
  });

  // Smooth scroll para los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Inicializar filtro de proyectos (mostrar todos por defecto)
  const defaultFilterBtn = document.querySelector(
    '.filter-btn[data-filter="all"]'
  );
  if (defaultFilterBtn) {
    defaultFilterBtn.click();
  }

  // Mostrar año actual en el footer
  const yearElement = document.querySelector(".current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========== FUNCIONES DEL FORMULARIO DE CONTACTO ==========
  
  // Función para limpiar el formulario
  function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("asunto").value = "";
    document.getElementById("mensaje").value = "";
    console.log("Formulario limpiado");
  }

  // Función para mostrar el modal
  function mostrarModal(event) {
    event.preventDefault();
    console.log("Mostrando modal...");
    
    if (modalContacto) {
      modalContacto.style.display = "flex";
      // Añadir la clase active después de un pequeño delay para la animación
      setTimeout(() => {
        modalContacto.classList.add("active");
      }, 10);
    } else {
      console.error("Modal no encontrado");
    }
  }

  // Función para cerrar el modal
  function cerrarModal() {
    console.log("Cerrando modal...");
    
    if (modalContacto) {
      modalContacto.classList.remove("active");
      setTimeout(() => {
        modalContacto.style.display = "none";
      }, 300);
    }
  }

  // Función para enviar por WhatsApp
  function enviarPorWhatsApp() {
    const nombre = document.getElementById("nombre").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;

    const mensajeCompleto = `¡Hola! Soy ${nombre}. Asunto: ${asunto}. Mensaje: ${mensaje}`;
    const whatsappURL = `https://wa.me/50663868608?text=${encodeURIComponent(
      mensajeCompleto
    )}`;

    window.open(whatsappURL, "_blank");
    cerrarModal();
    limpiarFormulario();
  }

  // Función para enviar por Email
  function enviarPorEmail() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;

    const cuerpoEmail = `
Formulario de Contacto - SPIKEDTECH
-----------------------------------
Nombre: ${nombre}
Email: ${email}
Asunto: ${asunto}
-----------------------------------
Mensaje:
${mensaje}
-----------------------------------
    `;

    const mailtoURL = `mailto:spikedtech19@gmail.com?subject=Contacto: ${asunto}&body=${encodeURIComponent(
      cuerpoEmail
    )}`;

    window.location.href = mailtoURL;
    cerrarModal();
    limpiarFormulario();
  }

  // Event listeners para el formulario y modal
  if (contactForm) {
    contactForm.addEventListener("submit", mostrarModal);
  }

  // Cerrar modal con el botón X
  if (modalClose) {
    modalClose.addEventListener("click", cerrarModal);
  }

  // Cerrar modal al hacer clic fuera del contenido
  if (modalContacto) {
    modalContacto.addEventListener("click", function(e) {
      if (e.target === modalContacto) {
        cerrarModal();
      }
    });
  }

  // Asignar funciones a los botones del modal
  const whatsappBtn = document.querySelector(".whatsapp-btn");
  const emailBtn = document.querySelector(".email-btn");

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", enviarPorWhatsApp);
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", enviarPorEmail);
  }

  // Hacer las funciones accesibles globalmente si es necesario
  window.mostrarModal = mostrarModal;
  window.cerrarModal = cerrarModal;
  window.enviarPorWhatsApp = enviarPorWhatsApp;
  window.enviarPorEmail = enviarPorEmail;

  // ========== BOTÓN DE ACCESO AL REPOSITORIO ==========
  const accessButton = document.querySelector('.btn.btn-sm');
  
  if (accessButton) {
    accessButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Configuración del correo
      const emailAddress = 'jqchaves1928@gmail.com';
      const subject = 'Solicitud de acceso al repositorio API C# SQL Server';
      const body = 'Me gustaría solicitar acceso al repositorio de la API REST de autenticación desarrollada en C# con SQL Server.\n\n' +
                  'Información de contacto:\n' +
                  'Nombre: \n' +
                  'Empresa/Persona: \n' +
                  'Motivo de la solicitud: \n\n' +
                  'Gracias por su atención.';
      
      // Crear URL mailto
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Abrir cliente de correo del usuario
      window.location.href = mailtoUrl;
    });
  }
});