const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000; // Укажите порт для сервера

const server = http.createServer((req, res) => {
    // Устанавливаем путь к файлу
    let filePath = path.join(
        __dirname,
        req.url === '/' ? 'index.html' : req.url
    );

    // Определяем тип контента
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.woff':
            contentType = 'font/woff';
            break;
        case '.woff2':
            contentType = 'font/woff2';
            break;
        case '.ttf':
            contentType = 'font/ttf';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }

    // Если расширение не указано, добавляем .html
    if (!extname && req.url !== '/') {
        filePath += '.html';
    }

    // Читаем файл
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Если файл не найден, показываем 404
                fs.readFile(
                    path.join(__dirname, '404.html'),
                    (error, errorContent) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(errorContent || '404 Not Found', 'utf-8');
                    }
                );
            } else {
                // Любая другая ошибка
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Если файл найден, возвращаем его
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Запуск сервера
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
