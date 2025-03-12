// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const sections = document.querySelectorAll('section');
    
    // Función para añadir la clase 'scrolled' a la navegación cuando se hace scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Destacar elemento del menú según la sección visible
        highlightNavOnScroll();
    });
    
    // Función para destacar menú de navegación según la sección visible
    function highlightNavOnScroll() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Navegación móvil (hamburguesa)
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animación del icono hamburguesa
        const burgerLines = document.querySelectorAll('.burger div');
        burgerLines[0].classList.toggle('rotate-down');
        burgerLines[1].classList.toggle('fade-out');
        burgerLines[2].classList.toggle('rotate-up');
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            
            // Resetear animación del icono hamburguesa
            const burgerLines = document.querySelectorAll('.burger div');
            burgerLines[0].classList.remove('rotate-down');
            burgerLines[1].classList.remove('fade-out');
            burgerLines[2].classList.remove('rotate-up');
        });
    });
    
    // Filtro de proyectos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase 'active' de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase 'active' al botón clicado
            this.classList.add('active');
            
            // Obtener el valor del filtro
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar proyectos
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animación de las barras de progreso en habilidades
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            const progress = item.querySelector('.skill-progress');
            const progressValue = progress.style.width;
            
            // Resetear el valor para la animación
            progress.style.width = '0';
            
            // Delay por elemento para efecto escalonado
            setTimeout(() => {
                progress.style.width = progressValue;
            }, index * 100);
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
    
    // Inicializar sección de títulos con atributos data-text
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        if (!title.hasAttribute('data-text')) {
            title.setAttribute('data-text', title.textContent.toUpperCase());
        }
    });

    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicializar filtro de proyectos (mostrar todos por defecto)
    document.querySelector('.filter-btn[data-filter="all"]').click();
    
    // Mostrar año actual en el footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Funciones del formulario de contacto
function mostrarModal(event) {
    event.preventDefault();
    const modal = document.getElementById("modal-contacto");
    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function cerrarModal() {
    const modal = document.getElementById("modal-contacto");
    modal.classList.remove("active");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

function enviarPorWhatsApp() {
    const nombre = document.getElementById("nombre").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;
    
    const mensajeCompleto = `¡Hola! Soy ${nombre}. Asunto: ${asunto}. Mensaje: ${mensaje}`;
    const whatsappURL = `https://wa.me/50663868608?text=${encodeURIComponent(mensajeCompleto)}`;
    
    window.open(whatsappURL, "_blank");
    cerrarModal();
}

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
    
    const mailtoURL = `mailto:spikedtech19@gmail.com?subject=Contacto: ${asunto}&body=${encodeURIComponent(cuerpoEmail)}`;
    
    window.location.href = mailtoURL;
    cerrarModal();
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-contacto');
    if (modal && event.target === modal) {
        cerrarModal();
    }
});