document.addEventListener('DOMContentLoaded', () => {
    generateRandomImages(); // 页面加载后立即生成随机图片
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        generateRandomImages(); // 按下空格键时生成新的随机图片
    }
});

function generateRandomImages() {
    const container = document.querySelector('.white-section');
    const imagesCount = 8;
    const displayCount = Math.floor(Math.random() * 5) + 3;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const usedPositions = [];
    const images = Array.from({ length: imagesCount }, (_, i) => `assets/images/${i + 1}.png`);

    container.innerHTML = ''; // 清空之前的图片

    for (let i = 0; i < displayCount; i++) {
        const img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * imagesCount)];

        let validPosition = false;
        let x, y;
        while (!validPosition) {
            x = Math.random() * (containerWidth - 200);
            y = Math.random() * (containerHeight - 200);
            validPosition = !usedPositions.some(pos => Math.hypot(pos.x - x, pos.y - y) < 200);
        }
        usedPositions.push({ x, y });

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        // 添加拖动功能
        img.draggable = false;
        img.addEventListener('mousedown', startDrag);
        container.appendChild(img);
    }
}

function startDrag(event) {
    const img = event.target;
    const container = document.querySelector('.white-section');
    const containerRect = container.getBoundingClientRect();
    let shiftX = event.clientX - img.getBoundingClientRect().left;
    let shiftY = event.clientY - img.getBoundingClientRect().top;

    function onMouseMove(e) {
        let newLeft = e.clientX - containerRect.left - shiftX;
        let newTop = e.clientY - containerRect.top - shiftY;

        // 限制图片在容器内移动
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - img.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, containerRect.height - img.offsetHeight));

        img.style.left = `${newLeft}px`;
        img.style.top = `${newTop}px`;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// 禁用所有图片的默认拖动行为
document.addEventListener('dragstart', (e) => e.preventDefault());
