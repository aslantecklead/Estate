const express = require('express');
const app = express();
const port = 3001;

const db = require('./src/scripts/database');

app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.get('/properties', (req, res) => {
  db.getProperties((err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
