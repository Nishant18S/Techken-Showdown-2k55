document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
            
            // Show fight animation after loading
            const fightModal = new bootstrap.Modal(document.getElementById('fightModal'));
            fightModal.show();
        }, 500);
    }, 2500);

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Character animation on hover
    const characters = document.querySelectorAll('.character');
    characters.forEach(character => {
        character.addEventListener('mouseenter', function() {
            if (this.classList.contains('character-left')) {
                this.style.transform = 'translateX(-30px) scale(1.1)';
            } else {
                this.style.transform = 'translateX(30px) scale(1.1)';
            }
        });
        
        character.addEventListener('mouseleave', function() {
            if (this.classList.contains('character-left')) {
                this.style.transform = 'translateX(-50px)';
            } else {
                this.style.transform = 'translateX(50px)';
            }
        });
    });

    // Health bar animation
    function animateHealthBars() {
        const leftHealth = document.querySelector('.health-bar.left .health-fill');
        const rightHealth = document.querySelector('.health-bar.right .health-fill');
        
        let leftWidth = 80;
        let rightWidth = 65;
        
        const healthInterval = setInterval(() => {
            leftWidth -= Math.random() * 2;
            rightWidth -= Math.random() * 2;
            
            if (leftWidth <= 0) leftWidth = 0;
            if (rightWidth <= 0) rightWidth = 0;
            
            leftHealth.style.width = `${leftWidth}%`;
            rightHealth.style.width = `${rightWidth}%`;
            
            if (leftWidth <= 0 || rightWidth <= 0) {
                clearInterval(healthInterval);
                setTimeout(resetHealthBars, 2000);
            }
        }, 300);
    }
    
    function resetHealthBars() {
        const leftHealth = document.querySelector('.health-bar.left .health-fill');
        const rightHealth = document.querySelector('.health-bar.right .health-fill');
        
        leftHealth.style.width = '80%';
        rightHealth.style.width = '65%';
        
        setTimeout(animateHealthBars, 1000);
    }
    
    // Start health bar animation after fight modal
    document.getElementById('fightModal').addEventListener('shown.bs.modal', function() {
        setTimeout(animateHealthBars, 1500);
    });

    // Form submission
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const agreeCheckbox = this.querySelector('input[type="checkbox"]');
            
            if (!nameInput.value || !emailInput.value || !agreeCheckbox.checked) {
                alert('Please fill in all required fields and agree to the terms.');
                return;
            }
            
            // Show success message
            alert('Registration successful! We look forward to seeing you at the hackathon.');
            this.reset();
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-card, .prize-card, .special-prize, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.about-card, .prize-card, .special-prize').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    document.querySelectorAll('.timeline-item').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = index % 2 === 0 ? 'translateX(50px)' : 'translateX(-50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});