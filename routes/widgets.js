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
const { isDuplicateName, addMovie} = require('../database');


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
    let time = new Date();
    let movieData = {};
    let bookData = {};
    let productData = {};
    let yelpData = {};
    const name = req.body['api-search'];
    // const moviePromise = help.apiRequest('http://www.omdbapi.com/?t=' + name + '&apikey=' + MAPI)
    //   .then(response => {

    //     // takes title from API call and saves it to temp object to compare results
    //     if (response.Title) {
    //       movieData.name = response['Title'];
    //       movieData.year = response['Year'];
    //       movieData.director = response['Director'];
    //       movieData.poster = response['Poster'];
    //       movieData.rating = response['imdbRating'];
    //       movieData.boxOffice = response['BoxOffice'];
    //     }
    //     return movieData;
    //   })
    //   .catch(error => {
    //     res.send(error);
    //   });
    // const bookPromise = help.apiRequest('https://www.googleapis.com/books/v1/volumes?q=' + name)
    //   .then(response => {
    //     // takes title from API call and saves it to temp object to compare results
    //     if (response.totalItems > 0) {

    //       bookData.name = response.items[0]['volumeInfo']['title'];
    //       bookData.author = response.items[0]['volumeInfo']['authors'][0];
    //       bookData.description = response.items[0]['volumeInfo']['description'];
    //       bookData.thumbnail = response.items[0]['volumeInfo']['imageLinks']['smallThumbnail'];
    //       bookData.rating = response.items[0]['volumeInfo']['averageRating'];
    //     }
    //     return bookData;
    //   })
    //   .catch(error => {
    //     res.send(error);
    //   });

    // const productPromise = help.apiRequest('https://www.googleapis.com/customsearch/v1?key=' + GAPI + '&cx=015636378830428160186:o52uathqmlb&q=' + name)
    //   .then(response => {
    //     // product results are not giving very good responses...

    //     productData.name = response.items[0]['pagemap']['metatags'][0]['title'];
    //     productData.image = response.items[0].pagemap.scraped[0].image_link;
    //     productData.url = response.items[0].pagemap.metatags[0]['og:url'];
    //     return productData;
    //   })
    //   .catch(error => {
    //     res.send(error);
    //   });
    // const yelpPromise = help.yelpRequest(name, 'vancouver, bc')
    //   .then(response => {
    //     const data = JSON.parse(response.body);
    //     yelpData.name = data.businesses[0].name;
    //     yelpData.rating = data.businesses[0].rating;
    //     yelpData.price = data.businesses[0].price;
    //     yelpData.location = data.businesses[0].location.address1 + ', ' + data.businesses[0].location.city + ", " + data.businesses[0].location.state + ", " + data.businesses[0].location.zip_code;
    //     return yelpData;
    //   });
    const yelpPromise = { name: 'Lugaro',
      rating: 3.5,
      price: '$$$$',
      location: '996 Park Royal S, West Vancouver, BC, V7T 1A1',
    };
    const moviePromise = { name: 'The Lord of the Rings: The Fellowship of the Ring',
      year: '2001',
      director: 'Peter Jackson',
      poster: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
      rating: '8.8',
      boxOffice: '$314,000,000' };
    const productPromise = { name: 'The Lord of the Rings Boxed Set: J. R. R. Tolkien: 9780007581146: Books - Amazon.ca',
      image: 'https://images-na.ssl-images-amazon.com/images/I/41qO5Lg0KXL.jpg',
      url: 'http://www.amazon.ca/dp/0007581149/ref=tsm_1_fb_lk' };
    const bookPromise = { name: 'The Fellowship of the Ring',
      author: 'John Ronald Reuel Tolkien',
      description: 'Continuing the story begun in The Hobbit, this is the first part of Tolkien s epic masterpiece, The Lord of the Rings, featuring an exclusive cover image from the film, the definitive text, and a detailed map of Middle-earth. Sauron, the Dark Lord, has gathered to him all the Rings of Power the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring the ring that rules them all which has fallen into the hands of the hobbit, Bilbo Baggins. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose. To celebrate the release of the first of Peter Jackson s two-part film adaptation of The Hobbit, THE HOBBIT: AN UNEXPECTED JOURNEY, this first part of The Lord of the Rings is available for a limited time with an exclusive cover image from Peter Jackson s award-winning trilogy."',
      thumbnail: 'http://books.google.com/books/content?id=_FjrugAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
      rating: 4 };

    Promise.all([yelpPromise, moviePromise, productPromise, bookPromise])
    // promise all takes the promises created by the api requests and waits for them all to resolve
      .then(values => {
        let isCat = true;
        // compares the results and returns the category that best fits the user input
        let category = help.compareResults(values, name);

        console.log(category);
        console.log(values[1].name);
        isDuplicateName(category, values[1].name, db)
        // checks to see if the exact item already exists in a given table (by name)
          .then(bool => {
            if (bool !== true && (values[0] !== {} || values[1] !== {} || values[2] !== {} || values[3] !== {})) {
              // checks if it's duplicate name and also checks to make sure that at least one API sent an apropreate response
              db.query(
                // insert the new item into the items table
                `
          INSERT INTO items(user_id) VALUES ($1)
          RETURNING *;
          `,
                [req.session.userId]
              )
                .then(res => {
                  if (category === 'movies' && values[1] !== {}) {
                    // if the category is movies then insert the item and associated data in movies table
                    // note the empty object is only there because by default the category is set to movies
                    // if it is {}, then we want it to not insert anything into the table
                    addMovie([res.rows[0].id, values[1].name, values[1].director, parseInt(values[1].rating), values[1].poster], db);

                    isCat = false;
                  } else if (category === 'books' && values[3] !== {}) {
                    db.query(
                      `
            INSERT INTO books (
              item_id
              author
              description
              thumbnail
              rating
              is_active
              )
              VALUES ($1, $2, $3, $4, $5, ${isCat})
            RETURNING *;
            `,
                      [res.rows[0].id, values[1].name, values[1].director, parseInt(values[1].rating), values[1].poster]
                    );
                  }
                });
              console.log('yeet');
              //  console.log(req.session.userId)
              res.redirect('/');
            } else {
              res.redirect('/');
            }
          });
      })
      .catch(error => {
        res.send(error);
      });
  });

  return router;
};

