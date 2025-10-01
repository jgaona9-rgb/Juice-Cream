// =============================
// CONFIGURACIÓN INICIAL
// =============================
document.addEventListener("DOMContentLoaded", () => {
    initializePreloader();
    initializeAnimations();
    initializeParticles();
    initializeCounters();
    initializeTypewriter();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeFlipCards();
    initializeMenuSystem();
    initializeContactForm();
    initializeModalSystem();
    initializeSmoothScrolling();
});

// =============================
// PRELOADER ANIMADO
// =============================
function initializePreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="juice-loader">
                <div class="glass"></div>
                <div class="juice"></div>
                <div class="bubbles">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <h3>JuiceCream</h3>
            <p>Preparando experiencias deliciosas...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // CSS para el preloader
    const preloaderStyles = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ce967b, #ebad8d);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
            color: white;
        }
        
        .juice-loader {
            width: 60px;
            height: 80px;
            position: relative;
            margin: 0 auto 20px;
        }
        
        .glass {
            width: 60px;
            height: 80px;
            background: rgba(255,255,255,0.2);
            border: 3px solid white;
            border-radius: 0 0 30px 30px;
            position: relative;
        }
        
        .juice {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0%;
            background: linear-gradient(180deg, #ff6b6b, #ff8e53);
            border-radius: 0 0 27px 27px;
            animation: fillJuice 2s ease-in-out infinite;
        }
        
        .bubbles span {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255,255,255,0.6);
            border-radius: 50%;
            animation: bubble 2s linear infinite;
        }
        
        .bubbles span:nth-child(1) { left: 20px; animation-delay: 0s; }
        .bubbles span:nth-child(2) { left: 30px; animation-delay: 0.5s; }
        .bubbles span:nth-child(3) { left: 40px; animation-delay: 1s; }
        
        @keyframes fillJuice {
            0%, 100% { height: 20%; }
            50% { height: 60%; }
        }
        
        @keyframes bubble {
            0% { bottom: 10px; opacity: 0; }
            50% { opacity: 1; }
            100% { bottom: 70px; opacity: 0; }
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { transform: translateY(0); }
            to { transform: translateY(-100%); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = preloaderStyles;
    document.head.appendChild(styleSheet);
    
    // Remover preloader después de cargar
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.remove();
                }
            }, 500);
        }, 2000);
    });
}

// =============================
// SISTEMA DE PARTÍCULAS
// =============================
function initializeParticles() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    header.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    }
    
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = ['#ce967b', '#ebad8d', '#fff'][Math.floor(Math.random() * 3)];
    }
    
    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };
    
    Particle.prototype.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    };
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Limpiar animación cuando sea necesario
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// =============================
// EFECTO TYPEWRITER ANIMADO
// =============================
function initializeTypewriter() {
    const headerTitle = document.querySelector('.header-content h1');
    if (!headerTitle) return;
    
    const text = headerTitle.textContent;
    headerTitle.textContent = '';
    headerTitle.style.borderRight = '3px solid #ce967b';
    headerTitle.style.paddingRight = '10px';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            headerTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            // Efecto de cursor parpadeante
            setInterval(() => {
                headerTitle.style.borderRight = headerTitle.style.borderRight === '3px solid transparent' 
                    ? '3px solid #ce967b' 
                    : '3px solid transparent';
            }, 500);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// =============================
// ANIMACIONES AVANZADAS AL SCROLL
// =============================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0)';
                
                // Animación en cascada para elementos hijos
                const children = entry.target.querySelectorAll('.cascade-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    // Aplicar animaciones automáticamente
    document.querySelectorAll('.coffee-1').forEach((el) => {
        el.classList.add('cascade-item');
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    document.querySelectorAll('.services-1').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    document.querySelectorAll('.blog-1').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    document.querySelectorAll('.document-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'rotate(-10deg) scale(0.8)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => observer.observe(el), index * 100);
    });
}

// =============================
// CONTADORES ANIMADOS
// =============================
function initializeCounters() {
    const stats = [
        { element: '.stat-acceptance', value: 85, suffix: '%' },
        { element: '.stat-mango', value: 40, suffix: '%' },
        { element: '.stat-price', value: 70, suffix: '%' }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.element);
        if (!element) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target, 0, stat.value, stat.suffix, 2000);
                    entry.target.classList.add('counted');
                }
            });
        });
        
        observer.observe(element);
    });
}

function animateCounter(element, start, end, suffix, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// =============================
// EFECTOS DE SCROLL AVANZADOS
// =============================
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax en header
        const header = document.querySelector('.header');
        if (header && scrollTop < windowHeight) {
            header.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
        
        // Efecto parallax en imágenes
        document.querySelectorAll('.parallax-img').forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const speed = 0.3;
                const yPos = -(rect.top * speed);
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        // Barra de progreso de scroll
        updateScrollProgress();
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #ce967b, #ebad8d);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
}

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// =============================
// ELEMENTOS INTERACTIVOS AVANZADOS
// =============================
function initializeInteractiveElements() {
    // Efecto de hover 3D en tarjetas
    document.querySelectorAll('.coffee-1, .services-1, .document-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Efecto de ondas en botones
    document.querySelectorAll('.btn-1, .btn-document').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// =============================
// SISTEMA DE TARJETAS FLIP
// =============================
function initializeFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    if (flipCards.length === 0) return;
    
    // Configurar animación de entrada
    flipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    // Observer para animar cuando entren en viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    flipCards.forEach(card => observer.observe(card));
    
    // Efectos interactivos
    flipCards.forEach(card => {
        const indicator = card.querySelector('.hover-indicator');
        const cardName = card.querySelector('.card-name');
        
        card.addEventListener('mouseenter', function() {
            if (indicator) {
                indicator.style.transform = 'rotate(180deg) scale(1.1)';
            }
            if (cardName) {
                cardName.style.transform = 'translateY(-2px)';
            }
            card.classList.add('card-hover-active');
        });
        
        card.addEventListener('mouseleave', function() {
            if (indicator) {
                indicator.style.transform = 'rotate(0deg) scale(1)';
            }
            if (cardName) {
                cardName.style.transform = 'translateY(0)';
            }
            card.classList.remove('card-hover-active');
        });
    });
}

// =============================
// MENÚ RESPONSIVO
// =============================
function initializeMenuSystem() {
    const menuCheckbox = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');

    if (menuCheckbox && navbar) {
        menuCheckbox.addEventListener('change', function() {
            if (this.checked) {
                navbar.style.display = 'block';
                navbar.style.animation = 'slideDown 0.3s ease';
                document.body.style.overflow = 'hidden';
            } else {
                navbar.style.animation = 'slideUp 0.3s ease';
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    if (!this.checked) navbar.style.display = 'none';
                }, 300);
            }
        });
        
        // Cerrar menú al hacer click en enlaces
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuCheckbox.checked = false;
                navbar.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// =============================
// FORMULARIO DE CONTACTO
// =============================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            nombre: document.getElementById('nombre')?.value.trim() || '',
            email: document.getElementById('email')?.value.trim() || '',
            telefono: document.getElementById('telefono')?.value.trim() || '',
            interes: document.getElementById('interes')?.value || '',
            mensaje: document.getElementById('mensaje')?.value.trim() || ''
        };
        
        if (validateForm(formData)) {
            showSuccessAnimation();
            setTimeout(() => {
                contactForm.reset();
                showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            }, 2000);
        }
    });
}

function validateForm(data) {
    const errors = [];
    
    if (!data.nombre) errors.push('El nombre es requerido');
    if (!data.email) errors.push('El email es requerido');
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) errors.push('Email inválido');
    if (!data.interes) errors.push('Selecciona tu interés');
    if (!data.mensaje) errors.push('El mensaje es requerido');
    
    if (errors.length > 0) {
        showNotification(errors.join(', '), 'error');
        return false;
    }
    
    return true;
}

function showSuccessAnimation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const successMsg = document.createElement('div');
    successMsg.className = 'success-animation';
    successMsg.innerHTML = `
        <div class="checkmark">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#ce967b" stroke-width="8" stroke-dasharray="283" stroke-dashoffset="283" opacity="0.3"/>
                <path d="M25 50 L40 65 L75 30" fill="none" stroke="#ce967b" stroke-width="8" stroke-linecap="round" stroke-dasharray="50" stroke-dashoffset="50"/>
            </svg>
        </div>
        <p>¡Enviando mensaje...</p>
    `;
    
    successMsg.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        z-index: 1000;
    `;
    
    // CSS para la animación del checkmark
    const checkmarkCSS = `
        .success-animation .checkmark {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
        }
        .success-animation .checkmark svg {
            width: 100%;
            height: 100%;
        }
        .success-animation .checkmark circle {
            animation: drawCircle 1s ease-in-out;
        }
        .success-animation .checkmark path {
            animation: drawCheck 0.5s ease-in-out 0.5s both;
        }
        @keyframes drawCircle {
            to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
        }
    `;
    
    if (!document.querySelector('#success-css')) {
        const style = document.createElement('style');
        style.id = 'success-css';
        style.textContent = checkmarkCSS;
        document.head.appendChild(style);
    }
    
    form.style.position = 'relative';
    form.appendChild(successMsg);
    
    setTimeout(() => {
        if (successMsg.parentNode) {
            successMsg.remove();
        }
    }, 2500);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #2ecc71, #27ae60);' : 'background: linear-gradient(135deg, #e74c3c, #c0392b);'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// =============================
// SISTEMA DE MODALES
// =============================
function initializeModalSystem() {
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('documentModal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(docType) {
    const modal = document.getElementById('documentModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const content = getDocumentContent(docType);
    modalBody.innerHTML = content;
    
    modal.style.display = 'block';
    modal.style.animation = 'modalFadeIn 0.3s ease';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalBody.style.animation = 'modalSlideIn 0.3s ease';
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('documentModal');
    if (!modal) return;
    
    modal.style.animation = 'modalFadeOut 0.3s ease';
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function getDocumentContent(docType) {
    // Si es el plan de negocio, mostrar el PDF
    if (docType === 'plan-negocio') {
        return `
            <h2>Plan de Negocio JuiceCream</h2>
            <div class="doc-section">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
                    <p style="margin-bottom: 15px; color: #666;">Visualiza el documento completo a continuación:</p>
                    <iframe src="documentos/plan-negocio.pdf" 
                            width="100%" 
                            height="600px" 
                            style="border: none; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    </iframe>
                    <p style="margin-top: 15px;">
                        <a href="documentos/plan-negocio.pdf" 
                           target="_blank" 
                           class="btn-document" 
                           style="display: inline-block; text-decoration: none;">
                            📄 Abrir en nueva pestaña
                        </a>
                    </p>
                </div>
            </div>
        `;
    }
    
    // Para los demás documentos, mantener el contenido HTML original
    const contents = {
        'estudio-financiero': `
            <h2>Estudio Financiero</h2>
            <div class="doc-section">
                <h3>Costos por Unidad</h3>
                <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                    <tr style="background: #ce967b; color: white;">
                        <th style="padding: 10px; border: 1px solid #ddd;">Concepto</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Costo</th>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Costo Variable por Unidad</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">$1,068</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Precio de Venta</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">$5,000</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Margen de Contribución</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>$3,932</strong></td>
                    </tr>
                </table>
                
                <h3>Proyección Mensual (200 unidades)</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>Ingresos:</strong> $1,000,000</p>
                    <p><strong>Costos Variables:</strong> $213,600</p>
                    <p><strong>Costos Fijos:</strong> $130,000</p>
                    <p><strong>Utilidad Neta:</strong> $524,320</p>
                </div>
            </div>
        `,
        'analisis-mercado': `
            <h2>Análisis de Mercado</h2>
            <div class="doc-section">
                <h3>Perfil del Consumidor</h3>
                <ul>
                    <li><strong>Edad:</strong> 10-35 años</li>
                    <li><strong>Perfil:</strong> Estudiantes, profesionales jóvenes, familias</li>
                    <li><strong>Intereses:</strong> Productos naturales, experiencias gastronómicas, marcas sostenibles</li>
                    <li><strong>Motivaciones:</strong> Salud, practicidad, economía, atractivo visual</li>
                </ul>
                
                <h3>Investigación de Mercado</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0;">
                    <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <span style="font-size: 2em; color: #ce967b; font-weight: bold; display: block;">85%</span>
                        <span style="font-size: 0.9em; color: #666;">Aceptación del producto</span>
                    </div>
                    <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <span style="font-size: 2em; color: #ce967b; font-weight: bold; display: block;">40%</span>
                        <span style="font-size: 0.9em; color: #666;">Prefiere Mango</span>
                    </div>
                    <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <span style="font-size: 2em; color: #ce967b; font-weight: bold; display: block;">70%</span>
                        <span style="font-size: 0.9em; color: #666;">Acepta precio $5,000-$6,000</span>
                    </div>
                </div>
                
                <h3>Competencia</h3>
                <p>No existe competencia directa en jugos cuchareables. Competencia indirecta: juguerías tradicionales, heladerías, bebidas refrescantes.</p>
            </div>
        `,
        'marco-legal': `
            <h2>Marco Legal</h2>
            <div class="doc-section">
                <h3>Requisitos para Operación</h3>
                <ul>
                    <li><strong>Constitución:</strong> S.A.S. (Sociedad por Acciones Simplificada)</li>
                    <li><strong>Registro Mercantil:</strong> Cámara de Comercio</li>
                    <li><strong>RUT:</strong> Registro Único Tributario (DIAN)</li>
                    <li><strong>Registro Sanitario:</strong> INVIMA</li>
                    <li><strong>BPM:</strong> Buenas Prácticas de Manufactura</li>
                    <li><strong>Registro de Marca:</strong> Superintendencia de Industria y Comercio</li>
                    <li><strong>Licencia de Uso de Suelo:</strong> Alcaldía local</li>
                </ul>
                
                <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #ce967b; margin: 15px 0;">
                    <h3>Razón Social</h3>
                    <p><strong>JuiceCream S.A.S.</strong></p>
                </div>
                
                <h3>Políticas de Calidad</h3>
                <ul>
                    <li>Selección de frutas e insumos de proveedores confiables</li>
                    <li>Controles de calidad en todas las etapas</li>
                    <li>Documentación y estandarización de recetas</li>
                    <li>Medición de satisfacción del cliente</li>
                </ul>
            </div>
        `
    };
    
    return contents[docType] || '<p>Contenido no encontrado</p>';
}

// =============================
// NAVEGACIÓN SUAVE
// =============================
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================
// FUNCIONES GLOBALES
// =============================
// Estas funciones deben estar disponibles globalmente para los onclick en HTML
window.openModal = openModal;
window.closeModal = closeModal;

// =============================
// MANEJO DE ERRORES Y LIMPIEZA
// =============================
window.addEventListener('beforeunload', () => {
    // Limpiar animaciones y observers si es necesario
    document.querySelectorAll('canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
});

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.warn('Error en el script:', e.message);
});

console.log('✅ Script JuiceCream inicializado correctamente');