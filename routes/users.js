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
  getRestaurantItemById, getBookItemById, getProductItemById, deleteItem } = require('../database');
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
      res.render('register', { error: "" });
    }
  });
  router.post('/change/:itemID', (req, res) => {
    console.log(req.params)
    console.log(req.body)
      changeCategory(req.body.tableName, req.params.itemID, req.body.newTable, req.session.userId, db)
      .then((error) => {
        console.log(error)
      res.redirect('/')
      })
      // res.redirect('/')
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
        res.render('register', { error: 'Already registerd!' });
      }
    });
  });
  router.post('/login', (req, res) => {
    const user = req.body;
    getUserByEmail(user.email, db).then(data => {
      //check if user's email is not in db
      if (!data.rows[0]) {
        res.render('login', {
          emailError: 'The Email does not belong to any user!',
          passwordError: ''
        });
      } else {
        //check if user's password is correct
        if (bcrypt.compareSync(user.password, data.rows[0].password)) {
          req.session.userId = data.rows[0].id;
          res.redirect('/');
        } else {
          res.render('login', {
            emailError: '',
            passwordError: 'Password is not correct!'
          });
        }
      }
    });
  });
  router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  router.get('/:category/:id', (req, res) => {
    //item id which is passed in url
    const itemId = req.params.id;
    if (!req.session.userId) {
      res.render('login', { emailError: '', passwordError: '' });
    } else {
      getUserById(req.session.userId, db).then(user => {
        // Displays email in header
        if (req.params.category === 'movies') {
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
                  res.redirect('/');
                }
              } else {
                res.redirect('/');
              }
            });
        } else if (req.params.category === 'books') {
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
                  res.redirect('/');
                }
              } else {
                res.redirect('/');
              }
            });
        } else if (req.params.category === 'restaurants') {
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
                  res.redirect('/');
                }
              } else {
                res.redirect('/');
              }
            });
        } else if (req.params.category === 'products') {
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
                  res.redirect('/');
                }
              } else {
                res.redirect('/');
              }
            });
        }
      });
    }
  });

  router.post('/delete/:category/:id', (req, res) => {
    deleteItem(req.params.id, req.params.category, db);
    res.redirect('/');
  });

  return router;
};
