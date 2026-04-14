document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // Elements to animate in
    const revealElements = [
        '.main-title',
        '.oval-frame',
        '.date-overlay',
        '.poster-info',
        '.details-card',
        '.wishlist-btn'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal-hidden');
            observer.observe(el);
        });
    });

    // Inject reveal CSS
    const style = document.createElement('style');
    style.textContent = `
        .reveal-hidden {
            opacity: 0;
            transform: translateY(25px);
            transition: opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
        /* Stagger the details cards */
        .details-card.reveal-hidden:nth-child(2) { transition-delay: 0.1s; }
        .details-card.reveal-hidden:nth-child(3) { transition-delay: 0.2s; }
        .details-card.reveal-hidden:nth-child(4) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);

    // Copy address on tap
    const locationEl = document.querySelector('.info-location');
    if (locationEl) {
        locationEl.addEventListener('click', (e) => {
            e.preventDefault();
            const address = "Les, Лесная ул., 66В, д. Моховички";
            navigator.clipboard.writeText(address).then(() => {
                const original = locationEl.innerHTML;
                locationEl.textContent = 'Скопировано! ✅';
                setTimeout(() => {
                    locationEl.innerHTML = original;
                }, 1800);
            }).catch(() => {
                // Fallback: just open the map
                window.open(locationEl.href, '_blank');
            });
        });
    }

    // Sparkle trail on hero section (touch/mouse)
    const hero = document.querySelector('.poster-hero');
    if (hero) {
        const createSparkle = (x, y) => {
            const spark = document.createElement('span');
            spark.textContent = '✦';
            spark.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                color: var(--poster-cream);
                pointer-events: none;
                font-size: ${Math.random() * 16 + 14}px;
                z-index: 50;
                opacity: 1;
                transition: all 0.8s ease;
            `;
            hero.appendChild(spark);
            requestAnimationFrame(() => {
                spark.style.opacity = '0';
                spark.style.transform = 'translateY(-40px) rotate(180deg) scale(0)';
            });
            setTimeout(() => spark.remove(), 900);
        };

        hero.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.6) {
                createSparkle(
                    e.pageX - hero.offsetLeft,
                    e.pageY - hero.offsetTop
                );
            }
        });
    }
});
