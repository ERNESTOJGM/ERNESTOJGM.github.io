document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-btn');
    const sections = {
        perfil: document.getElementById('perfil'),
        lapso1: document.getElementById('lapso1'),
        lapso2: document.getElementById('lapso2'),
        lapso3: document.getElementById('lapso3'),
        lapso4: document.getElementById('lapso4')
    };

    // Scroll top button
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function activateTab(tabId) {
        Object.values(sections).forEach(section => {
            if (section) section.classList.remove('active');
        });
        if (sections[tabId]) sections[tabId].classList.add('active');

        buttons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
                // desplazamiento suave dentro del nav
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                btn.classList.remove('active');
            }
        });

        // Guardar pestaña activa en localStorage para persistencia (UX)
        localStorage.setItem('activeTab', tabId);
        // Actualizar hash sin causar scroll forzado
        history.replaceState(null, '', `#${tabId}`);
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            if (tabId && sections[tabId]) {
                activateTab(tabId);
                // ajuste de scroll suave hacia el contenido principal
                const headerOffset = document.querySelector('header').offsetHeight;
                const targetPosition = document.querySelector('.container').offsetTop - 20;
                window.scrollTo({ top: Math.max(0, targetPosition - 10), behavior: 'smooth' });
            }
        });
    });

    // Restaurar pestaña desde localStorage o hash
    const hash = window.location.hash.slice(1);
    let savedTab = localStorage.getItem('activeTab');
    let initialTab = 'perfil';

    if (hash && sections[hash]) {
        initialTab = hash;
    } else if (savedTab && sections[savedTab]) {
        initialTab = savedTab;
    }
    activateTab(initialTab);

    // Mejora UX: evitar que el hash cambie de manera brusca al cargar
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.slice(1);
        if (newHash && sections[newHash]) {
            activateTab(newHash);
            const containerTop = document.querySelector('.container').offsetTop;
            window.scrollTo({ top: containerTop - 20, behavior: 'smooth' });
        }
    });

    // Prevenir el salto brusco si hay hash al inicio
    if (window.location.hash) {
        setTimeout(() => {
            const containerTop = document.querySelector('.container').offsetTop;
            if (window.scrollY < 100) {
                window.scrollTo({ top: containerTop - 20, behavior: 'smooth' });
            }
        }, 100);
    }
});
