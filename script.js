document.addEventListener('DOMContentLoaded', function() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    const carouselDots = document.getElementById('carouselDots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    let currentSlide = 0;
    let slidesToShow = 3;
    let totalSlides = 0;
    function calculateSlidesToShow() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
            slidesToShow = 1;
        } else if (screenWidth < 1024) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        
        totalSlides = 5;
        
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
    }
  
    function createDots() {
        carouselDots.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => goToSlide(i));
            carouselDots.appendChild(dot);
        }
    }

    function updateActiveDot() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    
    function goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= totalSlides) return;
        
        currentSlide = slideIndex;
    
        const cardWidth = testimonialCards[0].offsetWidth;
        const gap = 30; 
        const translateX = -((cardWidth + gap) * currentSlide);
        
        testimonialsGrid.style.transform = `translateX(${translateX}px)`;
        updateActiveDot();
    }

    function initCarousel() {
        calculateSlidesToShow();
        createDots();
        goToSlide(0);
    }
    
    function handleResize() {
        const oldSlidesToShow = slidesToShow;
        calculateSlidesToShow();
        
        if (oldSlidesToShow !== slidesToShow) {
            createDots();
            goToSlide(0);
        } else {
            goToSlide(currentSlide);
        }
    }
    
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % totalSlides;
            goToSlide(nextSlide);
        }, 5000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    const recommendationsSection = document.querySelector('.recommendations-section');
    recommendationsSection.addEventListener('mouseenter', stopAutoPlay);
    recommendationsSection.addEventListener('mouseleave', startAutoPlay);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            const prevSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
            goToSlide(prevSlide);
        } else if (e.key === 'ArrowRight') {
            const nextSlide = (currentSlide + 1) % totalSlides;
            goToSlide(nextSlide);
        }
    });
  
    let startX = 0;
    let endX = 0;
    
    testimonialsGrid.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    testimonialsGrid.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                const nextSlide = (currentSlide + 1) % totalSlides;
                goToSlide(nextSlide);
            } else {
                const prevSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
                goToSlide(prevSlide);
            }
        }
    }
    

    initCarousel();
    startAutoPlay();

    window.addEventListener('resize', handleResize);
    function addFadeInAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            .testimonial-card {
                opacity: 0;
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
            .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
            .testimonial-card:nth-child(3) { animation-delay: 0.3s; }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    addFadeInAnimation();
});