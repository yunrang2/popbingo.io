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
    const coinSound = document.getElementById('coin-sound');
    
    const playCoinAndNavigate = (url) => {
        coinSound.play();
        setTimeout(() => {
            sessionStorage.setItem('navigateTo', url);
            window.location.href = 'loading.html';
        }, 300); // 소리가 끝난 후 페이지 이동을 위해 약간의 딜레이를 줌
    };

    document.getElementById('button-3x3').addEventListener('click', () => {
        playCoinAndNavigate('bingo3x3.html');
    });

    document.getElementById('button-4x4').addEventListener('click', () => {
        playCoinAndNavigate('bingo4x4.html');
    });

    document.getElementById('button-5x5').addEventListener('click', () => {
        playCoinAndNavigate('bingo5x5.html');
    });
});
