document.addEventListener('DOMContentLoaded', () => {
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

        // Actualizar estado visual de los botones
        buttons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Asignar evento click a cada botón
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            if (tabId && sections[tabId]) {
                activateTab(tabId);
                
                // Desplazamiento suave para centrar la vista en el contenido
                const navHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({ 
                    top: navHeight - 20, 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // Leer el hash de la URL si se comparte un enlace directo a una pestaña
    const hash = window.location.hash.slice(1);
    if (hash && sections[hash]) {
        activateTab(hash);
    } else {
        activateTab('perfil'); // Por defecto
    }
});
