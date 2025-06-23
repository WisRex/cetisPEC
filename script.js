document.addEventListener('DOMContentLoaded', () => {
    // --- SLIDES CONFIGURATION ---
    // Ensure this list contains the CORRECT paths to your 16 images.
    // File names must match exactly (e.g., 'Slide1.JPG').
    // The 'slides/' folder is where you uploaded them on GitHub.
    const slides = [
        'slides/Slide1.JPG',  // Index 0
        'slides/Slide2.JPG',  // Index 1
        'slides/Slide3.JPG',  // Index 2
        'slides/Slide4.JPG',  // Index 3
        'slides/Slide5.JPG',  // Index 4
        'slides/Slide6.JPG',  // Index 5
        'slides/Slide7.JPG',  // Index 6
        'slides/Slide8.JPG',  // Index 7
        'slides/Slide9.JPG',  // Index 8
        'slides/Slide10.JPG', // Index 9
        'slides/Slide11.JPG', // Index 10
        'slides/Slide12.JPG', // Index 11
        'slides/Slide13.JPG', // Index 12
        'slides/Slide14.JPG', // Index 13
        'slides/Slide15.JPG', // Index 14 - Video slide
        'slides/Slide16.JPG'  // Index 15 - Social media slide
    ];

    let currentSlideIndex = 0;
    const currentSlideElement = document.getElementById('current-slide');
    const presentationContainer = document.getElementById('presentation-container');
    const clickableOverlay = document.getElementById('clickable-overlay'); // Still referenced for pointer-events: none in CSS

    // --- YOUTUBE VIDEO CONFIGURATION ---
    // IMPORTANT!: Replace 'dQw4w9WgXcQ' with the actual ID of your YouTube video.
    // Example: If your URL is https://www.youtube.com/watch?v=YOUR_VIDEO_ID, then YOUR_VIDEO_ID is what you need.
    const youtubeVideoId = 'dQw4w9WgXcQ'; // <-- CHANGE THIS TO YOUR ACTUAL VIDEO ID!

    // --- INTERACTION HOTSPOT MAP ---
    // Defines clickable areas and their destinations for each slide.
    // Coordinates (x, y, width, height) are percentages of the image size (based on 1280x720).
    // Format: [left_percent, top_percent, width_percent, height_percent, target_slide_index_or_url_string]
    const slideHotspots = {
        // Slide 1 (Index 0): "Proyecto Escolar Comunitario"
        0: [
            // "Click Aqui!" arrow at the bottom center
            [40, 80, 20, 10, 1] // Go to Slide2 (index 1)
        ],
        // Slide 2 (Index 1): "Áreas de este proyecto..."
        1: [
            // Top-left arrow
            [3, 3, 10, 10, 0], // Go to Slide1 (index 0)
            // Top-right arrow
            [87, 3, 10, 10, 15], // Go to Slide16 (index 15)
            // "Áreas de este proyecto..." box
            [25, 34, 50, 12, 2], // Go to Slide3 (index 2)
            // "¿Qué aprendimos de este proyecto?" box
            [25, 49, 50, 12, 12], // Go to Slide13 (index 12)
            // "Sobre nosotros" box
            [25, 64, 50, 12, 13]  // Go to Slide14 (index 13)
        ],
        // Slide 3 (Index 2): "SEMILLAS DE CAMBIO." (RECOLECCION, BRED, Consintiendo)
        2: [
            // Top-left arrow
            [3, 3, 10, 10, 1], // Go to Slide2 (index 1)
            // RECOLECCION DE PLASTICO - "¿En qué consistió?"
            [3, 44, 30, 8, 5],  // Go to Slide6 (index 5)
            // RECOLECCION DE PLASTICO - "Organización"
            [3, 54, 30, 8, 4],  // Go to Slide5 (index 4)
            // RECOLECCION DE PLASTICO - "Propósito"
            [3, 64, 30, 8, 3],  // Go to Slide4 (index 3)
            // BRED - "¿En qué consistió?"
            [35, 44, 30, 8, 7], // Go to Slide8 (index 7)
            // BRED - "Organización"
            [35, 54, 30, 8, 6], // Go to Slide7 (index 6)
            // BRED - "Propósito"
            [35, 64, 30, 8, 8], // Go to Slide9 (index 8)
            // Consintiendo a un abuel@ - "¿En qué consistió?"
            [67, 44, 30, 8, 9], // Go to Slide10 (index 9)
            // Consintiendo a un abuel@ - "Organización"
            [67, 54, 30, 8, 10], // Go to Slide11 (index 10)
            // Consintiendo a un abuel@ - "Propósito"
            [67, 64, 30, 8, 11]  // Go to Slide12 (index 11)
        ],
        // Slides 4-13: Top-left arrow to Slide3
        3: [ [3, 3, 10, 10, 2] ],
        4: [ [3, 3, 10, 10, 2] ],
        5: [ [3, 3, 10, 10, 2] ],
        6: [ [3, 3, 10, 10, 2] ],
        7: [ [3, 3, 10, 10, 2] ],
        8: [ [3, 3, 10, 10, 2] ],
        9: [ [3, 3, 10, 10, 2] ],
        10: [ [3, 3, 10, 10, 2] ],
        11: [ [3, 3, 10, 10, 2] ],
        12: [ [3, 3, 10, 10, 2] ],
        // Slide 14 (Index 13)
        13: [
            [3, 3, 10, 10, 2], // Top-left arrow to Slide3
            [87, 45, 10, 10, 14] // Right arrow to Slide15 (index 14)
        ],
        // Slide 15 (Index 14): YouTube Video
        14: [
            [3, 45, 10, 10, 13], // Left arrow to Slide14 (index 13)
            // YouTube thumbnail (click in the center area)
            [20, 20, 60, 60, 'youtube'] // Special action 'youtube'
        ],
        // Slide 16 (Index 15): Social Media
        15: [
            [3, 3, 10, 10, 1], // Top-left arrow to Slide2 (index 1)
            [15, 38, 30, 20, 'https://www.facebook.com/cetis107oficial/'], // Facebook box
            [50, 38, 30, 20, 'https://www.instagram.com/cetis107oficial/'], // Instagram box
            [80, 38, 15, 20, 'https://x.com/cetis107'] // Twitter/X box
        ]
    };

    // Function to display a specific slide
    function showSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlideIndex = index;

            // Remove any existing YouTube iframe before showing a new slide
            const existingIframe = presentationContainer.querySelector('#youtube-iframe');
            if (existingIframe) {
                existingIframe.remove();
                // Ensure the slide image is visible again
                currentSlideElement.style.display = 'block';
            }

            currentSlideElement.style.opacity = 0; // Start fade-out transition
            setTimeout(() => {
                currentSlideElement.src = slides[currentSlideIndex];
                currentSlideElement.style.opacity = 1; // Start fade-in transition
            }, 500); // Matches CSS transition duration
        } else if (index >= slides.length) {
            // Behavior at the end of the presentation
            console.log("End of presentation. Restarting...");
            showSlide(0); // Restart from the beginning
        }
    }

    // Function to check if a click is within a hotspot
    function isClickInHotspot(xPercent, yPercent, hotspots) {
        if (!hotspots) return null; // No hotspots for this slide

        for (const hotspot of hotspots) {
            const [hx, hy, hw, hh, target] = hotspot; // Hotspot coordinates in percentage

            // Check if the click is within the hotspot area
            if (xPercent >= hx && xPercent <= (hx + hw) &&
                yPercent >= hy && yPercent <= (hy + hh)) {
                return target; // Return the hotspot's target
            }
        }
        return null; // Click was not on any hotspot
    }

    // Click handler on the slide image
    currentSlideElement.addEventListener('click', (event) => {
        // If a YouTube iframe is currently active, prevent clicks on the image below it.
        if (presentationContainer.querySelector('#youtube-iframe')) {
            return;
        }

        const img = currentSlideElement;
        const rect = img.getBoundingClientRect(); // Get size and position of the visible image

        // Calculate click coordinates relative to the image (in pixels)
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Convert click coordinates to percentages relative to the image size
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // FOR DEBUGGING: Keep this line until it works perfectly
        console.log(`Click en %: X=${xPercent.toFixed(2)}, Y=${yPercent.toFixed(2)}`);
        // END DEBUGGING

        const target = isClickInHotspot(xPercent, yPercent, slideHotspots[currentSlideIndex]);

        if (target !== null) {
            // Clicked on a hotspot
            if (typeof target === 'number') {
                showSlide(target);
            } else if (typeof target === 'string') {
                if (target === 'youtube') {
                    // Create and load the YouTube iframe
                    const youtubeIframeHtml = `
                        <iframe id="youtube-iframe" src="https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&controls=1&rel=0&modestbranding=1"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                    `;
                    presentationContainer.innerHTML = youtubeIframeHtml;
                    currentSlideElement.style.display = 'none'; // Hide the background image while video plays
                } else {
                    window.open(target, '_blank'); // Open URL in new tab
                }
            }
        } else {
            // No specific hotspot clicked, advance to the next slide by default
            // This applies if there are no hotspots or if the click was outside them.
            showSlide(currentSlideIndex + 1);
        }
    });

    // Mouse move handler to change cursor
    currentSlideElement.addEventListener('mousemove', (event) => {
        // If a YouTube iframe is active, the cursor should not change on the hidden image.
        if (presentationContainer.querySelector('#youtube-iframe')) {
            currentSlideElement.style.cursor = 'default'; // Ensure default cursor when video is playing
            return;
        }

        const img = currentSlideElement;
        const rect = img.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Check if the mouse is over a hotspot
        const target = isClickInHotspot(xPercent, yPercent, slideHotspots[currentSlideIndex]);

        if (target !== null) {
            currentSlideElement.style.cursor = 'pointer'; // Show hand cursor
        } else {
            currentSlideElement.style.cursor = 'default'; // Back to normal cursor
        }
    });

    // Preload all images for instant and smooth transitions
    slides.forEach(slideUrl => {
        const img = new Image();
        img.src = slideUrl;
    });

    // Initialize the presentation
    showSlide(0);
});

    // Inicializa la presentación
    showSlide(0);
});
