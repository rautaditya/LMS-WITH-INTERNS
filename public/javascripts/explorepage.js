const slides = document.querySelector('.Explorer-slides');
        const slideItems = document.querySelectorAll('.Explorer-slide');
        let currentIndex = 0;

        function showSlide(index) {
            if (index < 0) {
                currentIndex = slideItems.length - 1;
            } else if (index >= slideItems.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            const translateValue = -currentIndex * 100 + '%';
            slides.style.transform = `translateX(${translateValue})`;
        }

        function autoSlide() {
            currentIndex++;
            showSlide(currentIndex);
        }

        // Set interval for auto sliding (change duration as needed)
        const slideInterval = setInterval(autoSlide, 5000);

        // Uncomment the following lines if you want to pause on hover
        // slides.addEventListener('mouseover', () => clearInterval(slideInterval));
        // slides.addEventListener('mouseout', () => slideInterval = setInterval(autoSlide, 3000));