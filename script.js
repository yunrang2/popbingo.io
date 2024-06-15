// script.js

document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.getElementById('button-container');
    const footerText = document.getElementById('footer-text');
    const footer = document.getElementById('footer');
    const messages = [
        'made by a 죽돌',
        '미션판 등 게임 제작 문의는 카카오톡 <span class="highlight">v_remind2</span>'
    ];

    let messageIndex = 0;
    setInterval(() => {
        footer.classList.add('fade-out');
        setTimeout(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            footerText.innerHTML = messages[messageIndex];
            footer.classList.remove('fade-out');
            footer.classList.add('fade-in');
        }, 1000); // 1 second for fade-out
    }, 10000); // 10000ms = 10 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.getElementById('button-container');

    buttonContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('size-button')) {
            const size = event.target.dataset.size;
            if (size === '5') {
                window.location.href = 'bingo5x5.html';
            } else if (size === '3') {
                window.location.href = 'bingo3x3.html';
            }
        }
    });
});
