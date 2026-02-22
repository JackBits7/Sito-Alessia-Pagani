document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Fade-in Reveal
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // 2. Dynamic Navbar
    const navbar = document.getElementById('navbar');
    const navInner = document.getElementById('nav-inner');
    const logoDot = document.getElementById('logo-dot');
    const contactBtn = document.getElementById('contact-btn');
    const mobileBtn = document.getElementById('mobile-btn');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('bg-transparent', 'border-transparent');
                navbar.classList.add('bg-cobalt/95', 'backdrop-blur-md', 'shadow-lg');

                if (navInner) {
                    navInner.classList.remove('h-28', 'text-midnight');
                    navInner.classList.add('h-16', 'text-dust');
                }
                if (logoDot) {
                    logoDot.classList.remove('text-cobalt');
                    logoDot.classList.add('text-dust');
                }
                if (mobileBtn) {
                    mobileBtn.classList.remove('text-midnight');
                    mobileBtn.classList.add('text-dust');
                }
                if (contactBtn) {
                    contactBtn.classList.remove('hover:bg-cream', 'hover:text-cobalt');
                    contactBtn.classList.add('border-dust', 'hover:bg-dust', 'hover:text-cobalt');
                }
            } else {
                navbar.classList.add('bg-transparent', 'border-transparent');
                navbar.classList.remove('bg-cobalt/95', 'backdrop-blur-md', 'shadow-lg');

                if (navInner) {
                    navInner.classList.add('h-28', 'text-midnight');
                    navInner.classList.remove('h-16', 'text-dust');
                }
                if (logoDot) {
                    logoDot.classList.add('text-cobalt');
                    logoDot.classList.remove('text-dust');
                }
                if (mobileBtn) {
                    mobileBtn.classList.add('text-midnight');
                    mobileBtn.classList.remove('text-dust');
                }
                if (contactBtn) {
                    contactBtn.classList.add('hover:bg-cream', 'hover:text-cobalt');
                    contactBtn.classList.remove('border-dust', 'hover:bg-dust');
                }
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileBtn) {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initial page load transition
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // 3. Interactive Gallery (Lightbox)
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
        const images = Array.from(portfolioGrid.querySelectorAll('img'));
        let currentIndex = 0;

        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 z-[100] bg-midnight/95 backdrop-blur-md hidden flex items-center justify-center opacity-0 transition-opacity duration-500';

        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'relative w-full h-full flex items-center justify-center px-4 md:px-16';

        const lightboxImg = document.createElement('img');
        lightboxImg.className = 'max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl transform scale-95 transition-transform duration-500';

        // Buttons
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<svg class="w-8 h-8 md:w-10 md:h-10 text-cream opacity-70 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>';
        closeBtn.className = 'absolute top-6 right-6 md:top-8 md:right-8 z-50 focus:outline-none hover:rotate-90 transition-transform duration-500';

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<svg class="w-8 h-8 md:w-12 md:h-12 text-cream opacity-50 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path></svg>';
        prevBtn.className = 'absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 focus:outline-none p-4';

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<svg class="w-8 h-8 md:w-12 md:h-12 text-cream opacity-50 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path></svg>';
        nextBtn.className = 'absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 focus:outline-none p-4';

        lightboxContent.appendChild(lightboxImg);
        lightbox.appendChild(lightboxContent);
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(prevBtn);
        lightbox.appendChild(nextBtn);
        document.body.appendChild(lightbox);

        // Update Image function
        const updateImage = (index) => {
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                lightboxImg.src = images[index].src;
                lightboxImg.classList.remove('scale-95', 'opacity-0');
                lightboxImg.classList.add('scale-100');
            }, 200);
        };

        // Navigation handlers
        const showNext = (e) => {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage(currentIndex);
        };

        const showPrev = (e) => {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage(currentIndex);
        };

        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Open Lightbox
        images.forEach((img, index) => {
            img.classList.add('cursor-pointer');
            img.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = index;
                lightboxImg.src = img.src;
                lightbox.classList.remove('hidden');

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        lightbox.classList.remove('opacity-0');
                        lightboxImg.classList.remove('scale-95', 'opacity-0');
                        lightboxImg.classList.add('scale-100');
                    });
                });

                document.body.style.overflow = 'hidden';
            });
        });

        // Close Lightbox
        const closeLightbox = () => {
            lightbox.classList.add('opacity-0');
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');

            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightboxImg.src = '';
                document.body.style.overflow = '';
            }, 500);
        };

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        lightbox.addEventListener('click', (e) => {
            // Close if clicking outside the image and not on buttons
            if (e.target === lightbox || e.target === lightboxContent) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('hidden')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNext();
                if (e.key === 'ArrowLeft') showPrev();
            }
        });
    }
});
