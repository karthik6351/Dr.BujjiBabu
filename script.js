/* ========================================================
   Dr. D. Bujji Babu — Portfolio JavaScript
   Premium Light Theme — Smooth interactions & animations
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleNavScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ---- Mobile Navigation Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Active Navigation Link ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;
        let activeSectionId = 'hero';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                activeSectionId = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ---- Scroll Reveal Animation (Staggered) ----
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Animated Counters (Smooth easeOutCubic) ----
    const counterElements = document.querySelectorAll('[data-target]');

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easeOut);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counterElements.forEach(el => counterObserver.observe(el));

    // ---- Typing Effect ----
    const typedTextElement = document.getElementById('typedText');
    const phrases = [
        'a Professor & Head of CSE',
        'a Ph.D. in Computer Science',
        'a Machine Learning Researcher',
        'a DST-Funded Investigator',
        'an Academic Administrator',
        'a Published Patent Holder'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 60;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1000);

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Contact Form (Visual Feedback Only) ----
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#1a8f4e';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // ---- Parallax Effect for Hero Orbs ----
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        window.addEventListener('mousemove', (e) => {
            const orbs = document.querySelectorAll('.gradient-orb');
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 8;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        }, { passive: true });
    }

    // ---- Card Hover Lift Effect ----
    const cards = document.querySelectorAll('.project-card, .award-card, .metric-card, .exp-card, .contact-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ---- Show More Publications ----
    const showMorePubsBtn = document.getElementById('showMorePubs');
    if (showMorePubsBtn) {
        let currentlyVisible = 4;
        const pubsToRevealPerClick = 4;

        showMorePubsBtn.addEventListener('click', () => {
            const pubs = document.querySelectorAll('.pub-item');
            let newlyVisible = 0;

            for (let i = currentlyVisible; i < pubs.length; i++) {
                if (newlyVisible < pubsToRevealPerClick) {
                    pubs[i].style.display = 'flex';
                    pubs[i].classList.remove('pub-hidden');

                    // Animate in with a stagger
                    pubs[i].style.opacity = '0';
                    pubs[i].style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        pubs[i].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        pubs[i].style.opacity = '1';
                        pubs[i].style.transform = 'translateY(0)';
                    }, newlyVisible * 100);

                    newlyVisible++;
                }
            }

            currentlyVisible += newlyVisible;

            if (currentlyVisible >= pubs.length) {
                showMorePubsBtn.style.display = 'none';
            }
        });
    }

    // ========================================================
    // Gallery — Carousel, Thumbnails, Lightbox
    // ========================================================

    const carouselTrack = document.getElementById('carouselTrack');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const carouselCounter = document.getElementById('carouselCounter');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    if (carouselTrack) {
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        let currentSlide = 0;
        let autoSlideInterval = null;
        let autoSlideDuration = 4000;
        let progressBar = null;
        let progressAnimation = null;

        // Create progress bar
        progressBar = document.createElement('div');
        progressBar.className = 'carousel-progress';
        carouselTrack.closest('.gallery-carousel').appendChild(progressBar);

        // Create indicator dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            carouselIndicators.appendChild(dot);
        }

        const dots = carouselIndicators.querySelectorAll('.carousel-dot');

        // Activate first slide
        slides[0].classList.add('active');

        function goToSlide(index) {
            if (index === currentSlide) return;

            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            carouselCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

            // Restart progress animation
            resetProgress();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Progress bar animation
        function resetProgress() {
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';

                // Force reflow
                progressBar.offsetHeight;

                progressBar.style.transition = `width ${autoSlideDuration}ms linear`;
                progressBar.style.width = '100%';
            }
        }

        // Auto-slide
        function startAutoSlide() {
            stopAutoSlide();
            resetProgress();
            autoSlideInterval = setInterval(nextSlide, autoSlideDuration);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        // Button handlers
        carouselPrev.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });

        carouselNext.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });

        // Pause on hover
        const carouselEl = carouselTrack.closest('.gallery-carousel');
        carouselEl.addEventListener('mouseenter', () => {
            stopAutoSlide();
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = progressBar.offsetWidth + 'px';
            }
        });
        carouselEl.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        carouselEl.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselEl.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoSlide();
            }
        }, { passive: true });

        // Start auto-slide
        startAutoSlide();


        // ---- Lightbox ----
        const galleryImages = [];
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) galleryImages.push(img.src);
        });

        let lightboxIndex = 0;

        function openLightbox(index) {
            lightboxIndex = index;
            lightboxImg.src = galleryImages[index];
            lightboxCounter.textContent = `${index + 1} / ${totalSlides}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            stopAutoSlide();
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            startAutoSlide();
        }

        function lightboxNavigate(direction) {
            lightboxIndex = ((lightboxIndex + direction) % totalSlides + totalSlides) % totalSlides;
            lightboxImg.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.92)';

            setTimeout(() => {
                lightboxImg.src = galleryImages[lightboxIndex];
                lightboxCounter.textContent = `${lightboxIndex + 1} / ${totalSlides}`;
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 200);
        }

        // Double-click carousel slide to open lightbox
        carouselEl.addEventListener('dblclick', (e) => {
            if (e.target.closest('.carousel-btn')) return;
            openLightbox(currentSlide);
        });


        // Lightbox controls
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', () => lightboxNavigate(-1));
        lightboxNext.addEventListener('click', () => lightboxNavigate(1));

        // Click backdrop to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
                closeLightbox();
            }
        });

        // Lightbox touch swipe
        let lbTouchStartX = 0;
        lightbox.addEventListener('touchstart', (e) => {
            lbTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            const diff = lbTouchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                lightboxNavigate(diff > 0 ? 1 : -1);
            }
        }, { passive: true });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') lightboxNavigate(-1);
                if (e.key === 'ArrowRight') lightboxNavigate(1);
            } else {
                // Carousel keyboard nav when gallery section is in view
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                    const rect = gallerySection.getBoundingClientRect();
                    const inView = rect.top < window.innerHeight && rect.bottom > 0;
                    if (inView) {
                        if (e.key === 'ArrowLeft') { prevSlide(); startAutoSlide(); }
                        if (e.key === 'ArrowRight') { nextSlide(); startAutoSlide(); }
                    }
                }
            }
        });
    }

});
