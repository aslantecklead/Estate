const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const fetch = require('node-fetch');

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

let dataset;

function getDataset() {
  return dataset;
}

app.get('/estatelist', async (req, res) => {
  try {
    const data = fs.readFileSync('./src/scripts/Dependencies/GetSearchPageState.json', 'utf8');
    dataset = JSON.parse(data);
    res.json(dataset);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read or parse JSON data' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});


