document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';

            // Show welcome speech and fight animation (speech handled inside)
            showWelcomeSpeech();
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
            this.style.transform = this.classList.contains('character-left') 
                ? 'translateX(-30px) scale(1.1)' 
                : 'translateX(30px) scale(1.1)';
        });
        character.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('character-left') 
                ? 'translateX(-50px)' 
                : 'translateX(50px)';
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

    // Welcome speech and fight animation
    function showWelcomeSpeech() {
        const speechElement = document.createElement('div');
        speechElement.className = 'tekken-speech';
        speechElement.innerHTML = `
            <div class="speech-bubble">
                <div class="speech-content">
                    <h3>Welcome to TEKKEN SHOWCASE 2K55!</h3>
                    <p>The ultimate battle of code and creativity begins now!</p>
                    <p class="fight-call">LET'S FIGHT!</p>
                </div>
            </div>
            <audio id="fightSound" src="fist-fight-192117.mp3" preload="auto"></audio>
        `;
        document.body.appendChild(speechElement);

        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(
                "Welcome to TEKKEN SHOWCASE 2K55! The ultimate battle of code and creativity begins now! LET'S FIGHT!"
            );
            speech.volume = 1;
            speech.rate = 0.9;
            speech.pitch = 0.8;

            const voices = window.speechSynthesis.getVoices();
            const tekkenVoice = voices.find(voice =>
                voice.name.includes('Microsoft David') ||
                voice.name.includes('Google US English') ||
                voice.lang.includes('en-US')
            );
            if (tekkenVoice) {
                speech.voice = tekkenVoice;
            }

            setTimeout(() => {
                speechElement.classList.add('show');
                window.speechSynthesis.speak(speech);

                speech.onboundary = function(event) {
                    if (event.charIndex > speech.text.indexOf("LET'S FIGHT!") - 10) {
                        const fightSound = document.getElementById('fightSound');
                        fightSound.volume = 0.7;
                        fightSound.play().catch(e => console.log("Audio play failed:", e));
                    }
                };

                setTimeout(() => {
                    speechElement.classList.remove('show');
                    setTimeout(() => {
                        speechElement.remove();
                        const fightModal = new bootstrap.Modal(document.getElementById('fightModal'));
                        fightModal.show();
                        document.getElementById('fightModal').addEventListener('shown.bs.modal', function() {
                            setTimeout(animateHealthBars, 1500);
                        });
                    }, 500);
                }, 4000);
            }, 100);
        } else {
            // Fallback
            setTimeout(() => {
                speechElement.classList.add('show');
                const fightSound = document.getElementById('fightSound');
                fightSound.volume = 0.7;
                fightSound.play().catch(e => console.log("Audio play failed:", e));
                setTimeout(() => {
                    speechElement.classList.remove('show');
                    setTimeout(() => {
                        speechElement.remove();
                        const fightModal = new bootstrap.Modal(document.getElementById('fightModal'));
                        fightModal.show();
                        document.getElementById('fightModal').addEventListener('shown.bs.modal', function() {
                            setTimeout(animateHealthBars, 1500);
                        });
                    }, 500);
                }, 3000);
            }, 100);
        }
    }

    // Form submission
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const agreeCheckbox = this.querySelector('input[type="checkbox"]');

            if (!nameInput.value || !emailInput.value || !agreeCheckbox.checked) {
                alert('Please fill in all required fields and agree to the terms.');
                return;
            }

            alert('Registration successful! We look forward to seeing you at the hackathon.');
            this.reset();
        });
    }

    // Animate elements on scroll
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
    animateOnScroll();

    // Resume speech on user interaction (Safari fix)
    document.addEventListener('click', () => {
        speechSynthesis.resume();
    }, { once: true });

    // Ensure voices are loaded
    let voicesLoaded = false;
    window.speechSynthesis.onvoiceschanged = () => { voicesLoaded = true; };
    if (window.speechSynthesis.getVoices().length > 0) {
        voicesLoaded = true;
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        let currentId = 'home'; // Default to 'home'

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < bottom) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            link.classList.toggle('active', targetId === currentId);
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Run once on load
});
// Show/hide button on scroll
window.onscroll = function () {
    const btn = document.getElementById('scrollToTopBtn');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Smooth scroll to top
document.getElementById('scrollToTopBtn').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
