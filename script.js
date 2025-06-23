document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN DE LAS DIAPOSITIVAS ---
    // Asegúrate de que esta lista contenga las rutas CORRECTAS a tus 16 imágenes.
    // Los nombres de archivo deben coincidir con los que PowerPoint exportó (ej. 'Slide1.JPG').
    // La carpeta 'slides/' es donde las subiste en GitHub.
    const slides = [
        'slides/Slide1.JPG',  // Índice 0
        'slides/Slide2.JPG',  // Índice 1
        'slides/Slide3.JPG',  // Índice 2
        'slides/Slide4.JPG',  // Índice 3
        'slides/Slide5.JPG',  // Índice 4
        'slides/Slide6.JPG',  // Índice 5
        'slides/Slide7.JPG',  // Índice 6
        'slides/Slide8.JPG',  // Índice 7
        'slides/Slide9.JPG',  // Índice 8
        'slides/Slide10.JPG', // Índice 9
        'slides/Slide11.JPG', // Índice 10
        'slides/Slide12.JPG', // Índice 11
        'slides/Slide13.JPG', // Índice 12
        'slides/Slide14.JPG', // Índice 13
        'slides/Slide15.JPG', // Índice 14 - Diapositiva del video
        'slides/Slide16.JPG'  // Índice 15 - Diapositiva de redes sociales
    ];

    let currentSlideIndex = 0;
    const currentSlideElement = document.getElementById('current-slide');
    const presentationContainer = document.getElementById('presentation-container');
    const clickableOverlay = document.getElementById('clickable-overlay');

    // --- CONFIGURACIÓN DEL VIDEO DE YOUTUBE ---
    // ¡IMPORTANTE!: Reemplaza 'dQw4w9WgXcQ' con el ID real de tu video de YouTube.
    // Ejemplo de ID real: Si tu URL es https://www.youtube.com/watch?v=dQw4w9WgXcQ, el ID es dQw4w9WgXcQ
    const youtubeVideoId = 'dQw4w9WgXcQ'; // <-- ¡CAMBIA ESTO CON EL ID REAL DE TU VIDEO!

    // --- MAPA DE INTERACCIONES Y COORDENADAS ---
    // Define las áreas clicables y sus destinos para cada diapositiva.
    // Las coordenadas (x, y, width, height) son porcentajes del tamaño de la imagen.
    // Son estimaciones basadas en tu PPTX y el formato 16:9. Pueden requerir un ajuste fino.
    // Formato: [left_percent, top_percent, width_percent, height_percent, target_slide_index_or_url_string]
    const slideHotspots = {
        // Diapositiva 1 (Índice 0): "Proyecto Escolar Comunitario"
        0: [
            // Flecha de abajo (Click Aqui!) - Aprox. centro inferior
            [40, 80, 20, 10, 1] // Ir a Slide2 (índice 1)
        ],
        // Diapositiva 2 (Índice 1): "Áreas de este proyecto..."
        1: [
            // Flecha izquierda superior
            [5, 5, 10, 10, 0], // Ir a Slide1 (índice 0)
            // Flecha derecha superior
            [85, 5, 10, 10, 15], // Ir a Slide16 (índice 15)
            // "Áreas de este proyecto..." (rectángulo central superior)
            [25, 35, 50, 10, 2], // Ir a Slide3 (índice 2)
            // "¿Qué aprendimos de este proyecto?" (rectángulo central medio)
            [25, 50, 50, 10, 12], // Ir a Slide13 (índice 12)
            // "Sobre nosotros" (rectángulo central inferior)
            [25, 65, 50, 10, 13]  // Ir a Slide14 (índice 13)
        ],
        // Diapositiva 3 (Índice 2): "SEMILLAS DE CAMBIO." (RECOLECCION, BRED, Consintiendo)
        2: [
            // Flecha izquierda superior
            [5, 5, 10, 10, 1], // Ir a Slide2 (índice 1)
            // RECOLECCION DE PLASTICO - ¿En que consistió?
            [5, 45, 25, 10, 5],  // Ir a Slide6 (índice 5)
            // RECOLECCION DE PLASTICO - Organización
            [5, 55, 25, 10, 4],  // Ir a Slide5 (índice 4)
            // RECOLECCION DE PLASTICO - Propósito
            [5, 65, 25, 10, 3],  // Ir a Slide4 (índice 3)
            // BRED - ¿En que consistió?
            [37, 45, 25, 10, 7], // Ir a Slide8 (índice 7)
            // BRED - Organización
            [37, 55, 25, 10, 6], // Ir a Slide7 (índice 6)
            // BRED - Propósito
            [37, 65, 25, 10, 8], // Ir a Slide9 (índice 8)
            // Consintiendo a un abuel@ - ¿En que consistió?
            [68, 45, 25, 10, 9], // Ir a Slide10 (índice 9)
            // Consintiendo a un abuel@ - Organización
            [68, 55, 25, 10, 10], // Ir a Slide11 (índice 10)
            // Consintiendo a un abuel@ - Propósito
            [68, 65, 25, 10, 11]  // Ir a Slide12 (índice 11)
        ],
        // Diapositiva 4 (Índice 3)
        3: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 5 (Índice 4)
        4: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 6 (Índice 5)
        5: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 7 (Índice 6)
        6: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 8 (Índice 7)
        7: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 9 (Índice 8)
        8: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 10 (Índice 9)
        9: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 11 (Índice 10)
        10: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 12 (Índice 11)
        11: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 13 (Índice 12)
        12: [ [5, 5, 10, 10, 2] ], // Flecha izquierda superior a Slide3 (índice 2)
        // Diapositiva 14 (Índice 13)
        13: [
            [5, 5, 10, 10, 2], // Flecha izquierda superior a Slide3 (índice 2)
            [85, 45, 10, 10, 14] // Flecha derecha a Slide15 (índice 14)
        ],
        // Diapositiva 15 (Índice 14): Video de YouTube
        14: [
            [5, 45, 10, 10, 13], // Flecha izquierda a Slide14 (índice 13)
            [20, 20, 60, 60, 'youtube'] // Miniatura de YouTube (clic en el centro) -> acción 'youtube'
        ],
        // Diapositiva 16 (Índice 15): Redes Sociales
        15: [
            [5, 5, 10, 10, 1], // Flecha izquierda superior a Slide2 (índice 1)
            [20, 40, 25, 15, 'https://www.facebook.com/cetis107oficial/'], // Facebook
            [55, 40, 25, 15, 'https://www.instagram.com/cetis107oficial/'], // Instagram
            [80, 40, 15, 15, 'https://x.com/cetis107'] // Twitter/X
        ]
        // Para diapositivas 17 en adelante, si las hubiera y tuvieran interactividad,
        // se añadirían aquí siguiendo el mismo patrón.
        // Si no tienen interactividad especial, el comportamiento por defecto es avanzar al siguiente clic.
    };

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlideIndex = index;

            // Limpia el contenedor de cualquier iframe de video anterior
            if (presentationContainer.querySelector('#youtube-iframe')) {
                presentationContainer.innerHTML = ''; // Limpia todo el contenido del contenedor
                // Vuelve a agregar la imagen y el overlay
                presentationContainer.appendChild(currentSlideElement);
                presentationContainer.appendChild(clickableOverlay);
            }
            
            // Asegúrate de que la imagen sea visible de nuevo si se oculta por el video
            currentSlideElement.style.display = 'block';

            currentSlideElement.style.opacity = 0; // Inicia la transición de salida
            setTimeout(() => {
                currentSlideElement.src = slides[currentSlideIndex];
                currentSlideElement.style.opacity = 1; // Inicia la transición de entrada
            }, 500); // Coincide con la duración de la transición CSS
        } else if (index >= slides.length) {
            // Comportamiento al final de la presentación
            console.log("Fin de la presentación. Reiniciando...");
            showSlide(0); // Reiniciar al principio
        }
    }

    // Manejador de clics en el overlay
    clickableOverlay.addEventListener('click', (event) => {
        // Si actualmente estamos mostrando el iframe de YouTube, los clics en el overlay no deben hacer nada.
        // El video tiene sus propios controles o el usuario debe hacer clic fuera del iframe para volver.
        if (presentationContainer.querySelector('#youtube-iframe')) {
            return; 
        }

        const img = currentSlideElement;
        const rect = img.getBoundingClientRect(); // Obtiene el tamaño y posición de la imagen visible

        // Calcula las coordenadas del clic relativas a la imagen (en píxeles)
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Convierte las coordenadas del clic a porcentajes relativos al tamaño de la imagen
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        const hotspots = slideHotspots[currentSlideIndex];

        let clickedOnHotspot = false;

        if (hotspots) {
            for (const hotspot of hotspots) {
                const [hx, hy, hw, hh, target] = hotspot; // Coordenadas del hotspot en porcentaje

                // Comprueba si el clic está dentro del área del hotspot
                if (xPercent >= hx && xPercent <= (hx + hw) &&
                    yPercent >= hy && yPercent <= (hy + hh)) {
                    
                    clickedOnHotspot = true;
                    // Ejecuta la acción del hotspot
                    if (typeof target === 'number') {
                        // Es un índice de diapositiva
                        showSlide(target);
                    } else if (typeof target === 'string') {
                        // Es una URL o una acción especial como 'youtube'
                        if (target === 'youtube') {
                            // Carga el iframe de YouTube
                            const youtubeIframeHtml = `
                                <iframe id="youtube-iframe" src="https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&controls=1&rel=0&modestbranding=1" 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen></iframe>
                            `;
                            presentationContainer.innerHTML = youtubeIframeHtml;
                            // Ocultar la imagen de fondo mientras se ve el video
                            currentSlideElement.style.display = 'none';

                            // También puedes considerar añadir un temporizador o un botón para "volver" de la reproducción del video
                            // Por ahora, el usuario deberá hacer clic en la flecha de la diapositiva para continuar.

                        } else {
                            // Es una URL, ábrela en una nueva pestaña
                            window.open(target, '_blank');
                        }
                    }
                    break; // Salir del bucle una vez que se encuentra un hotspot
                }
            }
        }

        // Si no se hizo clic en ningún hotspot específico, avanza a la siguiente diapositiva por defecto
        // Esto solo ocurre si no hay hotspots en la diapositiva actual o si se hizo clic fuera de ellos.
        if (!clickedOnHotspot) {
            showSlide(currentSlideIndex + 1);
        }
    });

    // Precarga todas las imágenes para una transición instantánea y fluida
    slides.forEach(slideUrl => {
        const img = new Image();
        img.src = slideUrl;
    });

    // Inicializa la presentación mostrando la primera diapositiva
    showSlide(0);
});
