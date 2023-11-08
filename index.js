const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');

app.use(express.json());

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

app.get('/estates', (req, res) => {
  fs.readFile('./src/scripts/Dependencies/estates.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read data file' });
    } else {
      try {
        const dataset = JSON.parse(data);
        res.json(dataset);
      } catch (parseError) {
        console.error(parseError);
        res.status(500).json({ error: 'Failed to parse JSON data' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
