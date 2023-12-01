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
  res.sendFile(__dirname + '/index.html');
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

const posts = [
  {
    username: 'Aslan',
    title: 'Post 1'
  }, 
  {
    username: 'Xenia',
    title: 'Post 2'
  }
]

app.get('/posts', authenticateToken,(req, res) => {
  res.json(posts.filter(posts => posts.username === req.user.name));
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token =  authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3001);