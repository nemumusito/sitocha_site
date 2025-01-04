document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を解除
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // パーティクル効果の追加
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'background-particle';
        
        // ランダムな位置と大きさを設定
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // アニメーションの持続時間をランダムに
        const duration = Math.random() * 10 + 5;
        particle.style.animation = `floatParticle ${duration}s infinite linear`;
        
        document.body.appendChild(particle);
        
        // アニメーション終了後に要素を削除
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    };

    // 定期的にパーティクルを生成
    setInterval(createParticle, 2000);
});