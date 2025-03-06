const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware для обработки JSON
app.use(express.json());

// Указываем, что статические файлы (HTML, CSS, JS) находятся в папке "public"
app.use(express.static(path.join(__dirname, 'public')));

// Хранение данных
let analyticsData = [];

// Маршрут для сбора данных
app.post('/track', (req, res) => {
    const userIp = req.ip; // Получаем IP-адрес пользователя
    const actionData = req.body; // Данные о действии

    // Сохраняем данные
    analyticsData.push({
        ip: userIp,
        action: actionData.action,
        page: actionData.page,
        timestamp: new Date(),
    });

    res.sendStatus(200);
});

// Маршрут для получения IP-адреса пользователя
app.get('/get-ip', (req, res) => {
    const userIp = req.ip; // Получаем IP-адрес пользователя
    res.json({ ip: userIp });
});

// Маршрут для просмотра аналитики
app.get('/analytics', (req, res) => {
    res.json(analyticsData);
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});