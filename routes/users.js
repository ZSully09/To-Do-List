/* eslint-disable no-undef */
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { addUser, getUserByEmail, getUserById } = require('../database');
const bcrypt = require('bcrypt');

module.exports = db => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get('/register', (req, res) => {
    if (req.session.userId) {
      res.redirect('/');
    } else {
      res.render('register');
    }
  });
  router.post('/register', (req, res) => {
    const user = req.body;
    getUserByEmail(user.email, db).then(data => {
      //check if user's email is not in db
      if (!data.rows[0]) {
        addUser(user, db).then(data => {
          req.session.userId = data.id;
          res.redirect('/');
        });
      } else {
        res.send('Already registerd!');
      }
    });
  });
  router.post('/login', (req, res) => {
    const user = req.body;
    getUserByEmail(user.email, db).then(data => {
      //check if user's email is not in db
      if (!data.rows[0]) {
        res.send('The email you entered does not belong to any account!');
      } else {
        //check if user's password is correct
        if (bcrypt.compareSync(user.password, data.rows[0].password)) {
          req.session.userId = data.rows[0].id;
          res.redirect('/');
        } else {
          res.send('Password is not correct!');
        }
      }
    });
  });
  router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  router.get('/watch', (req, res) => {
    if (!req.session.userId) {
      res.render('login');
    } else {
      getUserById(req.session.userId, db).then(user => {
        // Displays email in header
        // console.log(user);
        res.render('watch', {
          userId: req.session.userId,
          user: user.rows[0]
        });
      });
    }
  });

  return router;
};
