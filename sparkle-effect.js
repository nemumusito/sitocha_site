document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-wrapper');
    const sparkleCount = 30;

    for (let i = 0; i < sparkleCount; i++) {
        createSparkle(header);
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', createPuddingExplosion);
    }
});

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    const size = Math.random() * 8 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    
    sparkle.style.animationDuration = `${Math.random() * 2 + 2}s`;
    sparkle.style.animationDelay = `${Math.random() * 4}s`;

    // Adjust color to be more white
    const hue = Math.random() * 60 + 30; // 30 to 90 (yellow to orange range)
    const saturation = Math.random() * 30 + 10; // 10% to 40% saturation
    const lightness = Math.random() * 20 + 80; // 80% to 100% lightness
    sparkle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    container.appendChild(sparkle);

    sparkle.addEventListener('animationiteration', () => {
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
    });
}

function createPuddingExplosion(event) {
    event.preventDefault();

    const explosion = document.createElement('div');
    explosion.className = 'pudding-explosion';
    document.body.appendChild(explosion);

    const rect = event.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const puddingCount = 8; // Increased count for more randomness
    for (let i = 0; i < puddingCount; i++) {
        const pudding = document.createElement('img');
        pudding.className = 'pudding-particle';
        
        const puddingNumber = Math.floor(Math.random() * 5) + 1;
        pudding.src = `img/pudding${puddingNumber}.png`;
        
        // Random angle and distance for more chaotic movement
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 80; // Random distance between 40 and 120
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        pudding.style.left = `${centerX}px`;
        pudding.style.top = `${centerY}px`;
        pudding.style.setProperty('--tx', `${tx}px`);
        pudding.style.setProperty('--ty', `${ty}px`);
        
        // Random rotation
        const rotation = Math.random() * 720 - 360; // Random rotation between -360 and 360 degrees
        pudding.style.setProperty('--rotation', `${rotation}deg`);
        
        // Random duration and delay for more natural movement
        pudding.style.animationDuration = `${1 + Math.random() * 1}s`;
        pudding.style.animationDelay = `${Math.random() * 0.2}s`;
        
        // Random scale
        const scale = 0.2 + Math.random() * 0.6; // Random scale between 0.2 and 0.8
        pudding.style.transform = `scale(${scale})`;
        
        // Add some randomness to the trajectory
        const bezierX = Math.random() * 100 - 50;
        const bezierY = Math.random() * 100 - 50;
        pudding.style.setProperty('--bezier-x', `${bezierX}px`);
        pudding.style.setProperty('--bezier-y', `${bezierY}px`);
        
        explosion.appendChild(pudding);
    }

    setTimeout(() => {
        explosion.style.transition = 'opacity 0.5s';
        explosion.style.opacity = '0';
        setTimeout(() => {
            explosion.remove();
        }, 500);
    }, 2000); // Increased timeout to match potentially longer animations
}