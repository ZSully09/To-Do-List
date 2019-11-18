/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

require('dotenv').config();
const GAPI = process.env.GAPI_KEY;
const MAPI = process.env.MOVIE_KEY;
const express = require('express');
const router = express.Router();
const help = require('../public/scripts/app');


module.exports = (db) => {

  // jQuery methods go here...

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
    let movieData = {}
    let bookData = {}
    let productData = {}
    let yelpData = {}
    const name = req.body['api-search'];
    const moviePromise = help.apiRequest('http://www.omdbapi.com/?t=' + name + '&apikey=' + MAPI)
      .then(response => {

        // takes title from API call and saves it to temp object to compare results
        if (response.Title) {
          movieData.name = response['Title'];
          movieData.year = response['Year'];
          movieData.director = response['Director'];
          movieData.poster = response['Poster'];
          movieData.rating = response['imdbRating']
          movieData.boxOffice = response['BoxOffice'];
        }
        return movieData
      })
      .catch(error => {
        res.send(error)
      })
    const bookPromise = help.apiRequest('https://www.googleapis.com/books/v1/volumes?q=' + name)
      .then(response => {
        // takes title from API call and saves it to temp object to compare results
        if (response.totalItems > 0) {

          bookData.name = response.items[0]['volumeInfo']['title']
          bookData.author = response.items[0]['volumeInfo']['authors'][0]
          bookData.description = response.items[0]['volumeInfo']['description']
          bookData.thumbnail = response.items[0]['volumeInfo']['imageLinks']['smallThumbnail']
          bookData.rating = response.items[0]['volumeInfo']['averageRating']
        }
        return bookData
      })
      .catch(error => {
        res.send(error)
      })

    const productPromise = help.apiRequest('https://www.googleapis.com/customsearch/v1?key=' + GAPI + 'cx=015636378830428160186:o52uathqmlb&q=' + name)
      .then(response => {
        // product results are not giving very good responses...

        productData.name = response.items[0]['pagemap']['metatags'][0]['title']
        productData.image = response.items[0].pagemap.scraped[0].image_link
        productData.url = response.items[0].pagemap.metatags[0]['og:url']
        return productData
      })
      .catch(error => {
        res.send(error)
      })
    const yelpPromise = help.yelpRequest(name, 'vancouver, bc')
      .then(response => {
        const data = JSON.parse(response.body)
        yelpData.name = data.businesses[0].name
        yelpData.rating = data.businesses[0].rating
        yelpData.price = data.businesses[0].price
        yelpData.location = data.businesses[0].location.address1 + ', ' + data.businesses[0].location.city + ", " + data.businesses[0].location.state + ", " + data.businesses[0].location.zip_code
        return yelpData
      })


    Promise.all([yelpPromise, moviePromise, productPromise, bookPromise])
      .then(values => {
        console.log(help.compareResults(values, name))
        res.redirect('/')
      })
  });

  return router;
};

