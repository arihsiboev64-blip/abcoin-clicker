let balance = 0;
let energy = 1000;
let tapPower = 1;

const balanceEl = document.getElementById('balance');
const energyEl = document.getElementById('energy');
const coinEl = document.getElementById('main-coin');
const buyBtn = document.getElementById('buy-upgrade');

coinEl.addEventListener('click', () => {
    if (energy > 0) {
        balance += tapPower;
        energy -= 1;
        balanceEl.innerText = balance;
        energyEl.innerText = `${energy} / 1000`;
    }
});

buyBtn.addEventListener('click', () => {
    if (balance >= 100) {
        balance -= 100;
        tapPower += 1;
        balanceEl.innerText = balance;
        alert("Улучшено!");
    } else {
        alert("Мало монет!");
    }
});
