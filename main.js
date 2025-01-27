document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle с улучшенной анимацией
    const themeButton = document.getElementById('themeButton');
    let isDark = false;

    themeButton.addEventListener('click', () => {
        isDark = !isDark;
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeButton.textContent = isDark ? '☀️' : '🌙';
        
        themeButton.style.transform = 'scale(1.2)';
        setTimeout(() => {
            themeButton.style.transform = 'scale(1)';
        }, 200);
    });

    // Добавляем счетчик просмотров для каждой карточки
    document.querySelectorAll('.tip-card').forEach(card => {
        const views = Math.floor(Math.random() * 1000) + 100;
        const viewCounter = document.createElement('div');
        viewCounter.className = 'view-counter';
        viewCounter.innerHTML = `👁 ${views}`;
        card.appendChild(viewCounter);

        // Интерактивный эффект при клике
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.copy-button')) {
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                this.appendChild(ripple);

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                setTimeout(() => ripple.remove(), 1000);
            }
        });

        // Добавляем кнопку копирования для примеров
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '📋';
        card.appendChild(copyButton);

        copyButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = card.querySelector('p').textContent;
            navigator.clipboard.writeText(text).then(() => {
                copyButton.innerHTML = '✅';
                setTimeout(() => {
                    copyButton.innerHTML = '📋';
                }, 2000);
            });
        });
    });

    // Анимация прогресс-бара при скролле
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Интерактивные примеры сообщений
    document.querySelectorAll('.example').forEach(example => {
        example.addEventListener('mouseenter', () => {
            example.style.transform = 'scale(1.02) translateX(10px)';
        });

        example.addEventListener('mouseleave', () => {
            example.style.transform = 'scale(1) translateX(0)';
        });
    });

    // Добавляем анимированные иконки для правил
    const icons = ['📝', '🔢', '⏱️', '🎯'];
    document.querySelectorAll('.tip-icon').forEach((icon, index) => {
        icon.innerHTML = icons[index];
        
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });

        icon.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Анимация для заголовка при скролле
    const heroTitle = document.querySelector('.hero h1');
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (scroll < 300) {
            heroTitle.style.transform = `translateY(${scroll * 0.5}px)`;
            heroTitle.style.opacity = 1 - (scroll * 0.003);
        }
    });
});