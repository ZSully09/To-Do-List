/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const help = require('../public/scripts/app')

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/add", (req, res) => {
    let movieData = {
      // movieName,
      // bookName,
      // restaurantName,
      // productName
    }
    let bookData = {

    }
    const name = req.body['api-search'];
    // const moviePromise = help.apiRequest('http://www.omdbapi.com/?t=' + name + '&apikey=a370f17c')
    // .then(response => {
    //   // takes title from API call and saves it to temp object to compare results
    //   if(response.Title) {
    //   movieData.title = response['Title'];
    //   movieData.year = response['Year'];
    //   movieData.director = response['Director'];
    //   movieData.poster = response['Poster'];
    //   movieData.rating = response['Ratings'][1]['Value'];
    //   movieData.boxOffice = response['BoxOffice'];
    //   }
    //   return movieData
    // })
    // .catch(error => {
    //   res.send(error)
    // })
    // const bookPromise = help.apiRequest('https://www.googleapis.com/books/v1/volumes?q=' + name)
    // .then(response => {
    //   // takes title from API call and saves it to temp object to compare results
    //   if(response.totalItems > 0) {

    //     bookData.title = response.items[0]['volumeInfo']['title']
    //     bookData.authors = response.items[0]['volumeInfo']['authors'][0]
    //     bookData.description = response.items[0]['volumeInfo']['description']
    //     bookData.thumbnail = response.items[0]['volumeInfo']['imageLinks']['smallThumbnail']
    //     bookData.rating = response.items[0]['volumeInfo']['averageRating']
    //   }
    //   return bookData
    // })
    // .catch(error => {
    //   res.send(error)
    // })
    const restaurantPromise = help.apiRequest('https://www.googleapis.com/books/v1/volumes?q=' + name)
    .then(response => {
      // takes title from API call and saves it to temp object to compare results
      if(response.totalItems > 0) {

        bookData.title = response.items[0]['volumeInfo']['title']
        bookData.authors = response.items[0]['volumeInfo']['authors'][0]
        bookData.description = response.items[0]['volumeInfo']['description']
        bookData.thumbnail = response.items[0]['volumeInfo']['imageLinks']['smallThumbnail']
        bookData.rating = response.items[0]['volumeInfo']['averageRating']
      }
      return bookData
    })
    .catch(error => {
      res.send(error)
    })
    Promise.all([restaurantPromise])
      .then(values =>{
        console.log(values)
        // meaty stuff happens here, compare respones, enter responses into database.
        res.redirect('/')
      })
  });

  return router;
};

