require('dotenv').config()

const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(express.json());

app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(__dirname + '/src/pages/index.html');
});

app.get('/ClientProperties', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(__dirname + '/src/pages/ClientProperties.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/src/pages/Registration.html');
});

app.get('/auth', (req, res) => {
  res.sendFile(__dirname + '/Auth.html');
});

app.get('/statistic', (req, res) => {
  res.sendFile(__dirname + '/pages/StatisticPage.html');
});

app.get('/current', (req, res) => {
  res.sendFile(__dirname + '/pages/StatisticPage.html');
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

app.get('/client/:id', (req, res) => {
  const userId = req.params.id; 

  connection.query('SELECT name FROM client WHERE id_client = ?', userId, (err, results) => {
    if (err) {
      console.error('Ошибка при запросе пользователя из базы данных:', err);
      return res.status(500).json({ error: 'Ошибка при запросе пользователя' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const userName = results[0].name;
    res.json({ name: userName }); 
  });
});

app.get('/estate/:zpid', async (req, res) => {
  const zpid = req.params.zpid;

  try {
    const response = await fetch(`http://localhost:3001/estatelist`);
    if (!response.ok) {
      throw new Error('Ошибка получения данных');
    }

    const estateList = await response.json();
    const estateData = estateList.find((item) => item.zpid === zpid);

    if (estateData) {
      res.json(estateData); 
    } else {
      res.status(404).json({ message: 'Недвижимость не найдена' });
    }
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
});

app.delete('/logout', (req, res) => {
  const refreshToken = req.body.token;
  const userId = req.body.userId; 
  res.sendStatus(204); 
});
// Admin 
app.get('/propertyData', (req, res) => {
  connection.query('SELECT * FROM AllPropertyData', (error, results, fields) => {
    if (error) {
      console.error('Ошибка при получении данных:', error);
      res.status(500).json({ error: 'Ошибка при получении данных' });
      return;
    }
    res.json(results);
  });
});


app.listen(3001);