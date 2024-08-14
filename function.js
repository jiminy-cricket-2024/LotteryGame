document.addEventListener('DOMContentLoaded', () => {
    const chests = document.querySelectorAll('.treasure-chest');
    const tryAgainButton = document.getElementById('try-again');
    const winningsElement = document.getElementById('winnings');
    const tempValues = Array.from(document.querySelectorAll('.temp-value'));

    let winnerIndex;
    let winnings = 0;

    function getRandomAmount() {
        const isPositive = Math.random() > 0.5;
        const amount = (Math.random() * (5 - 1) + 1).toFixed(2);
        return isPositive ? parseFloat(amount) : -parseFloat(amount);
    }

    function resetGame() {
        tryAgainButton.style.display = 'none';
        chests.forEach(chest => {
            chest.classList.remove('open', 'disabled');
            chest.style.pointerEvents = 'auto';
        });

        winnerIndex = Math.floor(Math.random() * chests.length);
    }

    function flashWinnings() {
        winningsElement.classList.add('flash');
        setTimeout(() => {
            winningsElement.classList.remove('flash');
        }, 500);
    }

    function showTempValue(tempElement, value) {
        tempElement.textContent = `$${value.toFixed(2)}`;
        tempElement.style.display = 'block';
        setTimeout(() => {
            tempElement.style.display = 'none';
        }, 1000);
    }

    resetGame();

    chests.forEach((chest, index) => {
        chest.addEventListener('click', () => {
            if (!chest.classList.contains('disabled')) {
                const randomAmount = getRandomAmount();
                const tempValueElement = tempValues[index];
                showTempValue(tempValueElement, randomAmount);

                setTimeout(() => {
                    if (index === winnerIndex) {
                        chest.classList.add('open');
                        winnings += randomAmount;
                    } else {
                        chest.classList.add('open');
                        winnings -= randomAmount;
                    }

                    winningsElement.textContent = `$${winnings.toFixed(2)}`;
                    flashWinnings();
                    chests.forEach(c => c.classList.add('disabled'));
                    tryAgainButton.style.display = 'block';
                }, 1000);
            }
        });
    });
    tryAgainButton.addEventListener('click', resetGame);
});
