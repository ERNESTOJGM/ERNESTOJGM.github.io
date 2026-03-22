function showTab(tabId) {
    // Ocultar todos los contenidos
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Quitar clase active de todos los botones
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar el contenido seleccionado
    document.getElementById(tabId).classList.add('active');
    
    // Activar el botón correspondiente
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(btn => 
        btn.getAttribute('onclick').includes(tabId)
    );
    if (activeBtn) activeBtn.classList.add('active');

    // Scroll suave hacia arriba al cambiar de pestaña
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
