const express = require('express');
const { Command } = require('commander');
const path = require('path');

// Створення об'єкта програми за допомогою Commander.js
const program = new Command();
program
  .requiredOption('-h, --host <host>', 'address of the server') // обовʼязковий параметр для хоста
  .requiredOption('-p, --port <port>', 'port of the server') // обовʼязковий параметр для порту
  .requiredOption('-c, --cache <cache>', 'path to the directory for cached files') // обовʼязковий параметр для кешу
  .parse(process.argv);

// Отримання параметрів командного рядка
const { host, port, cache } = program.opts();

// Перевірка на відсутність обов'язкових параметрів
if (!host || !port || !cache) {
  console.error('Error: Missing required parameters!');
  program.help(); // Показує допомогу для правильного використання програми
  process.exit(1); // Завершує програму з кодом помилки
}

// Створення екземпляра Express.js
const app = express();

// Налаштування кешу
const cacheDir = path.resolve(cache);
console.log(`Cache directory: ${cacheDir}`);

// Основний маршрут для перевірки роботи сервера
app.get('/', (req, res) => {
  res.send('Welcome to the Notes API');
});

// Запуск сервера
app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});


