(function() {
    // Obtener todos los botones y secciones
    const buttons = document.querySelectorAll('.nav-btn');
    const sections = {
        perfil: document.getElementById('perfil'),
        lapso1: document.getElementById('lapso1'),
        lapso2: document.getElementById('lapso2'),
        lapso3: document.getElementById('lapso3'),
        lapso4: document.getElementById('lapso4')
    };

    function activateTab(tabId) {
        // Ocultar todas las secciones
        Object.values(sections).forEach(section => {
            if (section) section.classList.remove('active');
        });
        // Mostrar la seleccionada
        if (sections[tabId]) sections[tabId].classList.add('active');

        // Actualizar estado visual de botones
        buttons.forEach(btn => {
            const btnTab = btn.getAttribute('data-tab');
            if (btnTab === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Asignar evento click a cada botón
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = btn.getAttribute('data-tab');
            if (tabId && sections[tabId]) {
                activateTab(tabId);
                // Scroll suave al inicio del contenido principal
                window.scrollTo({ top: 120, behavior: 'smooth' });
            }
        });
    });

    // Si existe algún hash en la URL, abrir esa pestaña (opcional)
    const hash = window.location.hash.slice(1);
    if (hash && sections[hash]) {
        activateTab(hash);
    } else {
        // Asegurar perfil activo por defecto
        activateTab('perfil');
    }
})();
