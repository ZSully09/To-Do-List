/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { addUser } = require('../database');
const { getUserByEmail } = require('../database');

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get('/register', (req, res) => {
    if (req.session.userId) {
      res.redirect('/');
    } else {
      res.render('register');
    }
  });
  router.post("/register", (req, res) => {
    const user = req.body;
    getUserByEmail(user.email, db)
      .then(data => {
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
    getUserByEmail(user.email, db)
      .then(data => {
        //check if user's email is not in db
        if (!data.rows[0]) {
          res.send('The email you entered does not belong to any account!');
        } else {
          req.session.userId = data.rows[0].id;
          res.redirect('/');
        }
      });
  });
  return router;
};
