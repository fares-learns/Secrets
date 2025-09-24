/** @format */

import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const Name = 'admin';
const Password = '6122022';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

function auth(req, res, next) {
  const passWord = req.body['password'];
  const name = req.body['name'];
  if (name === Name && passWord === Password) {
    req.isAuthorized = true;
  } else {
    req.isAuthorized = false;
  }
  next();
}

// Middleware setup
app.use(auth);
// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Apply auth middleware only to the /check route
app.post('/check', auth, (req, res) => {
  if (req.isAuthorized) {
    res.sendFile(__dirname + '/public/secrets.html');
  } else {
    res.sendFile(__dirname + '/public/wrong.html');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

