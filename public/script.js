// Функция для получения IP-адреса
async function getIpAddress() {
    const response = await fetch('/get-ip');
    const data = await response.json();
    return data.ip;
}

// Отображение собранных данных
async function displayCollectedData() {
    const dataList = document.getElementById('collected-data-list');
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const language = navigator.language;
    const deviceType = /Mobi/.test(navigator.userAgent) ? "Мобильное устройство" : "Десктоп";
    const ipAddress = await getIpAddress(); // Получаем IP-адрес с сервера

    dataList.innerHTML = `
        <li>IP-адрес: ${ipAddress}</li>
        <li>Браузер и ОС: ${userAgent}</li>
        <li>Разрешение экрана: ${screenResolution}</li>
        <li>Язык браузера: ${language}</li>
        <li>Тип устройства: ${deviceType}</li>
        <li>Время на сайте: <span id="time-spent">0</span> сек</li>
    `;

    // Отслеживание времени на сайте
    let timeSpent = 0;
    setInterval(() => {
        timeSpent++;
        document.getElementById('time-spent').textContent = timeSpent;
    }, 1000);
}

// Инициализация карты
function initMap() {
    const map = L.map('map').setView([55.7558, 37.6176], 5); // Центр карты - Москва

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Пример маркера
    L.marker([55.7558, 37.6176]).addTo(map)
        .bindPopup('Пример местоположения')
        .openPopup();
}

// Скачивание данных
document.getElementById('download-data').addEventListener('click', async () => {
    const ipAddress = await getIpAddress(); // Получаем IP-адрес с сервера
    const data = {
        ip: ipAddress,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        deviceType: /Mobi/.test(navigator.userAgent) ? "Мобильное устройство" : "Десктоп",
        timeSpent: document.getElementById('time-spent').textContent,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-data.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Интерактивный пример
document.getElementById('collect-data').addEventListener('click', async () => {
    const ipAddress = await getIpAddress(); // Получаем IP-адрес с сервера
    const data = {
        ip: ipAddress,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        deviceType: /Mobi/.test(navigator.userAgent) ? "Мобильное устройство" : "Десктоп",
    };

    document.getElementById('request-example').textContent = JSON.stringify(data, null, 2);
});

// Режим инкогнито
document.getElementById('incognito-mode').addEventListener('change', (e) => {
    const isIncognito = e.target.checked;
    if (isIncognito) {
        alert('Режим инкогнито включен. Данные не будут отправляться на сервер.');
    }
});

// Загружаем данные при загрузке страницы
window.onload = () => {
    displayCollectedData();
    initMap();
};