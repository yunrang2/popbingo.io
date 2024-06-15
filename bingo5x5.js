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

// bingo.js

document.addEventListener('DOMContentLoaded', () => {
    const bingoBoard = document.getElementById('bingo-board');
    const remainingCountElem = document.getElementById('remaining-count');
    const popup = document.getElementById('popup');
    const winText = document.getElementById('win-text');
    const doubleOrNothingButton = document.getElementById('double-or-nothing');
    const retryButton = document.getElementById('retry');
    const randomNumberElem = document.getElementById('random-number');
    const randomNumberButton = document.getElementById('random-number-button');
    let remainingCount = 13;
    let generatedNumbers = [];

    // 초기 빙고판 생성
    createBingoBoard();

    function createBingoBoard() {
        bingoBoard.innerHTML = ''; // 빙고판 초기화
        const numbers = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
        numbers.forEach((number) => {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.textContent = number;
            cell.addEventListener('click', handleCellClick);
            bingoBoard.appendChild(cell);
        });
        remainingCount = 13;
        remainingCountElem.textContent = remainingCount;
        generatedNumbers = [];
        randomNumberElem.textContent = '';
        popup.classList.add('hidden'); // 팝업 숨기기
    }

    function handleCellClick(event) {
        const cell = event.target;
        if (!cell.classList.contains('clicked') && remainingCount > 0) {
            cell.classList.add('clicked');
            remainingCount--;
            remainingCountElem.textContent = remainingCount;
            checkBingo();
        }
        if (remainingCount === 0) {
            showPopup();
        }
    }

    function checkBingo() {
        const cells = Array.from(bingoBoard.getElementsByClassName('bingo-cell'));
        const size = 5;
        let lines = 0;

        // 가로 줄 체크
        for (let i = 0; i < size; i++) {
            if (cells.slice(i * size, i * size + size).every(cell => cell.classList.contains('clicked'))) {
                lines++;
                cells.slice(i * size, i * size + size).forEach(cell => cell.style.border = '2px solid red');
            }
        }

        // 세로 줄 체크
        for (let i = 0; i < size; i++) {
            if (cells.filter((_, index) => index % size === i).every(cell => cell.classList.contains('clicked'))) {
                lines++;
                cells.filter((_, index) => index % size === i).forEach(cell => cell.style.border = '2px solid red');
            }
        }

        // 대각선 체크
        if (cells.filter((_, index) => index % (size + 1) === 0).every(cell => cell.classList.contains('clicked'))) {
            lines++;
            cells.filter((_, index) => index % (size + 1) === 0).forEach(cell => cell.style.border = '2px solid red');
        }

        if (cells.filter((_, index) => index % (size - 1) === 0 && index !== 0 && index !== cells.length - 1).every(cell => cell.classList.contains('clicked'))) {
            lines++;
            cells.filter((_, index) => index % (size - 1) === 0 && index !== 0 && index !== cells.length - 1).forEach(cell => cell.style.border = '2px solid red');
        }

        return lines;
    }

    function showPopup() {
        const lines = checkBingo();
        winText.textContent = `${lines} 줄이 완성되었습니다!`;
        popup.classList.remove('hidden');
    }

    randomNumberButton.addEventListener('click', () => {
        let number;
        do {
            number = Math.floor(Math.random() * 25) + 1;
        } while (generatedNumbers.includes(number));
        generatedNumbers.push(number);
        randomNumberElem.textContent = number;
    });

    doubleOrNothingButton.addEventListener('click', () => {
        popup.classList.add('hidden');
        createBingoBoard();
    });

    retryButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
