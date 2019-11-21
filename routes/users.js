/* eslint-disable no-undef */
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { changeCategory, addUser, getUserByEmail, getUserById, getItemsToWatchById,
  getItemsToBuyById, getItemsToReadById, getPlacesToEatById, getMovieItemById,
  getRestaurantItemById, getBookItemById, getProductItemById } = require('../database');
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
          const user = res.rows[0];
          getItemsToWatchById(user.id, db)
            .then(data => {
              for (const item of data.rows) {
                userLists['movies'].push(item);
              }
              getItemsToReadById(user.id, db)
                .then(data => {
                  for (const item of data.rows) {
                    userLists['books'].push(item);
                  }
                  getPlacesToEatById(user.id, db)
                    .then(data => {
                      for (const item of data.rows) {
                        userLists['restaurants'].push(item);
                      }
                      getItemsToBuyById(user.id, db)
                        .then(data => {
                          for (const item of data.rows) {
                            userLists['products'].push(item);
                          }
                          resolve(userLists);
                        });
                    });
                });
            });
        });
    }).then(data => {
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

  router.post('/change', (req, res) => {
      changeCategory(req.body.tableName, req.body.itemID, req.body.newTable, req.session.userId, db)
      res.redirect('/')
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

  router.get('/watch/:id', (req, res) => {
    //item id which is passed in url
    const itemId = req.params.id;
    if (!req.session.userId) {
      res.render('login');
    } else {
      getUserById(req.session.userId, db).then(user => {
        // Displays email in header
        getMovieItemById(itemId, db)
          .then(data => {
            if (data.rows[0]) {
              if (data.rows[0].user_id === req.session.userId) {
                res.render('watch', {
                  userId: req.session.userId,
                  user: user.rows[0],
                  item: data.rows[0]
                });
              } else {
                res.send('The Item does not belong to the user!');
              }
            } else {
              res.send('The Item does not belong to the user!');
            }
          });
      });
    }
  });

  router.get('/eat/:id', (req, res) => {
    //item id which is passed in url
    const itemId = req.params.id;
    if (!req.session.userId) {
      res.render('login');
    } else {
      getUserById(req.session.userId, db).then(user => {
        // Displays email in header
        getRestaurantItemById(itemId, db)
          .then(data => {
            if (data.rows[0]) {
              if (data.rows[0].user_id === req.session.userId) {
                res.render('eat', {
                  userId: req.session.userId,
                  user: user.rows[0],
                  item: data.rows[0]
                });
              } else {
                res.send('The Item does not belong to the user!');
              }
            } else {
              res.send('The Item does not belong to the user!');
            }
          });
      });
    }
  });

  router.get('/read/:id', (req, res) => {
    const itemId = req.params.id;
    if (!req.session.userId) {
      res.render('login');
    } else {
      getUserById(req.session.userId, db).then(user => {
        // Displays email in header
        getBookItemById(itemId, db)
          .then(data => {
            if (data.rows[0]) {
              if (data.rows[0].user_id === req.session.userId) {
                res.render('read', {
                  userId: req.session.userId,
                  user: user.rows[0],
                  item: data.rows[0]
                });
              } else {
                res.send('The Item does not belong to the user!');
              }
            } else {
              res.send('The Item does not belong to the user!');
            }
          });
      });

    }
  });

  router.get('/buy/:id', (req, res) => {
    const itemId = req.params.id;
    if (!req.session.userId) {
      res.render('login');
    } else {
      getUserById(req.session.userId, db).then(user => {

        // Displays email in header
        getProductItemById(itemId, db)
          .then(data => {
            if (data.rows[0]) {
              if (data.rows[0].user_id === req.session.userId) {
                res.render('buy', {
                  userId: req.session.userId,
                  user: user.rows[0],
                  item: data.rows[0]
                });
              } else {
                res.send('The Item does not belong to the user!');
              }
            } else {
              res.send('The Item does not belong to the user!');
            }
          });
      });
    }
  });

  return router;
};
