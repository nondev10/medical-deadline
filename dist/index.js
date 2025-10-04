window.onload = function() {
    const time = document.getElementById('time');
    const target = new Date(2026, 5, 19, 0, 0, 0);  // 2026年6月19日 00:00:00

    setInterval(() => {
        const now = new Date();
        const diff = target - now;
        if(diff >= 0) {
            time.innerText = target - now;
        }
        else
        {
            time.innerText = 0;
        }
    }, 1);
    
    // Copyright Update
    const startYear = 2025;
    const nowYear = new Date().getFullYear();
    document.getElementById('copyright').textContent =
        nowYear > startYear
            ? `${startYear}-${nowYear} © Copyright ShiHao`
            : `${startYear} © Copyright ShiHao`;

    // Mouse Drive Offset
    const titContainer = document.getElementsByClassName('tit-container')[0];
    const container = document.getElementById('parallaxContainer');
    const layers = document.querySelectorAll('.parallax-layer');

    const layerFactors = [0.05, 0.15, 0.25, 0.35];

    function handleLeave() {
        layers.forEach(layer => {
            layer.style.transform = 'translate3d(0, 0, 0) scale(1)';
            layer.style.transition = 'transform 0.7s ease-out';

            setTimeout(() => {
                layer.style.transition = '';
            }, 700);
        });
    }

    titContainer.addEventListener('mousemove', function(e) {
        if (e.target !== titContainer) {
            handleLeave();
            return;
        };

        const mouseX = e.clientX / container.clientWidth;
        const mouseY = e.clientY / container.clientHeight;

        const offsetX = (mouseX - 0.5) * 2;
        const offsetY = (mouseY - 0.5) * 2;

        layers.forEach((layer, index) => {
            const layerX = offsetX * layerFactors[index] * -1;
            const layerY = offsetY * layerFactors[index] * -1;
            console.log(layer, `translate3d(${layerX * 100}px, ${layerY * 100}px, 0)`);

            layer.style.transform = `translate3d(${layerX * 100}px, ${layerY * 100}px, 0)`;
        });
    });

    titContainer.addEventListener('mouseleave', handleLeave);
};
