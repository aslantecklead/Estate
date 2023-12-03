require('dotenv').config()

const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const jwt = require('jsonwebtoken');

// app.use(bodyParser.json());

app.use(express.json());

app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(__dirname + '/src/pages/index.html');
});


app.get('/auth', (req, res) => {
  res.sendFile(__dirname + '/Auth.html');
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

// app.listen(port, () => {
//   console.log(`Сервер запущен на порту ${port}`);
// });

app.listen(3001);