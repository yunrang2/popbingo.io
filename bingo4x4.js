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
    const bingoBoard = document.getElementById('bingo-board');
    const randomNumberDisplay = document.getElementById('random-number');
    const randomNumberButton = document.getElementById('random-number-button');
    const remainingCountDisplay = document.getElementById('remaining-count');
    const popup = document.getElementById('popup');
    const winText = document.getElementById('win-text');
    const doubleOrNothingButton = document.getElementById('double-or-nothing');
    const retryButton = document.getElementById('retry');
    const backButton = document.getElementById('back-button');

    let remainingCount = 10;
    const numbers = Array.from({ length: 16 }, (_, i) => i + 1);
    let selectedNumbers = [];
    let selectedCells = new Set();

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBingoBoard() {
        shuffle(numbers);
        bingoBoard.innerHTML = '';
        numbers.forEach(num => {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.textContent = num;
            cell.addEventListener('click', () => handleCellClick(cell, num));
            bingoBoard.appendChild(cell);
        });
    }

    function handleCellClick(cell, num) {
        if (!selectedCells.has(cell) && remainingCount > 0) {
            selectedCells.add(cell);
            cell.classList.add('clicked');
            remainingCount--;
            remainingCountDisplay.textContent = remainingCount;
            checkWin();
            if (remainingCount === 0) {
                showPopup();
            }
        }
    }

    function generateRandomNumber() {
        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * 16) + 1;
        } while (selectedNumbers.includes(randomNum));
        selectedNumbers.push(randomNum);
        randomNumberDisplay.textContent = randomNum;
    }

    function checkWin() {
        const cells = Array.from(bingoBoard.children);
        const rows = Array.from({ length: 4 }, () => []);
        const cols = Array.from({ length: 4 }, () => []);
        const diagonals = [[], []];

        cells.forEach((cell, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            if (cell.classList.contains('clicked')) {
                rows[row].push(cell);
                cols[col].push(cell);
                if (row === col) diagonals[0].push(cell);
                if (row + col === 3) diagonals[1].push(cell);
            }
        });

        const winLines = [...rows, ...cols, ...diagonals].filter(line => line.length === 4);
        if (winLines.length > 0) {
            winText.innerHTML = `${winLines.length} 줄이 완성되었습니다!`;
        }
    }

    function showPopup() {
        checkWin();
        popup.classList.remove('hidden');
    }

    function resetGame() {
        selectedNumbers = [];
        selectedCells = new Set();
        remainingCount = 10;
        remainingCountDisplay.textContent = remainingCount;
        randomNumberDisplay.textContent = '';
        popup.classList.add('hidden');
        createBingoBoard();
    }

    randomNumberButton.addEventListener('click', generateRandomNumber);
    doubleOrNothingButton.addEventListener('click', resetGame);
    retryButton.addEventListener('click', () => window.location.href = 'index.html');
    backButton.addEventListener('click', () => window.location.href = 'index.html');

    createBingoBoard();
});
