document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN IMPORTANTE ---
    // 1. Asegúrate de que esta lista contenga las rutas CORRECTAS a tus imágenes.
    //    Deben coincidir con los nombres de archivo que PowerPoint exportó (ej. 'Slide1.JPG').
    //    La carpeta 'slides/' es donde las subiste en GitHub.
    const slides = [
        'slides/Slide1.JPG',  // Proyecto Escolar Comunitario (PEC)
        'slides/Slide2.JPG',  // Continúa con la imagen del niño vaciando el bote
        'slides/Slide3.JPG',  // ¡Clíck aquí! (Esta es la que necesitamos hacer interactiva)
        'slides/Slide4.JPG',  // ¿Qué aprendimos de este proyecto? Áreas de este proyecto…
        'slides/Slide5.JPG',  // Fomentar la conciencia ambiental...
        'slides/Slide6.JPG',  // Para lograrlo, implementamos un horario de limpieza...
        'slides/Slide7.JPG',  // Vaciado de Contenedores...
        'slides/Slide8.JPG',  // Este sistema no solo nos permitió...
        'slides/Slide9.JPG',  // Nuestro plantel decidió hacer una plena colaboración...
        'slides/Slide10.JPG', // Misma organización que haría llegar...
        'slides/Slide11.JPG', // Se organizó una colecta de juguetes...
        'slides/Slide12.JPG', // ¿En que consistió la dinámica?
        'slides/Slide13.JPG', // Este proyecto tenía como propósito...
        'slides/Slide14.JPG', // Como parte del proyecto Semillas de Cambio...
        'slides/Slide15.JPG', // Cada semestre se le asigno un tipo de objeto...
        'slides/Slide16.JPG', // Esta parte del Proyecto Comunitario Escolar...
        'slides/Slide17.JPG', // Manos levantadas (imagen final)
        'slides/Slide18.JPG', // Imagen de bote de reciclaje
        'slides/Slide19.JPG', // Imagen DGETI
        'slides/Slide20.JPG', // Bienvenido a CETis #107 (texto)
        'slides/Slide21.JPG', // Edificio CETis 107
        'slides/Slide22.JPG', // Aulas CETis 107
        'slides/Slide23.JPG', // Persona en computadora
        'slides/Slide24.JPG', // CETis 107 te ofrece una Educación de Calidad...
        'slides/Slide25.JPG', // Video de YouTube (Esta será especial)
        'slides/Slide26.JPG', // ¡Nuestras redes! (Facebook)
        'slides/Slide27.JPG', // ¡Nuestras redes! (X)
        'slides/Slide28.JPG', // ¡Nuestras redes! (Instagram)
        // Asegúrate de que esta lista contenga todas tus imágenes en el orden correcto
        // Vi en el documento que hay 29 imágenes, asegúrate de tenerlas todas.
    ];

    let currentSlideIndex = 0;
    const currentSlideElement = document.getElementById('current-slide');
    const clickableOverlay = document.getElementById('clickable-overlay'); // Para manejar clics en la diapositiva

    // Mapa para definir acciones al hacer clic en diapositivas específicas
    // ESTO ES CLAVE para tus botones internos. Mapea el índice de la diapositiva
    // a la función o diapositiva a la que debe ir.
    const slideClickActions = {
        // Diapositiva 3: Tiene el botón "¡Clíck aquí!"
        // Asumiendo que "¡Clíck aquí!" lleva a la Diapositiva 4
        2: () => showSlide(3), // índice 2 es la 3era diapositiva (¡Clíck aquí!), lleva a la 4ta (índice 3)

        // Diapositiva 25: Tiene el video de YouTube
        // Para reproducir el video, o si se hace clic, llevar a la siguiente
        24: () => {
            // Aquí puedes decidir qué hacer. Si quieres reproducir el video de YouTube,
            // la mejor forma es que esa diapositiva sea un embed de YouTube real,
            // no solo una imagen. Para simplificar, si se hace clic, avanza a la siguiente:
            showSlide(currentSlideIndex + 1);
            // Si el video de YouTube es CRÍTICO, podemos hacer que esa diapositiva
            // cambie el contenido del #current-slide a un iframe de YouTube.
            // Para el ejemplo inicial, lo tratamos como una imagen que avanza.
        },

        // Diapositivas de redes sociales (ej. 26, 27, 28)
        // Tendrías que definir las áreas clicables exactas o tener botones externos.
        // Por simplicidad inicial, un clic en estas diapositivas podría no hacer nada
        // o avanzar a la siguiente.
        25: () => window.open('https://www.facebook.com/CETis107/', '_blank'), // Asumiendo Facebook en Diapositiva 26
        26: () => window.open('https://twitter.com/cetis107oficial', '_blank'), // Asumiendo X en Diapositiva 27
        27: () => window.open('https://www.instagram.com/cetis107oficial/', '_blank'), // Asumiendo Instagram en Diapositiva 28
    };

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlideElement.style.opacity = 0; // Inicia la transición de salida
            setTimeout(() => {
                currentSlideIndex = index;
                currentSlideElement.src = slides[currentSlideIndex];
                currentSlideElement.style.opacity = 1; // Inicia la transición de entrada
            }, 500); // Coincide con la duración de la transición CSS
        }
    }

    // Navegación por clic en el overlay (para tus botones dentro de las imágenes)
    if (clickableOverlay) {
        clickableOverlay.addEventListener('click', () => {
            const action = slideClickActions[currentSlideIndex];
            if (action) {
                action(); // Ejecuta la acción definida para esta diapositiva
            } else {
                // Si no hay una acción específica definida, avanza a la siguiente diapositiva por defecto
                // Puedes quitar esto si solo quieres avanzar con botones específicos
                showSlide(currentSlideIndex + 1);
            }
        });
    }

    // Precarga todas las imágenes para una transición instantánea
    slides.forEach(slideUrl => {
        const img = new Image();
        img.src = slideUrl;
    });

    // Inicializa la presentación mostrando la primera diapositiva
    showSlide(0);
});