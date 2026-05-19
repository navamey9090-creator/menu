document.addEventListener('DOMContentLoaded', () => {
    // 1. MAGNETIC BUTTONS EFFECT
    const magneticWraps = document.querySelectorAll('.magnetic-wrap');
    
    magneticWraps.forEach(wrap => {
        wrap.addEventListener('mousemove', (e) => {
            const btn = wrap.querySelector('.neo-raised');
            const rect = wrap.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            wrap.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        wrap.addEventListener('mouseleave', () => {
            const btn = wrap.querySelector('.neo-raised');
            btn.style.transform = '';
            wrap.style.transform = '';
        });
    });

    // 2. TEXT SCRAMBLE / REVEAL FOR HERO
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease';
            heroTitle.style.opacity = '1';
        }, 100);
    }

    // 3. SCROLL PROGRESS BAR
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 4. NEOMORPHIC INTERACTION (Raised/Pressed)
    const interactiveElements = document.querySelectorAll('.neo-raised');
    interactiveElements.forEach(el => {
        el.addEventListener('mousedown', () => el.classList.add('neo-pressed'));
        el.addEventListener('mouseup', () => el.classList.remove('neo-pressed'));
        el.addEventListener('mouseleave', () => el.classList.remove('neo-pressed'));
    });

    // 5. STAGGERED SCROLL REVEAL
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // Apply reveal classes to various sections
    const revealElements = [
        ...document.querySelectorAll('.about-card'),
        ...document.querySelectorAll('.detail-col'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.footer-content')
    ];

    revealElements.forEach((el, index) => {
        el.classList.add('reveal-hidden');
        // Add a small delay based on index for siblings
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(el);
    });

    // 6. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
