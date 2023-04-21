const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'systemproject',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.use(express.json());

app.get('/users', (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);

  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving users from database');
    } else {
      res.send(results);
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Email and password are required');
    return;
  }

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving user from database');
      } else if (results.length === 0) {
        res.status(401).send('Invalid email or password');
      } else {
        const user = results[0];
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error comparing passwords');
          } else if (result === false) {
            res.status(401).send('Invalid email or password');
          } else {
            const token = jwt.sign(
              { userId: user.user_id, email: user.email },
              'secret_key',
              { expiresIn: '1h' }
            );
            res.send({ token });
          }
        });
      }
    }
  );
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).send('Username, email, and password are required');
    return;
  }

  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error hashing password');
    } else {
      connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash],
        (error, results, fields) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error inserting user into database');
          } else {
            const token = jwt.sign(
              { userId: results.insertId, email },
              'secret_key',
              { expiresIn: '1h' }
              );
              res.send({ token });
            }
          }
        );
      }
    });
  });

  
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
