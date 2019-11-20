/* eslint-disable no-undef */
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { addUser, getUserByEmail, getUserById, getItemsToWatchById,
  getItemsToBuyById, getItemsToReadById, getPlacesToEatById } = require('../database');
const bcrypt = require('bcrypt');

module.exports = db => {
  router.get('/', (req, res) => {
    const userLists = {
      movies: [],
      books: [],
      restaurants: [],
      products: []
    };
    new Promise((resolve, reject) => {
      getUserById(req.session.userId, db)
        .then(res => {
          if (res.rows.length) {
            const user = res.rows[0];
            getItemsToWatchById(user.id, db)
              .then(data => {
                for (const item of data.rows) {
                  userLists['movies'].push(item);
                }
              });
            getItemsToReadById(user.id, db)
              .then(data => {
                for (const item of data.rows) {
                  userLists['books'].push(item);
                }
              });
            getPlacesToEatById(user.id, db)
              .then(data => {
                for (const item of data.rows) {
                  userLists['restaurants'].push(item);
                }
                // console.log(userLists);
              });
            getItemsToBuyById(user.id, db)
              .then(data => {
                for (const item of data.rows) {
                  userLists['products'].push(item);
                }
                resolve(userLists);
              });
          }
        });
    })
      .then(data => {
        // console.log(data);
        res.json(data);
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

  router.get('/eat', (req, res) => {
    if (!req.session.userId) {
      res.render('login');
    } else {
      getUserById(req.session.userId, db).then(user => {
        // Displays email in header
        // console.log(user);
        res.render('eat', {
          userId: req.session.userId,
          user: user.rows[0]
        });
      });
    }
  });

  router.get('/read', (req, res) => {
    if (!req.session.userId) {
      res.render('login');
    } else {
      getUserById(req.session.userId, db).then(user => {
        // Displays email in header
        // console.log(user);
        res.render('read', {
          userId: req.session.userId,
          user: user.rows[0]
        });
      });
    }
  });

  router.get('/buy', (req, res) => {
    if (!req.session.userId) {
      res.render('login');
    } else {
      getUserById(req.session.userId, db).then(user => {
        // Displays email in header
        // console.log(user);
        res.render('buy', {
          userId: req.session.userId,
          user: user.rows[0]
        });
      });
    }
  });

  return router;
};
