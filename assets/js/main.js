// Testimonial data
const testimonials = [
    {
        image: 'assets\\imgs\\Rectangle.png',
        mainImage: 'assets\\imgs\\Rectangle.png',
        quote: '"The volunteer walking app revolutionized our ground game. We knocked 40% more doors with the same number of volunteers."',
        author: 'Michael Thompson | County Commissioner'
    },
    {
        image: 'assets\\imgs\\Rectangle (1).png',
        mainImage: 'assets\\imgs\\Rectangle (1).png',
        quote: '"Campaign Butler\'s data analytics helped us target the right voters. Our conversion rate increased by 65% in just two months."',
        author: 'Sarah Martinez | State Representative'
    },
    {
        image: 'assets\\imgs\\Rectangle (2).png',
        mainImage: 'assets\\imgs\\Rectangle (2).png',
        quote: '"The complete digital strategy from Campaign Butler gave us a professional edge. We won by the largest margin in district history."',
        author: 'David Chen | City Council Member'
    }
];

let currentIndex = 1; // Start with middle card

function updateCarousel() {
    const cards = document.querySelectorAll('.testimonial-card-wrapper');
    const indicators = document.querySelectorAll('.indicator');
    const totalCards = testimonials.length;

    cards.forEach((card, index) => {
        // Remove all position classes
        card.classList.remove('left', 'center', 'right', 'hidden', 'active');
        
        // Calculate relative position
        let position = index - currentIndex;
        
        // Wrap around
        if (position < -1) position = position + totalCards;
        if (position > 1) position = position - totalCards;

        // Apply position classes
        if (position === -1) {
            card.classList.add('left');
            card.setAttribute('data-position', 'left');
        } else if (position === 0) {
            card.classList.add('center', 'active');
            card.setAttribute('data-position', 'center');
            
            // Update main card content
            const mainCard = card.querySelector('.testimonial-card');
            const data = testimonials[index];
            
            mainCard.innerHTML = `
                <div class="video-section">
                    <img src="${data.mainImage}" alt="Main testimonial">
                    <div class="play-button-overlay">
                        <div class="play-icon">▶</div>
                    </div>
                    <div class="growth-indicator">
                        <svg width="80" height="40" viewBox="0 0 80 40">
                            <polyline points="0,35 20,28 40,15 60,10 80,5" 
                                        fill="none" 
                                        stroke="#ff2d55" 
                                        stroke-width="2"/>
                        </svg>
                    </div>
                </div>
                <div class="testimonial-text">
                    <p class="testimonial-quote">${data.quote}</p>
                    <p class="testimonial-author">${data.author}</p>
                </div>
            `;
        } else if (position === 1) {
            card.classList.add('right');
            card.setAttribute('data-position', 'right');
        } else {
            card.classList.add('hidden');
        }

        // Update side cards to show simple images
        if (position !== 0) {
            const data = testimonials[index];
            card.querySelector('.testimonial-card').innerHTML = `
                <div class="card-image">
                    <img src="${data.image}" alt="Candidate">
                </div>
            `;
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });

    // Re-attach play button event
    attachPlayButtonEvent();
}

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= testimonials.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = testimonials.length - 1;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function attachPlayButtonEvent() {
    const playButton = document.querySelector('.play-button-overlay');
    if (playButton) {
        playButton.addEventListener('click', function() {
            alert('Video testimonial would play here');
        });
    }
}

// Click on side cards to make them center
document.addEventListener('click', function(e) {
    const cardWrapper = e.target.closest('.testimonial-card-wrapper');
    if (cardWrapper && !cardWrapper.classList.contains('center')) {
        const position = cardWrapper.getAttribute('data-position');
        if (position === 'left') {
            changeSlide(-1);
        } else if (position === 'right') {
            changeSlide(1);
        }
    }
});

// Auto slide every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Initialize carousel
updateCarousel();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your interest! We\'ll be in touch soon.');
    this.reset();
});