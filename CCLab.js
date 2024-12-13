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
document.addEventListener('DOMContentLoaded', () => {
    // 获取弹窗元素和触发按钮
    const popup = document.getElementById('popup');
    const trigger = document.getElementById('trigger-popup');
    const closeButton = document.querySelector('.close-btn');

    // 确保弹窗隐藏（防止意外显示）
    popup.style.display = 'none';

    // 点击触发按钮时显示弹窗
    trigger.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止默认行为
        popup.style.display = 'block'; // 显示弹窗
    });

    // 点击关闭按钮时隐藏弹窗
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none'; // 隐藏弹窗
    });

    // 点击弹窗外部时隐藏弹窗
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none'; // 隐藏弹窗
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const iframe = document.getElementById('popup-iframe');
    const description = document.getElementById('popup-description');
    const closeButton = document.querySelector('.close-btn');

    // 数据对象，存储每个图片对应的内容
    const popupData = {
        "popup-9": {
            iframeSrc: "https://editor.p5js.org/yangl212/full/UIST47KVC",
            description: `
                <h1>Exquisite Corpse</h1>
                <h2>Partners’ names</h2>
                <p>Jack & Claire</p>
                <h2>Design process</h2>
                <p>First I get the image from my partner, I think it really suit to be a Magicians and fortune tellers which possess the mystical ability to explore the human mind。 Therefore, I designed his outfit in the style of a grand wizard's robe, and I transformed the crystal ball in his hand into a glowing magic orb. Additionally, I wanted to add some interactivity, so my inspiration came from the game 'Turtle Soup,' which is a story-guessing game.</p>
                <h2>A new background story</h2>
                <p>Hello, I am a fortune teller with powerful insight. You can ask me any question, and I will provide you with answers.</p>
                <h2>Reflection</h2>
                <p>I believe that the functionality of p5.js is incredibly powerful, especially in the aspect of user-defined functions, which is something I hadn't learned when using Processing before. It helps me handle complex features more easily, and I'm no longer limited by what I've learned and can create based on that, but rather by what I want to make, and then finding out how to do it. This has greatly increased my interest in creating.
</p>
            `
        },
        "popup-10": {
            iframeSrc: "https://editor.p5js.org/yangl212/full/rjXnwa0cy",
            description: `
                <h1>Experimental clock</h1>
                <h2>Metronome</h2>
                <p>This is a metronome, which is actually quite common in everyday life, especially for those learning music. It works by changing the BPM (beats per minute) and using division to recalculate the distribution of the rhythm.The metronome primarily represents rhythm, and in fact, people don't often associate it with the passage of time.</p>
                <h2>Idea</h2>
                <p>In my design, I had three ideas. <br>The first was the Chinese time unit 'xun（旬）'.I quite like this idea, but unfortunately, I couldn't figure out how to combine it with visual elements, which was very difficult. So, I had to give it up.

<br>The second was to represent the passage of time through the burning of a candle, By lighting a candle, the candle gradually melts until nothing remains on the screen, serving as a clock.

<br>The third is the final presentation for this assignment. I chose the metronome because I feel it is a common element in our daily lives but is often easily overlooked.</p>
                <h2>Reflection</h2>
                <p>I didn't manage to implement the feature of notes appearing multiple times, nor did I achieve the fade-in and fade-out effect. However, I am still very happy that the main metronome and piano functions were successfully implemented.
<br>The most challenging part of this assignment, in my opinion, was the swinging clock. It required using a piece of code that I hadn't learned yet, but I found it in the tutorials. I'm very thankful for the built-in tutorial library in p5, it has saved me so many times.
</p>
            `
        },
        "popup-11": {
            iframeSrc: "https://editor.p5js.org/yangl212/full/JMNbpXL7q",
            description: `
                <h1>Lost&found</h1>
                <h2>Partner:Rex Jiang</h2>
                <p>The language your partner used to describe the image:Lost & find - The lost item of mine was a par of shades that thethe lenses were triangular and black in color,templeswere slender and in black color as well because it wasa sporty sunglasses.</p>
                <h2>My interpretation of the image</h2>
                <p>think it sounds like a very cool sunglasses that might be exaggerated in the showroom</p>
                <h2>The differences</h2>
                <p>At first I was just going to draw a simple triangle of glasses, but I found that adding shading to the image made it more three-dimensional, so I turned it to 3/4 side.</p>
            `
        },
        "popup-12": {
            iframeSrc: "https://editor.p5js.org/yangl212/full/4BBURusQW",
            description: `
                <h1>Autobiographical Game</h1>
                <h2>Proposal</h2>
                <p>I want to create a choice-based game, similar to Japanese "RPG" decision-making games. Players make different choices and get different outcomes, with no chance to  redo their choices (unless they restart the game)—just like life. The game will include small clues and red herrings. For example: if the player has to go to school today, they should choose the school uniform instead of a princess dress. Initially, I wanted to make it a critical game about school bullying, but this would require a high level of dialogue and scriptwriting to effectively convey my core message, which seems difficult to achieve in a short time. So, I’ve simplified it into a “Happy Birthday” game for now.</p>
                <h2>Storyboard</h2>
                <p>Today is your birthday. After waking up, you can choose what clothes you want to wear to school. When you arrive at school, you can find the lady selling balloons to receive her "Happy Birthday" wishes, or you can look for the grandfather hidden in the corner—he will give you a mysterious gift.</p>
                <h2>Assignment reflections</h2>
                <p>During the development process, I found it really challenging. Especially because the different effects tend to influence one another. For example, I originally wanted the grandfather in the corner to have a dialogue with the player's character upon meeting, or to display the gift in the center of the screen before it disappeared. However, these appearances and disappearances ended up affecting the player's ability to move the character afterward, and I couldn’t solve this issue. As a result, I didn’t implement this feature in the end.<br>I think using a professional game engine could make it faster to create a simple pixel-style choice-based game. However, through this programming experience, I learned a lot, including how to transition between scenes.</p>
            `
        },
        "popup-13": {
            iframeSrc: "https://editor.p5js.org/yangl212/full/BbvqtYqyf",
            description: `
                <h1>Optical Illusion</h1>
                <h2>Background</h2>
                <p>Base on Grid Illusion, I hope that when people see this pattern, they will feel that the horizontal squares are not parallel lines. However, all of my squares are actually interlaced in parallel.</p>
                <h2>Describe the process</h2>
                <p>For the design, I used a grid-based layout with alternating colors and small diamond-shaped elements, which help create the illusion. The key was finding the right spacing between shapes to make the pattern appear balanced but also visually intriguing.</br>Fine-tuning involved adjusting the position of shapes and testing how the illusion appeared when the mouse was pressed or released. I also played with different color combinations, which are essential for creating contrast and enhancing the illusion’s effect. By testing and refining the code, I was able to ensure that the illusion was consistent across different parts of the canvas.
</p>
            `
        },
        "popup-14": {
            iframeSrc: "https://editor.p5js.org/yangl212/full/VthTK5vNd",
            description: `
                <h1>Face Generator</h1>
                <h2>What have you discovered about the form you've chosen through this assignment?</h2>
                <p>I find that p5.js and processing have a lot of similarities in common. And I really like the tutorials which I can find at the home page. When I have a idea but don't know how to write code, I can find what I want in there.

</br>To be honest, it took me two days to figure out the eye-following-mouse, I read the examples of others. Mathematic hasn't been used by me in about four years.

</br>Oops,I forgot to use random...At frist I use random for background but it's flashing too fast. So I use "map" follow the mouse to change background color. 
</br>I add random to shake the "💢" to make the cat seem more angry hhh.</p>
            `
        },
        "popup-15": {
            iframeSrc: "https://editor.p5js.org/yangl212/full/rOm-3p3n0",
            description: `
                <h1>Data Portrait</h1>
                <h2>A description of your Data Portrait. What was the personal habit you were trying to track?</h2>
                <p>The habit I tracked was checking the PM2.5 value in the weather forecast.I have the habit of checking the weather forecast every day, but most of the time, I’m actually looking at the temperature. This time, I chose to focus on the air quality at different times because I think it’s a very interesting value. The reason is that it not only reflects the actual air quality but also gives us underlying information, such as when there are more cars in a certain area, leading to higher air pollution.</p>
                <h2>An instruction for the viewers on how to read your data portrait.</h2>
                <p>In the code, as time progresses, the PM2.5 levels for the next time point will appear. When PM2.5 is greater than 2μg/m³, it will turn red as a warning, and when it is less, it will be blue. This change is intended to alert the viewer that the PM2.5 levels are high during this time period and they should take protective measures.</p>
                <h2>Describe your design process. </h2>
                <p>I recorded the air quality from 3 AM on 10/15 to 10/16 at one-hour intervals by checking both my phone and the IQAir website. In the data, we can see clear fluctuations, with higher values generally occurring between 7-9 AM and 5-9 PM. This suggests that during these times, there are more commuters, and the traffic on the streets is heavier.
At the bottom, I marked the specific date and time, and in the center of the circle, I labeled the detailed PM2.5 data.
</p>
            `
        },

        // Add entries for popup-11, popup-12, ..., popup-15
    };

    // 打开弹窗
    document.querySelectorAll('.image-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const popupId = link.getAttribute('data-popup');
            const data = popupData[popupId];

            if (data) {
                iframe.src = data.iframeSrc; // 更新 iframe
                description.innerHTML = data.description; // 更新描述
                popup.style.display = 'block'; // 显示弹窗
            }
        });
    });

    // 关闭弹窗
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
        iframe.src = ''; // 清空 iframe
    });

    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
            iframe.src = ''; // 清空 iframe
        }
    });
});

