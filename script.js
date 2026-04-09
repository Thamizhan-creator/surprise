document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for fade-in animations on scroll
    const sections = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 2. Surprise Button Logic
    const surpriseBtn = document.getElementById("surprise-btn");
    const surpriseMessage = document.getElementById("surprise-message");

    surpriseBtn.addEventListener("click", () => {
        surpriseBtn.style.display = "none";
        surpriseMessage.classList.remove("hidden");
        surpriseMessage.classList.add("show");
        createConfetti(); // Play confetti around the message
    });

    // 3. Floating Hearts Generation
    const heartsContainer = document.getElementById("hearts-container");
    
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        
        // Randomize properties
        const startPos = Math.random() * 100;
        const duration = Math.random() * 5 + 7; // 7s to 12s
        const size = Math.random() * 15 + 10; // 10px to 25px
        
        heart.style.left = `${startPos}vw`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${size}px`;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Generate hearts continuously
    setInterval(createHeart, 800);
    
    // Initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, Math.random() * 2000);
    }

    // 4. Background Music Handling
    const bgMusic = document.getElementById("bg-music");
    const startBtn = document.getElementById("start-btn");
    
    startBtn.addEventListener("click", () => {
        if(bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            startBtn.innerHTML = "Music Playing 🎵";
            startBtn.style.opacity = "0.7";
        }
    });

    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement("div");
            confetti.style.position = "absolute";
            confetti.style.width = "10px";
            confetti.style.height = "10px";
            confetti.style.backgroundColor = Math.random() > 0.5 ? "#d4af37" : "#ff85a2";
            
            // Start from center of screen roughly
            confetti.style.left = (innerWidth / 2) + "px";
            confetti.style.top = (innerHeight / 2) + "px";
            confetti.style.borderRadius = "50%";
            confetti.style.zIndex = "100";
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 10 + Math.random() * 15;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity;
            let gravity = 0.5;
            
            heartsContainer.appendChild(confetti);
            
            function updateConfetti() {
                vy += gravity;
                let top = parseFloat(confetti.style.top);
                let left = parseFloat(confetti.style.left);
                confetti.style.top = (top + vy) + "px";
                confetti.style.left = (left + vx) + "px";
                
                if (top < innerHeight) {
                    requestAnimationFrame(updateConfetti);
                } else {
                    confetti.remove();
                }
            }
            requestAnimationFrame(updateConfetti);
        }
    }
});
