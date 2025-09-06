document.addEventListener("DOMContentLoaded", function() {

    // --- Theme Switcher ---
    const themeSwitcherBtn = document.getElementById('theme-switcher-btn');
    const themeOptionsContainer = document.getElementById('theme-options');
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'theme-dark';
    body.className = savedTheme;

    themeSwitcherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeOptionsContainer.classList.toggle('active');
    });

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedTheme = `theme-${option.dataset.theme}`;
            body.className = selectedTheme;
            localStorage.setItem('theme', selectedTheme);
            themeOptionsContainer.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!themeSwitcherBtn.contains(e.target) && !themeOptionsContainer.contains(e.target)) {
            themeOptionsContainer.classList.remove('active');
        }
    });

    // --- Animated Statistics Counter on Scroll ---
    const statsSection = document.getElementById('statistics');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const targetText = stat.getAttribute('data-target');
            const target = parseFloat(targetText);
            const suffix = stat.innerText.replace(/[0-9.]/g, '');
            const duration = 2000;
            const frameRate = 60;
            const totalFrames = Math.round((duration / 1000) * frameRate);
            let frame = 0;
            
            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const current = target * progress;
                
                if(target % 1 !== 0) { // Check if it's a float
                    stat.innerText = current.toFixed(targetText.split('.')[1].length || 1) + suffix;
                } else {
                    stat.innerText = Math.round(current).toLocaleString() + suffix;
                }
                
                if (frame === totalFrames) {
                    clearInterval(counter);
                    // Ensure final value is exact
                    stat.innerText = target.toLocaleString() + suffix;
                }
            }, duration / totalFrames);
        });
        hasAnimated = true;
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        scrollObserver.observe(statsSection);
    }
});
