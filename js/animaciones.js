/**
 * ========================================
 * PORTFOLIO ULTRA MODERNO - ANIMACIONES PURAS
 * Jose M Quiros - Ingeniero en Seguridad Informatica
 * ========================================
 */

class ModernAnimations {
    constructor() {
        this.isReducedMotion = false;
        this.activeAnimations = new Set();
        this.observers = new Map();
        this.particles = [];
        this.glitchTimeouts = [];
        
        this.animationConfig = {
            triggerPoint: 0.15,
            rootMarginOffset: '-50px',
            minThreshold: 0.15
        };
        
        this.init();
    }

    init() {
        this.checkReducedMotion();
        this.initScrollAnimations();
        this.initParticleSystem();
        this.initTextAnimations();
        this.initMorphingEffects();
        this.initGlitchEffects();
        this.initParallaxEffects();
        this.initHoverAnimations();
        this.initLoadingAnimations();
        this.initTransitionEffects();
    }

    checkReducedMotion() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                              document.body.classList.contains('reduce-motion');
        
        if (this.isReducedMotion) {
            document.documentElement.style.setProperty('--animation-speed', '0.1s');
        }
    }

    // ==========================================
    // ANIMACIONES DE SCROLL AVANZADAS
    // ==========================================

    initScrollAnimations() {
        this.setupRevealAnimations();
        this.setupParallaxScrolling();
    }

    setupRevealAnimations() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= this.animationConfig.minThreshold) {
                    this.animateReveal(entry.target);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.animationConfig.minThreshold,
            rootMargin: `${this.animationConfig.rootMarginOffset} 0px -30px 0px`
        });

        const revealElements = document.querySelectorAll(`
            .about-image-container,
            .value-item,
            .cert-item,
            .timeline-item,
            .project-item,
            .contact-method,
            .skill-card
        `);

        revealElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            revealObserver.observe(element);
        });

        this.observers.set('reveal', revealObserver);
    }

    setupParallaxScrolling() {
        const parallaxElements = document.querySelectorAll('.floating-icon, .decoration, .hero::before');
        
        window.addEventListener('scroll', () => {
            if (this.isReducedMotion) return;
            
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                if (element) {
                    const speed = 0.3 + (index * 0.1);
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }, { passive: true });
    }

    animateReveal(element) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            return;
        }

        const elementType = this.getElementType(element);
        
        switch (elementType) {
            case 'skill-card':
                this.animateSkillCardReveal(element);
                break;
            case 'timeline-item':
                this.animateTimelineReveal(element);
                break;
            case 'project-item':
                this.animateProjectReveal(element);
                break;
            default:
                this.animateDefaultReveal(element);
        }
    }

    getElementType(element) {
        if (element.classList.contains('skill-card')) return 'skill-card';
        if (element.classList.contains('timeline-item')) return 'timeline-item';
        if (element.classList.contains('project-item')) return 'project-item';
        return 'default';
    }

    animateSkillCardReveal(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
        
        this.createShineEffect(element);
        
        const icon = element.querySelector('.skill-icon');
        const title = element.querySelector('h4');
        const description = element.querySelector('.skill-description');
        
        [icon, title, description].forEach((child, index) => {
            if (child) {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }

    createShineEffect(element) {
        const shine = document.createElement('div');
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(14, 165, 233, 0.4), 
                transparent);
            transform: skewX(-25deg);
            transition: left 0.8s ease;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(shine);
        
        setTimeout(() => {
            shine.style.left = '100%';
        }, 100);
        
        setTimeout(() => {
            shine.remove();
        }, 900);
    }

    animateTimelineReveal(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        const icon = element.querySelector('.timeline-icon');
        if (icon) {
            icon.style.transform = 'scale(0) rotate(180deg)';
            icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        }
        
        const content = element.querySelector('.timeline-content');
        if (content) {
            this.typeWriterEffect(content);
        }
    }

    animateProjectReveal(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
        
        this.addFloatingEffect(element);
        
        const image = element.querySelector('.project-image img');
        if (image) {
            image.style.transform = 'scale(1.2)';
            image.style.transition = 'transform 1s ease';
            
            setTimeout(() => {
                image.style.transform = 'scale(1)';
            }, 100);
        }
    }

    animateDefaultReveal(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    // ==========================================
    // SISTEMA DE PARTÍCULAS
    // ==========================================

    initParticleSystem() {
        if (this.isReducedMotion) return;

        this.createParticleCanvas();
        this.startParticleAnimation();
    }

    createParticleCanvas() {
        this.particleCanvas = document.createElement('canvas');
        this.particleCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(this.particleCanvas);
        this.particleCtx = this.particleCanvas.getContext('2d');
        
        this.resizeParticleCanvas();
        window.addEventListener('resize', () => this.resizeParticleCanvas());
    }

    resizeParticleCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }

    startParticleAnimation() {
        for (let i = 0; i < 50; i++) {
            this.particles.push(this.createParticle());
        }
        
        this.animateParticles();
    }

    createParticle() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 1,
            decay: Math.random() * 0.01 + 0.005,
            size: Math.random() * 3 + 1,
            color: `hsl(${195 + Math.random() * 30}, 70%, 60%)`,
            pulse: Math.random() * Math.PI * 2
        };
    }

    animateParticles() {
        if (!this.particleCtx) return;
        
        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.pulse += 0.1;
            
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.drawParticle(particle);
        }
        
        if (Math.random() < 0.1 && this.particles.length < 100) {
            this.particles.push(this.createParticle());
        }
        
        requestAnimationFrame(() => this.animateParticles());
    }

    drawParticle(particle) {
        const alpha = particle.life * (0.5 + Math.sin(particle.pulse) * 0.2);
        const size = particle.size * (0.8 + Math.sin(particle.pulse) * 0.2);
        
        this.particleCtx.save();
        this.particleCtx.globalAlpha = alpha;
        this.particleCtx.fillStyle = particle.color;
        this.particleCtx.shadowBlur = 10;
        this.particleCtx.shadowColor = particle.color;
        
        this.particleCtx.beginPath();
        this.particleCtx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        this.particleCtx.fill();
        
        this.particleCtx.restore();
    }

    // ==========================================
    // ANIMACIONES DE TEXTO - MODIFICADO PARA CENTRADO
    // ==========================================

    initTextAnimations() {
        this.setupSectionTitleAnimations(); // Modificado para no romper centrado
        this.setupCounterAnimations();
    }

    // Nueva función que NO rompe el centrado de títulos
    setupSectionTitleAnimations() {
        const sectionTitles = document.querySelectorAll('.section-title');
        
        sectionTitles.forEach(title => {
            // Animación simple que mantiene el centrado
            title.style.opacity = '0';
            title.style.transform = 'translateY(30px)';
            title.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                        // Animación que NO rompe el centrado
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Forzar centrado después de la animación
                        setTimeout(() => {
                            this.ensureTitleCentering(entry.target);
                        }, 100);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(title);
        });
    }

    // Función para asegurar centrado de títulos
    ensureTitleCentering(titleElement) {
        titleElement.style.cssText += `
            display: block !important;
            width: 100% !important;
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            transform: translateY(0) !important;
        `;
        
        const header = titleElement.closest('.section-header');
        if (header) {
            header.style.cssText += `
                text-align: center !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                width: 100% !important;
            `;
        }
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            this.addCounterEffects(counter);
        });
    }

    addCounterEffects(counter) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    this.animateCounterWithEffects(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '-20px 0px -20px 0px'
        });
        
        observer.observe(counter);
    }

    animateCounterWithEffects(counter) {
        counter.style.animation = 'counterPulse 2s ease-in-out';
        this.createCounterParticles(counter);
    }

    createCounterParticles(counter) {
        const rect = counter.getBoundingClientRect();
        const particleCount = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #0ea5e9;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 50;
            const endX = rect.left + rect.width/2 + Math.cos(angle) * distance;
            const endY = rect.top + rect.height/2 + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - rect.left - rect.width/2}px, ${endY - rect.top - rect.height/2}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    // ==========================================
    // EFECTOS DE MORPHING
    // ==========================================

    initMorphingEffects() {
        this.setupShapeShifting();
        this.setupBlobAnimations();
        this.setupLiquidEffects();
    }

    setupShapeShifting() {
        const morphElements = document.querySelectorAll('.skill-icon, .timeline-icon');
        
        morphElements.forEach(element => {
            this.addMorphingEffect(element);
        });
    }

    addMorphingEffect(element) {
        if (this.isReducedMotion) return;
        
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.transform = 'scale(1.1) rotate(10deg)';
            
            this.createRippleWaves(element);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    createRippleWaves(element) {
        const rect = element.getBoundingClientRect();
        const waves = 3;
        
        for (let i = 0; i < waves; i++) {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                width: 0;
                height: 0;
                border: 2px solid rgba(14, 165, 233, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(wave);
            
            wave.animate([
                { width: '0px', height: '0px', opacity: 0.8 },
                { width: '100px', height: '100px', opacity: 0 }
            ], {
                duration: 1000,
                delay: i * 200,
                easing: 'ease-out'
            }).onfinish = () => wave.remove();
        }
    }

    setupBlobAnimations() {
        if (this.isReducedMotion) return;
        
        this.createFloatingBlobs();
    }

    createFloatingBlobs() {
        const blobCount = 3;
        
        for (let i = 0; i < blobCount; i++) {
            const blob = document.createElement('div');
            blob.className = 'floating-blob';
            blob.style.cssText = `
                position: fixed;
                width: ${100 + Math.random() * 200}px;
                height: ${100 + Math.random() * 200}px;
                background: radial-gradient(circle, rgba(14, 165, 233, 0.1), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: blobFloat ${10 + Math.random() * 10}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                filter: blur(40px);
            `;
            
            document.body.appendChild(blob);
        }
    }

    setupLiquidEffects() {
        const liquidElements = document.querySelectorAll('.btn-primary, .skill-card');
        
        liquidElements.forEach(element => {
            this.addLiquidEffect(element);
        });
    }

    addLiquidEffect(element) {
        if (this.isReducedMotion) return;
        
        element.addEventListener('mouseenter', (e) => {
            this.createLiquidRipple(e, element);
        });
    }

    createLiquidRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
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
            z-index: 0;
            filter: blur(10px);
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }

    // ==========================================
    // EFECTOS DE GLITCH
    // ==========================================

    initGlitchEffects() {
        this.setupRandomGlitches();
        this.setupHoverGlitches();
    }

    setupRandomGlitches() {
        if (this.isReducedMotion) return;
        
        // Solo aplicar glitch al hero-title, NO a section-title para evitar problemas de centrado
        const glitchElements = document.querySelectorAll('.hero-title');
        
        glitchElements.forEach(element => {
            this.scheduleRandomGlitch(element);
        });
    }

    scheduleRandomGlitch(element) {
        const randomDelay = Math.random() * 30000 + 10000;
        
        const timeout = setTimeout(() => {
            this.applyGlitchEffect(element);
            this.scheduleRandomGlitch(element);
        }, randomDelay);
        
        this.glitchTimeouts.push(timeout);
    }

    applyGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let glitchText = '';
        
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1 && originalText[i] !== ' ') {
                glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchText += originalText[i];
            }
        }
        
        element.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
        element.style.filter = 'hue-rotate(90deg) contrast(200%)';
        element.textContent = glitchText;
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.filter = '';
            element.textContent = originalText;
        }, 100);
    }

    setupHoverGlitches() {
        const glitchElements = document.querySelectorAll('.nav-link, .btn');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion && Math.random() < 0.3) {
                    this.applyMicroGlitch(element);
                }
            });
        });
    }

    applyMicroGlitch(element) {
        const glitchDuration = 50;
        const iterations = 3;
        
        for (let i = 0; i < iterations; i++) {
            setTimeout(() => {
                element.style.transform = `translateX(${Math.random() * 2 - 1}px) translateY(${Math.random() * 2 - 1}px)`;
                element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
                
                setTimeout(() => {
                    element.style.transform = '';
                    element.style.filter = '';
                }, glitchDuration / 2);
            }, i * glitchDuration);
        }
    }

    // ==========================================
    // EFECTOS DE PARALLAX
    // ==========================================

    initParallaxEffects() {
        if (this.isReducedMotion) return;
        
        this.setupScrollParallax();
    }

    setupScrollParallax() {
        const parallaxElements = document.querySelectorAll(`
            .floating-icon,
            .hero::before,
            .decoration
        `);
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    // ==========================================
    // ANIMACIONES DE HOVER AVANZADAS
    // ==========================================

    initHoverAnimations() {
        this.setupElasticHover();
        this.setupLiquidHover();
    }

    setupElasticHover() {
        const elasticElements = document.querySelectorAll('.skill-card, .project-item');
        
        elasticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    element.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    element.style.transform = 'scale(1.05) rotateY(5deg)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    setupLiquidHover() {
        const liquidElements = document.querySelectorAll('.nav-link, .filter-btn');
        
        liquidElements.forEach(element => {
            let blob;
            
            element.addEventListener('mouseenter', (e) => {
                if (this.isReducedMotion) return;
                
                blob = document.createElement('div');
                blob.style.cssText = `
                    position: absolute;
                    background: rgba(14, 165, 233, 0.2);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                    transition: transform 0.5s ease;
                    z-index: -1;
                    width: 20px;
                    height: 20px;
                    left: 50%;
                    top: 50%;
                    margin-left: -10px;
                    margin-top: -10px;
                `;
                
                element.style.position = 'relative';
                element.appendChild(blob);
                
                setTimeout(() => {
                    if (blob) blob.style.transform = 'scale(2)';
                }, 10);
            });
            
            element.addEventListener('mouseleave', () => {
                if (blob) {
                    blob.style.transform = 'scale(0)';
                    setTimeout(() => {
                        if (blob && blob.parentNode) {
                            blob.remove();
                        }
                    }, 500);
                    blob = null;
                }
            });
        });
    }

    // ==========================================
    // ANIMACIONES DE CARGA
    // ==========================================

    initLoadingAnimations() {
        this.setupSkeletonLoading();
        this.setupProgressiveLoading();
    }

    setupSkeletonLoading() {
        const loadingElements = document.querySelectorAll('.project-image, .about-image img');
        
        loadingElements.forEach(element => {
            this.addSkeletonEffect(element);
        });
    }

    addSkeletonEffect(element) {
        if (element.tagName === 'IMG') {
            if (!element.complete) {
                element.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
                element.style.backgroundSize = '200% 100%';
                element.style.animation = 'skeleton 1.5s infinite';
                
                element.addEventListener('load', () => {
                    element.style.background = '';
                    element.style.animation = '';
                });
            }
        }
    }

    setupProgressiveLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        }
    }

    // ==========================================
    // EFECTOS DE TRANSICIÓN
    // ==========================================

    initTransitionEffects() {
        this.setupPageTransitions();
        this.setupSectionTransitions();
    }

    setupPageTransitions() {
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                this.animatePageTransition();
            }
        });
    }

    animatePageTransition() {
        if (this.isReducedMotion) return;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #0ea5e9, #0284c7);
            z-index: 9999;
            transition: left 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.left = '0%';
        }, 10);
        
        setTimeout(() => {
            overlay.style.left = '100%';
        }, 300);
        
        setTimeout(() => {
            overlay.remove();
        }, 800);
    }

    setupSectionTransitions() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSectionEntry(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => sectionObserver.observe(section));
    }

    animateSectionEntry(section) {
        if (this.isReducedMotion) return;
        
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
            animation: waveMove 1s ease-out;
        `;
        
        section.style.position = 'relative';
        section.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 1000);
    }

    // ==========================================
    // EFECTOS ADICIONALES
    // ==========================================

    addFloatingEffect(element) {
        if (this.isReducedMotion) return;
        
        element.style.animation = 'floating 6s ease-in-out infinite';
    }

    typeWriterEffect(element) {
        if (this.isReducedMotion) return;
        
        const children = element.children;
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                child.style.opacity = '1';
                child.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // ==========================================
    // CLEANUP Y DESTRUCTOR
    // ==========================================

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        this.glitchTimeouts.forEach(timeout => clearTimeout(timeout));
        this.glitchTimeouts = [];
        
        if (this.particleCanvas) {
            this.particleCanvas.remove();
        }
        
        document.querySelectorAll('.floating-blob').forEach(blob => blob.remove());
    }
}

// ==========================================
// ESTILOS CSS DINÁMICOS PARA ANIMACIONES
// ==========================================

function injectAnimationStyles() {
    const styles = `
        <style id="modern-animations-styles">
        @keyframes textGlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        @keyframes counterPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes blobFloat {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes waveMove {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes skeleton {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .floating-blob {
                display: none !important;
            }
            
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    initializeAnimations();
}

function initializeAnimations() {
    injectAnimationStyles();
    window.animationSystem = new ModernAnimations();
}

// Exponer para uso externo
window.ModernAnimations = ModernAnimations;