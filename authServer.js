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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  connection.query('SELECT * FROM client WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Ошибка при поиске пользователя:', err);
      return res.sendStatus(500);
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const user = results[0]; 
    bcrypt.compare(password, user.password, (err, passwordsMatch) => {
      if (err) {
        console.error('Ошибка при сравнении паролей:', err);
        return res.sendStatus(500);
      }
      if (!passwordsMatch) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
      }

      if (user.id_role === 1) { 
        const userData = {
          id: user.id_client,
          email: email,
          role: 'admin'
        };
        const accessToken = generateAccessToken(userData);
        const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET);
        
        connection.query('UPDATE client_tokens SET refresh_token = ? WHERE id_client = ?', [refreshToken, user.id_client], (err) => {
          if (err) {
            console.error('Ошибка при обновлении refresh токена:', err);
            return res.sendStatus(500);
          }
          res.json({ id: userData.id, accessToken: accessToken, refreshToken: refreshToken });
        });
      } else {
        return res.status(403).json({ message: 'У вас нет прав доступа' });
      }
    });
  });
});

function generateAccessToken(user){ 
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m'});
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(403);

    const { role } = decodedToken;
    if (role === 'admin') {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ message: 'У вас нет прав доступа' });
    }
  });
}


app.get('/current-user', authenticateToken, (req, res) => {
  res.json({ username: req.user.name });
});

///
const bcrypt = require('bcrypt');
const saltRounds = 10; 

app.post('/register', (req, res) => {
  const userData = req.body;

  bcrypt.hash(userData.password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Ошибка при хешировании пароля:', err);
      return res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
    }

    userData.password = hash;

    const attributesToHash = [
      'passportSeries',
      'passportNumber',
      'nameOnCard',
      'creditCardNumber',
      'expiration',
      'CVV'
    ];

    const hashAttributes = () => {
      const attribute = attributesToHash.shift();
      if (!attribute) {
        connection.query('INSERT INTO client SET ?', userData, (err, result) => {
          if (err) {
            console.error('Ошибка при сохранении данных пользователя:', err);
            return res.status(500).json({ error: 'Ошибка при сохранении данных пользователя' });
          }
          res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
        });
      } else {
        bcrypt.hash(userData[attribute], saltRounds, (err, hashedAttribute) => {
          if (err) {
            console.error(`Ошибка при хешировании ${attribute}:`, err);
            return res.status(500).json({ error: `Ошибка при регистрации пользователя (${attribute})` });
          }
          userData[attribute] = hashedAttribute;
          hashAttributes();
        });
      }
    };

    hashAttributes();
  });
});

/// roles
app.get('/pages/admin/admin_panel.html', authenticateToken, (req, res) => {
  if (req.user && req.user.role === 'admin') {
    res.sendFile(__dirname + '/pages/admin/admin_panel.html');
  } else {
    res.status(403).json({ message: 'Доступ запрещен. Этот маршрут только для администраторов' });
  }
});

app.listen(4000);