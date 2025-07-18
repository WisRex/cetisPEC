document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        'slides/Slide1.JPG',
        'slides/Slide2.JPG',
        'slides/Slide3.JPG',
        'slides/Slide4.JPG',
        'slides/Slide5.JPG',
        'slides/Slide6.JPG',
        'slides/Slide7.JPG',
        'slides/Slide8.JPG',
        'slides/Slide9.JPG',
        'slides/Slide10.JPG',
        'slides/Slide11.JPG',
        'slides/Slide12.JPG',
        'slides/Slide13.JPG',
        'slides/Slide14.JPG',
        'slides/Slide15.JPG',
        'slides/Slide16.JPG'
    ];

    let currentSlideIndex = 0;
    const currentSlideElement = document.getElementById('current-slide');
    const presentationContainer = document.getElementById('presentation-container');
    const clickableOverlay = document.getElementById('clickable-overlay');

    const youtubeVideoId = 'Ytfg1NRHtqg';
    const clickSoundPath = 'audio/click.mp3';
    let clickAudio = new Audio(clickSoundPath);
    clickAudio.volume = 0.5; // Opcional: Ajusta el volumen (0.0 a 1.0)

    const slideHotspots = {
        0: [
            [43, 80, 20, 10, 1]
        ],
        1: [
            [3, 3, 10, 10, 0],
            [85, 4, 12, 12, 15],
            [25, 34, 50, 12, 2],
            [25, 49, 50, 12, 12],
            [25, 64, 50, 12, 13],
            [85, 87, 8, 8, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
            [87, 45, 10, 10, 'https://dos.zone/doom-dec-1993/']
        ],
        2: [
            [3, 3, 10, 10, 1],
            [3, 44, 30, 8, 5],
            [3, 54, 30, 8, 4],
            [3, 64, 30, 8, 3],
            [35, 44, 30, 8, 7],
            [35, 54, 30, 8, 6],
            [35, 64, 30, 8, 8],
            [67, 44, 30, 8, 9],
            [67, 54, 30, 8, 10],
            [67, 64, 30, 8, 11]
        ],
        3: [ [3, 3, 10, 10, 2] ],
        4: [ [3, 3, 10, 10, 2] ],
        5: [ [3, 3, 10, 10, 2] ],
        6: [ [3, 3, 10, 10, 2] ],
        7: [ [3, 3, 10, 10, 2] ],
        8: [ [3, 3, 10, 10, 2] ],
        9: [ [3, 3, 10, 10, 2] ],
        10: [ [3, 3, 10, 10, 2] ],
        11: [ [3, 3, 10, 10, 2] ],
        12: [ [3, 3, 10, 10, 1] ],
        13: [
            [3, 3, 10, 10, 1],
            [87, 45, 10, 10, 14]
        ],
        14: [
            [3, 45, 10, 10, 13],
            [20, 20, 60, 60, 'youtube']
        ],
      15: [
            [3, 45, 10, 10, 1],
            [25, 32, 50, 15, 'https://www.facebook.com/cetis107oficial/'],
            [25, 66, 50, 15, 'https://www.instagram.com/cetis107oficial/'],
            [25, 49, 50, 15, 'https://x.com/cetis107']
        ]
    };

    function showSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlideIndex = index;

            const existingIframe = presentationContainer.querySelector('#youtube-iframe');
            if (existingIframe) {
                existingIframe.remove();
                currentSlideElement.style.display = 'block';
            }

            currentSlideElement.style.opacity = 0;
            setTimeout(() => {
                currentSlideElement.src = slides[currentSlideIndex];
                currentSlideElement.style.opacity = 1;
            }, 500);
        } else if (index >= slides.length) {
            console.log("End of presentation. Restarting...");
            showSlide(0);
        }
    }

    function isClickInHotspot(xPercent, yPercent, hotspots) {
        if (!hotspots) return null;

        for (const hotspot of hotspots) {
            const [hx, hy, hw, hh, target] = hotspot;

            if (xPercent >= hx && xPercent <= (hx + hw) &&
                yPercent >= hy && yPercent <= (hy + hh)) {
                return target;
            }
        }
        return null;
    }

    currentSlideElement.addEventListener('click', (event) => {
        if (presentationContainer.querySelector('#youtube-iframe')) {
            return;
        }

        const img = currentSlideElement;
        const rect = img.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        console.log(`Click en %: X=${xPercent.toFixed(2)}, Y=${yPercent.toFixed(2)}`);

        const target = isClickInHotspot(xPercent, yPercent, slideHotspots[currentSlideIndex]);

        if (target !== null) {
             clickAudio.currentTime = 0; // Reinicia el sonido al principio si ya está sonando
             clickAudio.play().catch(e => console.error("Error al reproducir el sonido:", e));
            if (typeof target === 'number') {
                showSlide(target);
            } else if (typeof target === 'string') {
                if (target === 'youtube') {
                    const youtubeIframeHtml = `
                        <iframe id="youtube-iframe" src="https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&controls=1&rel=0&modestbranding=1"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                    `;
                    presentationContainer.innerHTML = youtubeIframeHtml;
                    currentSlideElement.style.display = 'none';
                } else {
                    window.open(target, '_blank');
                }
            }
        } else {
           
        }
    });

    currentSlideElement.addEventListener('mousemove', (event) => {
        if (presentationContainer.querySelector('#youtube-iframe')) {
            currentSlideElement.style.cursor = 'default';
            return;
        }

        const img = currentSlideElement;
        const rect = img.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        const target = isClickInHotspot(xPercent, yPercent, slideHotspots[currentSlideIndex]);

        if (target !== null) {
            currentSlideElement.style.cursor = 'pointer';
        } else {
            currentSlideElement.style.cursor = 'default';
        }
    });

    slides.forEach(slideUrl => {
        const img = new Image();
        img.src = slideUrl;
    });

    showSlide(0);
});
