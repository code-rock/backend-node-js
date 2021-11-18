const app = require('express')();
const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'localhost';
const client = redis.createClient(6379, 'redis');

const PORT = process.env.PORT || 3000;

client.on('error', function(err) {
     console.log('Redis error: ' + err);
});

app.post('/counter/:bookId/incr', (req, res) => {
    const { bookId } = req.params;
    client.incr(bookId, (err, rep) => {
        console.log("err", err);
        console.log("rep", err)
        if (err) {
            console.log('Ошибка')
            res.status(500).json({ err: `Ошибка редиса: ${err.message}`})
        } else {
            console.log(`Просмотр книги ${bookId}!`);
            res.json({ result: `Запрос от ${bookId} обработан.`, counter: rep });
        }
    })
})

app.get('/counter/:bookId', (req, res) => {
    const { bookId } = req.params;
    client.get(bookId, (err, val) => {
        if (err) {
            res.status(500).json({ err: `Ошибка счетчика: ${err.message}`})
        }
        if (val === null) {
            res.json({ result: `Запрос от ${bookId} обработан.`, counter: 0 });
        } else {
            res.json({ result: `Запрос от ${bookId} обработан.`, counter: JSON.parse(val) });
        }
    })
    return;
})

app.listen(PORT, '0.0.0.0');

console.log(`Сервер слушает порт: ${PORT}`);