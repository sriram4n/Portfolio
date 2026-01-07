/* Secret Code: 'vaish' */
const secretCode = 'vaish';
let inputBuffer = '';

document.addEventListener('keydown', (e) => {
    inputBuffer += e.key.toLowerCase();

    if (inputBuffer.length > secretCode.length) {
        inputBuffer = inputBuffer.slice(-secretCode.length);
    }

    if (inputBuffer === secretCode) {
        showHeart();
        inputBuffer = ''; // Reset after triggering
    }
});

function showHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-popup');
    heart.innerHTML = '❤️'; // Or use an SVG if preferred
    document.body.appendChild(heart);

    // Remove after animation (adjust time to match CSS)
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

/* Click Speed Logic */
let clickCount = 0;
let lastClickTime = 0;
const CLICK_TIMEOUT = 1000; // Reset if idle too long
const REQUIRED_CPS_INTERVAL = 250; // 4 clicks per second = 250ms

document.addEventListener('click', (e) => {
    // Ignore clicks on interactive elements
    if (e.target.closest('a, button, input, textarea, .project, .skill')) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickTime;

    // Reset if too slow
    if (timeDiff > CLICK_TIMEOUT) {
        clickCount = 0;
    }

    clickCount++;
    lastClickTime = currentTime;

    const tooltip = document.createElement('div');
    tooltip.classList.add('click-tooltip');

    // Position near cursor
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.top = `${e.pageY}px`;

    if (clickCount === 1) {
        tooltip.textContent = 'click again';
        document.body.appendChild(tooltip);
    } else if (clickCount === 2) {
        if (timeDiff <= REQUIRED_CPS_INTERVAL) {
            tooltip.textContent = 'faster';
            tooltip.style.color = '#d00000'; // Urgency color
            document.body.appendChild(tooltip);
        } else {
            // Restart logic if second click was slow
            clickCount = 1;
            tooltip.textContent = 'click again';
            document.body.appendChild(tooltip);
        }
    } else if (clickCount >= 3) {
        if (timeDiff <= REQUIRED_CPS_INTERVAL) {
            window.location.href = 'https://games.sriram4n.com';
        } else {
            // Slowed down
            clickCount = 1;
            tooltip.textContent = 'click again';
            document.body.appendChild(tooltip);
        }
    }

    // Remove tooltip quickly
    setTimeout(() => {
        tooltip.remove();
    }, 800);
});
