const tg = window.Telegram.WebApp;
tg.expand(); // Открываем приложение на весь экран

// Переменные игрока
let balance = 0;
let energy = 1000;
let tapPower = 100;

// Элементы на странице
const balanceEl = document.getElementById('balance');
const energyEl = document.getElementById('energy');
const coinEl = document.getElementById('main-coin');
const usernameEl = document.getElementById('username');

// Устанавливаем имя из Телеграма
if (tg.initDataUnsafe.user) {
    usernameEl.innerText = tg.initDataUnsafe.user.first_name;
}

// Слушаем тапы по монете
coinEl.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Убираем стандартные задержки на телефонах
    
    // Перебираем все пальцы, которые коснулись экрана (поддержка мультитача!)
    for (let i = 0; i < e.changedTouches.length; i++) {
        if (energy >= tapPower) {
            balance += tapPower;
            energy -= tapPower;
            updateUI();
            showFloatingNumber(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
            
            // Включаем вибрацию телефона (Taptic Engine) при клике
            tg.HapticFeedback.impactOccurred('light');
        }
    }
});

function updateUI() {
    balanceEl.innerText = balance.toLocaleString();
    energyEl.innerText = energy;
}

// Создаем вылетающую цифру +100
function showFloatingNumber(x, y) {
    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    floatEl.innerText = `+${tapPower}`;
    
    // Немного смещаем, чтобы появлялось прямо под пальцем
    floatEl.style.left = `${x - 20}px`;
    floatEl.style.top = `${y - 20}px`;
    
    document.body.appendChild(floatEl);
    
    // Удаляем элемент через секунду, когда анимация закончится
    setTimeout(() => {
        floatEl.remove();
    }, 1000);
}

// Сообщаем ТГ, что приложение готово
tg.ready();