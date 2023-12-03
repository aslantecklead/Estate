require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    throw err;
  }
  console.log('Успешное подключение к базе данных');
});

// Объект для хранения данных пользователей в кэше
const userCache = {};

// Метод для генерации токена доступа
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
}

// Метод для аутентификации токена
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Маршрут для обработки запроса на токен
app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  connection.query('SELECT * FROM client_tokens WHERE refresh_token = ?', refreshToken, (err, results) => {
    if (err) {
      console.error('Ошибка при поиске refresh токена:', err);
      return res.sendStatus(500);
    }
    if (results.length === 0) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken: accessToken });
    });
  });
});

// Маршрут для выхода пользователя
app.delete('/logout', (req, res) => {
  const refreshToken = req.body.token;
  connection.query('DELETE FROM client_tokens WHERE refresh_token = ?', refreshToken, (err) => {
    if (err) {
      console.error('Ошибка при удалении refresh токена:', err);
      return res.sendStatus(500);
    }
    res.sendStatus(204);
  });
});

// Маршрут для входа пользователя
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM client WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Ошибка при поиске пользователя:', err);
      return res.sendStatus(500);
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const user = results[0]; // Получаем данные о пользователе из базы данных

    // Сохраняем данные пользователя в кэше
    const userData = {
      id_client: user.id_client,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      id_deal: user.id_deal
      // Добавьте любые другие данные, которые вы хотите сохранить в кэше
    };
    userCache[user.id_client] = userData;

    console.log('Данные о пользователе из базы данных:', userData);

    const accessToken = generateAccessToken({ name: email });
    const refreshToken = jwt.sign({ name: email }, process.env.REFRESH_TOKEN_SECRET);

    connection.query('UPDATE client_tokens SET refresh_token = ? WHERE id_client = ?', [refreshToken, user.id_client], (err) => {
      if (err) {
        console.error('Ошибка при обновлении refresh токена:', err);
        return res.sendStatus(500);
      }
      saveUserDataToLocalStorage(userData);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    });
  });
});

function saveUserDataToLocalStorage(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}

app.get('/current-user', authenticateToken, (req, res) => {
  const userData = getUserDataFromLocalStorage();

  if (userData) {
    console.log('Данные о пользователе из локального хранилища:', userData);
    return res.json({ user: userData });
  } else {
    return res.status(404).json({ message: 'Данные о пользователе не найдены в локальном хранилище' });
  }
});


app.listen(4000, () => {
  console.log('Сервер запущен на порту 4000');
});
