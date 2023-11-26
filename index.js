const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
// const fetch = require('node-fetch');

app.use(express.json());

app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
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


