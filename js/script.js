/**
 * ========================================
 * PORTFOLIO ULTRA MODERNO - SCRIPT PRINCIPAL
 * Jose M Quiros - Estudiante de Ingenieria en Seguridad Informatica
 * ========================================
 */

class ModernPortfolio {
  constructor() {
    this.init();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.initializeComponents();
    
    // Variable para almacenar datos del formulario temporalmente
    this.formDataCache = null;
  }

  init() {
    // Variables de estado
    this.isLoading = true;
    this.currentTheme = "dark";
    this.isMenuOpen = false;
    this.currentSection = "inicio";
    this.isScrolling = false;
    this.scrollTimer = null;

    // Elementos del DOM
    this.elements = {
      body: document.body,
      html: document.documentElement,
      loader: document.getElementById("pageLoader"),
      navbar: document.querySelector(".navbar"),
      navLinks: document.querySelectorAll(".nav-link"),
      mobileMenu: document.querySelector(".nav-links"),
      mobileMenuToggle: document.getElementById("mobileMenuToggle"),
      themeToggle: document.getElementById("themeToggle"),
      scrollProgress: document.querySelector(".scroll-progress-bar"),
      typewriter: document.getElementById("typewriter"),
      statNumbers: document.querySelectorAll(".stat-number"),
      skillFilters: document.querySelectorAll(".skills-filter .filter-btn"),
      projectFilters: document.querySelectorAll(".project-filters .filter-btn"),
      contactForm: document.getElementById("contactForm"),
      modal: document.getElementById("modal-contacto"),
      accessibilityPanel: document.getElementById("accessibilityPanel"),
      accessibilityToggle: document.getElementById("accessibilityToggle"),
    };

    // Configuraciones
    this.config = {
      typewriterTexts: [
        "Estudiante de Ingenieria en Seguridad Informatica",
        "Desarrollador Full Stack",
        "Especialista en Ciberseguridad",
        "Fundador de SPIKEDTECH",
        "Consultor Tecnológico",
      ],
      typewriterSpeed: 100,
      typewriterDelay: 2000,
      scrollThreshold: 100,
      animationDelay: 100,
    };

    // Estado de preferencias (en memoria ya que no podemos usar localStorage)
    this.preferences = {
      theme: "dark",
      fontSize: "normal",
      highContrast: false,
      reduceMotion: false,
    };
  }

  bindEvents() {
    // Eventos de carga
    window.addEventListener("load", () => this.handlePageLoad());
    window.addEventListener("beforeunload", () => this.handlePageUnload());

    // Eventos de scroll
    window.addEventListener("scroll", () => this.handleScroll(), {
      passive: true,
    });
    window.addEventListener("resize", () => this.handleResize(), {
      passive: true,
    });

    // Eventos de navegación
    this.elements.mobileMenuToggle?.addEventListener("click", () =>
      this.toggleMobileMenu()
    );
    this.elements.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e));
    });

    // Eventos de tema
    this.elements.themeToggle?.addEventListener("click", () =>
      this.toggleTheme()
    );

    // Eventos de formulario
    this.elements.contactForm?.addEventListener("submit", (e) =>
      this.handleFormSubmit(e)
    );

    // Eventos de filtros
    this.elements.skillFilters.forEach((filter) => {
      filter.addEventListener("click", (e) => this.handleSkillFilter(e));
    });

    this.elements.projectFilters.forEach((filter) => {
      filter.addEventListener("click", (e) => this.handleProjectFilter(e));
    });

    // Eventos de modal
    document.addEventListener("click", (e) => this.handleModalClick(e));

    // Eventos de accesibilidad
    this.elements.accessibilityToggle?.addEventListener("click", () =>
      this.toggleAccessibilityPanel()
    );

    // Eventos de teclado
    document.addEventListener("keydown", (e) => this.handleKeydown(e));

    // Eventos de mouse para efectos especiales
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
  }

  setupIntersectionObserver() {
    // Observer para animaciones de entrada
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Animaciones específicas por elemento
          if (entry.target.classList.contains("stat-number")) {
            this.animateCounter(entry.target);
          }

          if (entry.target.classList.contains("skill-card")) {
            this.animateSkillCard(entry.target);
          }
        }
      });
    }, this.observerOptions);

    // Observer para navegación activa
    this.navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            this.updateActiveNavigation(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observar elementos
    this.observeElements();
  }

  observeElements() {
    const elementsToObserve = document.querySelectorAll(
      ".stat-item, .skill-card, .timeline-item, .project-item, .value-item"
    );

    elementsToObserve.forEach((element) => {
      this.intersectionObserver.observe(element);
    });

    // Observar secciones para navegación
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      this.navObserver.observe(section);
    });
  }

  initializeComponents() {
    this.initializeTheme();
    this.initializeTypewriter();
    this.initializeAccessibility();
    this.addRippleEffect();
    this.initializeSkillCards();
  }

  // ==========================================
  // GESTIÓN DE CARGA Y NAVEGACIÓN
  // ==========================================

  handlePageLoad() {
    setTimeout(() => {
      this.hideLoader();
      this.showPageContent();
    }, 1500);
  }

  hideLoader() {
    if (this.elements.loader) {
      this.elements.loader.style.opacity = "0";
      setTimeout(() => {
        this.elements.loader.style.display = "none";
        this.isLoading = false;
      }, 500);
    }
  }

  showPageContent() {
    this.elements.body.classList.add("loaded");
    this.startInitialAnimations();
  }

  startInitialAnimations() {
    // Animar elementos del hero
    const heroElements = document.querySelectorAll(
      ".hero-greeting, .hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-actions"
    );

    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animate-in");
      }, index * 200);
    });
  }

  handlePageUnload() {
    // Cleanup y preparación para descarga
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.navObserver) {
      this.navObserver.disconnect();
    }
  }

  // ==========================================
  // GESTIÓN DE SCROLL
  // ==========================================

  handleScroll() {
    if (!this.isScrolling) {
      requestAnimationFrame(() => {
        this.updateScrollProgress();
        this.updateNavbarState();
        this.updateScrollEffects();
        this.isScrolling = false;
      });
      this.isScrolling = true;
    }

    // Debounce para efectos pesados
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      this.handleScrollEnd();
    }, 150);
  }

  updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;

    if (this.elements.scrollProgress) {
      this.elements.scrollProgress.style.width = `${Math.min(
        scrollPercent,
        100
      )}%`;
    }
  }

  updateNavbarState() {
    const scrollY = window.pageYOffset;

    if (scrollY > this.config.scrollThreshold) {
      this.elements.navbar?.classList.add("scrolled");
    } else {
      this.elements.navbar?.classList.remove("scrolled");
    }
  }

  updateScrollEffects() {
    const scrollY = window.pageYOffset;

    // Parallax suave en el hero
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      const parallaxSpeed = 0.5;
      heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }

    // Efecto en floating icons
    const floatingIcons = document.querySelectorAll(".floating-icon");
    floatingIcons.forEach((icon, index) => {
      const speed = 0.2 + index * 0.1;
      icon.style.transform = `translateY(${scrollY * speed}px) rotate(${
        scrollY * 0.1
      }deg)`;
    });
  }

  handleScrollEnd() {
    // Efectos que se ejecutan cuando termina el scroll
    this.optimizePerformance();
  }

  optimizePerformance() {
    // Limpieza de elementos fuera de vista para mejorar rendimiento
    const viewportHeight = window.innerHeight;

    document
      .querySelectorAll(".timeline-item, .project-item")
      .forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < viewportHeight && rect.bottom > 0;

        if (isInViewport) {
          element.style.willChange = "transform, opacity";
        } else {
          element.style.willChange = "auto";
        }
      });
  }

  // ==========================================
  // NAVEGACIÓN
  // ==========================================

  handleNavClick(e) {
    e.preventDefault();

    const targetId = e.currentTarget.getAttribute("href")?.substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      this.scrollToSection(targetSection);
      this.closeMobileMenu();
    }
  }

  scrollToSection(targetSection) {
    const navbarHeight = this.elements.navbar?.offsetHeight || 80;
    const targetOffset = targetSection.offsetTop - navbarHeight - 20;

    window.scrollTo({
      top: targetOffset,
      behavior: "smooth",
    });
  }

  updateActiveNavigation(sectionId) {
    this.currentSection = sectionId;

    // Actualizar enlaces activos
    this.elements.navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      }
    });
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    this.elements.mobileMenu?.classList.toggle("active", this.isMenuOpen);
    this.elements.mobileMenuToggle?.classList.toggle("active", this.isMenuOpen);
    this.elements.mobileMenuToggle?.setAttribute(
      "aria-expanded",
      this.isMenuOpen
    );

    // Prevenir scroll del body cuando el menu está abierto
    this.elements.body.style.overflow = this.isMenuOpen ? "hidden" : "";
  }

  closeMobileMenu() {
    if (this.isMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  // ==========================================
  // TEMA Y APARIENCIA
  // ==========================================

  initializeTheme() {
    // Aplicar tema inicial
    this.applyTheme(this.preferences.theme);

    // Detectar preferencia del sistema si no hay preferencia guardada
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      // El usuario prefiere tema claro
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.preferences.theme = this.currentTheme;
    this.applyTheme(this.currentTheme);

    // Animación de transición suave
    this.elements.body.style.transition =
      "background-color 0.5s ease, color 0.5s ease";
    setTimeout(() => {
      this.elements.body.style.transition = "";
    }, 500);
  }

  applyTheme(theme) {
    this.elements.html.setAttribute("data-theme", theme);

    // Actualizar meta theme-color
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const color = theme === "dark" ? "#082f49" : "#0ea5e9";
      themeColorMeta.setAttribute("content", color);
    }
  }

  // ==========================================
  // TYPEWRITER EFFECT
  // ==========================================

  initializeTypewriter() {
    if (!this.elements.typewriter) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typewriterLoop = () => {
      const currentText = this.config.typewriterTexts[textIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      this.elements.typewriter.textContent = currentText.substring(
        0,
        charIndex
      );

      let typeSpeed = this.config.typewriterSpeed;

      if (isDeleting) {
        typeSpeed /= 2;
      }

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = this.config.typewriterDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % this.config.typewriterTexts.length;
        typeSpeed = 200;
      }

      setTimeout(typewriterLoop, typeSpeed);
    };

    typewriterLoop();
  }

  // ==========================================
  // CONTADORES ANIMADOS
  // ==========================================

  animateCounter(element) {
    const target = parseInt(element.getAttribute("data-count")) || 0;
    const duration = 2000;
    const start = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function para suavizar la animación
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easeOutCubic);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // ==========================================
  // FILTROS
  // ==========================================

  handleSkillFilter(e) {
    e.preventDefault();
    const filterBtn = e.currentTarget;
    const filterValue = filterBtn.getAttribute("data-filter");

    // Actualizar botones activos
    this.elements.skillFilters.forEach((btn) => btn.classList.remove("active"));
    filterBtn.classList.add("active");

    // Filtrar elementos
    this.filterSkillCategories(filterValue);
  }

  filterSkillCategories(filterValue) {
    const categories = document.querySelectorAll(".skill-category");

    categories.forEach((category) => {
      const categoryType = category.getAttribute("data-category");
      const shouldShow = filterValue === "all" || categoryType === filterValue;

      if (shouldShow) {
        category.style.display = "block";
        setTimeout(() => {
          category.style.opacity = "1";
          category.style.transform = "translateY(0)";
        }, 50);
      } else {
        category.style.opacity = "0";
        category.style.transform = "translateY(20px)";
        setTimeout(() => {
          category.style.display = "none";
        }, 300);
      }
    });
  }

  handleProjectFilter(e) {
    e.preventDefault();
    const filterBtn = e.currentTarget;
    const filterValue = filterBtn.getAttribute("data-filter");

    // Actualizar botones activos
    this.elements.projectFilters.forEach((btn) =>
      btn.classList.remove("active")
    );
    filterBtn.classList.add("active");

    // Filtrar proyectos
    this.filterProjects(filterValue);
  }

  filterProjects(filterValue) {
    const projects = document.querySelectorAll(".project-item");

    projects.forEach((project, index) => {
      const projectCategory = project.getAttribute("data-category");
      const shouldShow =
        filterValue === "all" || projectCategory === filterValue;

      if (shouldShow) {
        setTimeout(() => {
          project.style.display = "flex";
          project.style.opacity = "1";
          project.style.transform = "translateY(0) scale(1)";
        }, index * 100);
      } else {
        project.style.opacity = "0";
        project.style.transform = "translateY(20px) scale(0.95)";
        setTimeout(() => {
          project.style.display = "none";
        }, 300);
      }
    });
  }

  // ==========================================
  // SKILL CARDS INTERACTIVAS
  // ==========================================

  initializeSkillCards() {
    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach((card) => {
      this.addSkillCardEffects(card);
    });
  }

  addSkillCardEffects(card) {
    // Efecto de seguimiento del mouse
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

      // Actualizar gradiente de fondo
      const intensity = Math.min(
        Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) / 100,
        1
      );

      card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
      card.style.setProperty("--glow-intensity", intensity);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
      card.style.removeProperty("--glow-intensity");
    });
  }

  animateSkillCard(card) {
    // Animación de entrada escalonada
    const elements = card.querySelectorAll(
      ".skill-icon, h4, .skill-description"
    );

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, index * 150);
    });
  }

  // ==========================================
  // FORMULARIO DE CONTACTO
  // ==========================================

  /**
   * Formatea los datos del formulario para envío
   */
  formatFormData(formData) {
    // Mapeo de valores a labels legibles
    const subjectLabels = {
      'web-development': 'Desarrollo Web',
      'api-development': 'Desarrollo de APIs', 
      'cybersecurity': 'Consultoría en Ciberseguridad',
      'automation': 'Automatización',
      'support': 'Soporte Técnico',
      'other': 'Otro'
    };

    const nombre = formData.get('nombre')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const asunto = formData.get('asunto')?.trim() || '';
    const mensaje = formData.get('mensaje')?.trim() || '';
    
    // Obtener el label legible del asunto
    const asuntoLabel = subjectLabels[asunto] || asunto;
    
    return {
      nombre,
      email,
      asunto: asuntoLabel,
      mensaje,
      rawAsunto: asunto
    };
  }

  /**
   * Formatea los datos para WhatsApp
   */
  formatForWhatsApp(data) {
    const { nombre, email, asunto, mensaje } = data;
    
    let message = `*NUEVA CONSULTA DESDE PORTFOLIO*\n\n`;
    message += `*Nombre:* ${nombre}\n`;
    message += `*Email:* ${email}\n`;
    message += `*Tipo de Proyecto:* ${asunto}\n\n`;
    message += `*Mensaje:*\n${mensaje}\n\n`;
    message += `*Fecha:* ${new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`;
    
    return message;
  }

  /**
   * Formatea los datos para Email
   */
  formatForEmail(data) {
    const { nombre, email, asunto, mensaje } = data;
    
    let subject = `Portfolio - ${asunto} - ${nombre}`;
    
    let body = `Hola Jose!\n\n`;
    body += `He visitado tu portfolio y me interesa contactarte.\n\n`;
    body += `DATOS DE CONTACTO:\n`;
    body += `- Nombre: ${nombre}\n`;
    body += `- Email: ${email}\n`;
    body += `- Tipo de Proyecto: ${asunto}\n\n`;
    body += `MENSAJE:\n${mensaje}\n\n`;
    body += `Fecha de envío: ${new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}\n\n`;
    body += `Espero tu respuesta!\n\nSaludos.`;
    
    return { subject, body };
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // Validar formulario PRIMERO
    if (!this.validateForm()) {
      return;
    }

    // CAPTURAR Y GUARDAR DATOS ANTES DE CUALQUIER COSA
    const formData = new FormData(this.elements.contactForm);
    this.formDataCache = this.formatFormData(formData);

    // Simular envío con loading
    this.simulateFormSubmission().then(() => {
      // MOSTRAR MODAL DESPUÉS DE CAPTURAR DATOS
      this.showContactModal();
    });
  }

  validateForm() {
    const formData = new FormData(this.elements.contactForm);
    const errors = [];

    // Validar campos requeridos
    const requiredFields = ["nombre", "email", "asunto", "mensaje"];

    requiredFields.forEach((field) => {
      const value = formData.get(field)?.trim();
      const fieldElement = document.getElementById(field);

      if (!value) {
        this.showFieldError(fieldElement, `Este campo es requerido`);
        errors.push(field);
      } else {
        this.clearFieldError(fieldElement);
      }
    });

    // Validar email
    const email = formData.get("email");
    if (email && !this.isValidEmail(email)) {
      const emailField = document.getElementById("email");
      this.showFieldError(emailField, "Ingresa un email válido");
      errors.push("email");
    }

    // Validar checkbox de privacidad
    const privacy = formData.get("privacy");
    if (!privacy) {
      const privacyField = document.getElementById("privacy");
      this.showFieldError(
        privacyField.closest(".checkbox-group"),
        "Debes aceptar la política de privacidad"
      );
      errors.push("privacy");
    }

    return errors.length === 0;
  }

  showFieldError(fieldElement, message) {
    const formGroup = fieldElement.closest(".form-group") || fieldElement.closest(".checkbox-group");
    const errorElement = formGroup.querySelector(".error-message");

    formGroup.classList.add("error");
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  clearFieldError(fieldElement) {
    const formGroup = fieldElement.closest(".form-group") || fieldElement.closest(".checkbox-group");
    formGroup.classList.remove("error");
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async simulateFormSubmission() {
    const submitBtn = this.elements.contactForm.querySelector(".submit-btn");

    // Mostrar estado de carga
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      this.showErrorNotification("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  }

  showErrorNotification(message) {
    // Crear notificación de error
    const notification = document.createElement("div");
    notification.className = "notification error";
    notification.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--error);
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  showSuccessMessage(message) {
    // Crear notificación de éxito
    const notification = document.createElement("div");
    notification.className = "notification success";
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--success);
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ==========================================
  // MODAL
  // ==========================================

  showContactModal() {
    if (this.elements.modal) {
      this.elements.modal.classList.add("active");
      this.elements.body.style.overflow = "hidden";
    }
  }

  hideContactModal() {
    if (this.elements.modal) {
      this.elements.modal.classList.remove("active");
      this.elements.body.style.overflow = "";
      
      // RESETEAR EL FORMULARIO CUANDO SE CIERRA EL MODAL
      if (this.elements.contactForm) {
        this.elements.contactForm.reset();
        this.formDataCache = null;
      }
    }
  }

  handleModalClick(e) {
    // Cerrar modal al hacer clic en el backdrop
    if (
      e.target.classList.contains("modal-backdrop") ||
      e.target.classList.contains("modal-close")
    ) {
      this.hideContactModal();
    }

    // Manejar opciones del modal
    if (e.target.closest(".whatsapp-option")) {
      this.openWhatsApp();
    }

    if (e.target.closest(".email-option")) {
      this.openEmail();
    }
  }

  openWhatsApp() {
    try {
      // USAR DATOS DEL CACHE EN LUGAR DEL FORMULARIO
      if (!this.formDataCache) {
        return;
      }
      
      // Formatear mensaje
      const message = this.formatForWhatsApp(this.formDataCache);
      
      // Codificar para URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/50687394231?text=${encodedMessage}`;
      
      // Abrir WhatsApp
      window.open(whatsappURL, '_blank');
      
      // Cerrar modal
      this.hideContactModal();
      
      // Mostrar confirmación
      this.showSuccessMessage('Mensaje preparado para WhatsApp');
      
    } catch (error) {
      alert('Error al preparar el mensaje para WhatsApp');
    }
  }

  openEmail() {
    try {
      // USAR DATOS DEL CACHE EN LUGAR DEL FORMULARIO
      if (!this.formDataCache) {
        return;
      }
      
      // Formatear email
      const emailData = this.formatForEmail(this.formDataCache);
      
      // Construir URL de mailto
      const mailtoURL = `mailto:spikedtech19@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
      
      // Abrir cliente de email
      window.location.href = mailtoURL;
      
      // Cerrar modal
      this.hideContactModal();
      
      // Mostrar confirmación
      this.showSuccessMessage('Cliente de email abierto');
      
    } catch (error) {
      alert('Error al preparar el email');
    }
  }

  // ==========================================
  // ACCESIBILIDAD
  // ==========================================

  initializeAccessibility() {
    this.setupAccessibilityControls();
    this.applyAccessibilityPreferences();
  }

  setupAccessibilityControls() {
    // Controles de tamaño de fuente
    const fontBtns = document.querySelectorAll(".font-btn");
    fontBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const size = e.target.getAttribute("data-size");
        this.changeFontSize(size);
      });
    });

    // Control de alto contraste
    const highContrastToggle = document.getElementById("highContrast");
    highContrastToggle?.addEventListener("change", (e) => {
      this.toggleHighContrast(e.target.checked);
    });

    // Control de reducir movimiento
    const reduceMotionToggle = document.getElementById("reduceMotion");
    reduceMotionToggle?.addEventListener("change", (e) => {
      this.toggleReduceMotion(e.target.checked);
    });
  }

  toggleAccessibilityPanel() {
    this.elements.accessibilityPanel?.classList.toggle("active");
  }

  changeFontSize(size) {
    // Actualizar clase activa
    document.querySelectorAll(".font-btn").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-size") === size) {
        btn.classList.add("active");
      }
    });

    // Aplicar tamaño
    this.elements.body.className = this.elements.body.className.replace(
      /font-(small|normal|large)/g,
      ""
    );
    if (size !== "normal") {
      this.elements.body.classList.add(`font-${size}`);
    }

    this.preferences.fontSize = size;
  }

  toggleHighContrast(enabled) {
    this.elements.body.classList.toggle("high-contrast", enabled);
    this.preferences.highContrast = enabled;
  }

  toggleReduceMotion(enabled) {
    this.elements.body.classList.toggle("reduce-motion", enabled);
    this.preferences.reduceMotion = enabled;
  }

  applyAccessibilityPreferences() {
    // Aplicar preferencias guardadas
    this.changeFontSize(this.preferences.fontSize);
    this.toggleHighContrast(this.preferences.highContrast);
    this.toggleReduceMotion(this.preferences.reduceMotion);
  }

  // ==========================================
  // EFECTOS ESPECIALES
  // ==========================================

  addRippleEffect() {
    const rippleElements = document.querySelectorAll(
      ".btn, .skill-card, .project-item, .contact-method"
    );

    rippleElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.createRipple(e, element);
      });
    });
  }

  createRipple(e, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("div");
    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: rippleAnimation 0.6s ease-out;
            z-index: 1000;
        `;

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  handleMouseMove(e) {
    // Efecto de cursor customizado
    this.updateCursorPosition(e.clientX, e.clientY);

    // Efectos de paralaje suave en elementos específicos
    this.updateParallaxElements(e.clientX, e.clientY);
  }

  updateCursorPosition(x, y) {
    document.documentElement.style.setProperty("--cursor-x", x + "px");
    document.documentElement.style.setProperty("--cursor-y", y + "px");
  }

  updateParallaxElements(x, y) {
    const elements = document.querySelectorAll("[data-parallax]");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    elements.forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-parallax")) || 0.1;
      const deltaX = (x - centerX) * speed;
      const deltaY = (y - centerY) * speed;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
  }

  // ==========================================
  // EVENTOS DE TECLADO
  // ==========================================

  handleKeydown(e) {
    // Escape para cerrar modales y menús
    if (e.key === "Escape") {
      if (this.isMenuOpen) {
        this.closeMobileMenu();
      }

      if (this.elements.modal?.classList.contains("active")) {
        this.hideContactModal();
      }

      if (this.elements.accessibilityPanel?.classList.contains("active")) {
        this.toggleAccessibilityPanel();
      }
    }

    // Navegación con teclado
    if (e.key === "Tab") {
      this.elements.body.classList.add("using-keyboard");
    }

    // Atajos de teclado
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "d":
          e.preventDefault();
          this.toggleTheme();
          break;
      }
    }
  }

  // ==========================================
  // RESIZE Y RESPONSIVE
  // ==========================================

  handleResize() {
    // Actualizar dimensiones en CSS custom properties
    document.documentElement.style.setProperty(
      "--viewport-height",
      window.innerHeight + "px"
    );
    document.documentElement.style.setProperty(
      "--viewport-width",
      window.innerWidth + "px"
    );

    // Cerrar menú móvil si el viewport se hace más grande
    if (window.innerWidth > 991 && this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Recalcular posiciones si es necesario
    this.recalculatePositions();
  }

  recalculatePositions() {
    // Recalcular posiciones de elementos fijos o sticky si es necesario
    this.optimizePerformance();
  }

  // ==========================================
  // UTILIDADES
  // ==========================================

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // ==========================================
  // FUNCIONES PÚBLICAS PARA MODAL DE CONTACTO
  // ==========================================

  static cerrarModal() {
    if (window.portfolioApp) {
      window.portfolioApp.hideContactModal();
    }
  }

  static enviarPorWhatsApp() {
    if (window.portfolioApp) {
      window.portfolioApp.openWhatsApp();
    }
  }

  static enviarPorEmail() {
    if (window.portfolioApp) {
      window.portfolioApp.openEmail();
    }
  }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePortfolio);
} else {
  initializePortfolio();
}

function initializePortfolio() {
  window.portfolioApp = new ModernPortfolio();

  // Exponer funciones globales para compatibilidad con HTML
  window.cerrarModal = ModernPortfolio.cerrarModal;
  window.enviarPorWhatsApp = ModernPortfolio.enviarPorWhatsApp;
  window.enviarPorEmail = ModernPortfolio.enviarPorEmail;

  // Agregar estilos para notificaciones
  addNotificationStyles();
}

// ==========================================
// ESTILOS PARA NOTIFICACIONES
// ==========================================

function addNotificationStyles() {
  if (document.getElementById('notification-styles')) return;
  
  const styles = document.createElement('style');
  styles.id = 'notification-styles';
  styles.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }

    .notification {
      font-family: var(--font-family);
      font-size: 14px;
      font-weight: 500;
    }

    .notification i {
      font-size: 16px;
    }
  `;
  
  document.head.appendChild(styles);
}

// Exponer clase para uso externo si es necesario
window.ModernPortfolio = ModernPortfolio;