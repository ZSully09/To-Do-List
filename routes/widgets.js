/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

require('dotenv').config();
const GAPI = process.env.GAPI_KEY;
const MAPI = process.env.MOVIE_KEY;
const CUSTOM = process.env.CUSTOM_ID
const express = require('express');
const router = express.Router();
const help = require('../public/scripts/app');
const { isDuplicateName, addMovie, addBook, addRestaurant, addProduct } = require('../database');


module.exports = (db) => {

  // jQuery methods go here...

  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    // console.log(query);
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
    let movieData = {};
    let bookData = {};
    let productData = {};
    let yelpData = {};
    const name = req.body['api-search'];

    const moviePromise = help.apiRequest('http://www.omdbapi.com/?t=' + name + '&apikey=' + MAPI)
      .then(response => {

        // if resposne is a good one (i.e has "Title" it will add relevant data to the movieData object)
        if (response.Title) {
          movieData.name = response['Title'];
          movieData.year = response['Year'];
          movieData.director = response['Director'];
          movieData.poster = response['Poster'];
          movieData.rating = response['imdbRating'];
          movieData.boxOffice = response['BoxOffice'];
          movieData.actors = response['Actors']
          movieData.description = response['Plot']
          movieData.duration = response['Runtime']
        }
        return movieData;
      })
      .catch(error => {
        res.send(error);
      });
    const bookPromise = help.apiRequest('https://www.googleapis.com/books/v1/volumes?q=' + name)
      .then(response => {
        // console.log(response)
        // takes title from API call and saves it to temp object to compare results
        if (response.totalItems > 0) {

          bookData.name = response.items[0]['volumeInfo']['title'];
          bookData.author = response.items[0]['volumeInfo']['authors'][0];
          bookData.description = response.items[0]['volumeInfo']['description'];
          bookData.image = response.items[0]['volumeInfo']['imageLinks']['smallThumbnail'];
          bookData.rating = response.items[0]['volumeInfo']['averageRating'];
          bookData.publication_year = response.items[0]['volumeInfo']['publishedDate']
          bookData.pages = response.items[0]['volumeInfo']['pageCount']
        }
        return bookData;
      })
      .catch(error => {
        res.send(error);
      });

    // const productPromise = help.apiRequest('https://www.googleapis.com/customsearch/v1?key=' + GAPI + CUSTOM + name)
    //   .then(response => {
    //     console.log(response)
    //     // product results are not giving very good responses...

    //     productData.name = response.items[0]['title'];
    //     productData.image = response.items[0]['pagemap']['cse_thumbnail'][0]['src'];
    //     productData.link = response.items[0].link;
    //     productData.description = response.items[0]['snippet']
    //     return productData;
    //   })
    //   .catch(error => {
    //     res.send(error);
    //   });
    const yelpPromise = help.yelpRequest(name, 'vancouver, bc')
      .then(response => {
        // console.log(response)
        const data = JSON.parse(response.body);
        if (data.total != 0) {
        yelpData.name = data.businesses[0].name;
        yelpData.rating = data.businesses[0].rating;
        yelpData.price = data.businesses[0].price;
        yelpData.street = data.businesses[0].location.address1;
        yelpData.city = data.businesses[0].location.city
        yelpData.province = data.businesses[0].location.state
        yelpData.post_code = data.businesses[0].location.zip_code;
        yelpData.image = data.businesses[0].image_url

        }
        return yelpData;
        })
        .catch(error => {
          res.send(error)
      });
/* Test Data for when not wanting to make API calls too much below here ================================
    const yelpPromise = {
      name: 'Lugaro',
      rating: 3.5,
      price: '$$$$',
      street: '996 Park Royal S',
      city: 'West Vancouver',
      province: 'BC',
      post_code: 'V7T 1A1',
      image: 'http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg',
    };
    const moviePromise = { name: 'The Lord of the Rings: The Fellowship of the Ring',
      year: '2001',
      actors: 'Alan Howard, Noel Appleby, Sean Astin, Sala Baker',
      duration: '178 min',
      director: 'Peter Jackson',
      description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      poster: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
      rating: '8.8',
      boxOffice: '$314,000,000' };
      */
    const productPromise = {
      name: 'The Lord of the Rings Boxed Set: J. R. R. Tolkien: 9780007581146: Books - Amazon.ca',
      image: 'https://images-na.ssl-images-amazon.com/images/I/41qO5Lg0KXL.jpg',
      link: 'http://www.amazon.ca/dp/0007581149/ref=tsm_1_fb_lk',
      description: `Four-volume boxed-set edition of The Lord of the Rings in hardback, featuring \nTolkien's original unused dust-jacket designs, together with fourth hardback ...`
    };
    /*
    const bookPromise = { name: 'The Fellowship of the Ring',
      author: 'John Ronald Reuel Tolkien',
      description: 'Continuing the story begun in The Hobbit, this is the first part of Tolkien s epic masterpiece, The Lord of the Rings, featuring an exclusive cover image from the film, the definitive text, and a detailed map of Middle-earth. Sauron, the Dark Lord, has gathered to him all the Rings of Power the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring the ring that rules them all which has fallen into the hands of the hobbit, Bilbo Baggins. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose. To celebrate the release of the first of Peter Jackson s two-part film adaptation of The Hobbit, THE HOBBIT: AN UNEXPECTED JOURNEY, this first part of The Lord of the Rings is available for a limited time with an exclusive cover image from Peter Jackson s award-winning trilogy."',
      image: 'http://books.google.com/books/content?id=_FjrugAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
      rating: 4,
      publication_year: 2012,
      pages: 531 };

    */

    Promise.all([yelpPromise, moviePromise, productPromise, bookPromise])
    // promise all takes the promises created by the api requests and waits for them all to resolve
      .then(values => {
        // console.log(values)
        // compares the results and returns the category that best fits the user input
        let dupArray = help.compareResults(values, name);
        console.log(dupArray)
        let category = dupArray[0]
        isDuplicateName(dupArray[0], dupArray[1], req.session.userId, db)
        // checks to see if the exact item already exists in our table. currently only checks one table, this should suffice since we are really targeting the same search terms here...
          .then(bool => {
            // console.log(bool)
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
                console.log('movies')
                    // if the category is movies then insert the item and associated data in movies table
                    // note the empty object is only there because by default the category is set to movies
                    // if it is {}, then we want it to not insert anything into the table
                addMovie([res.rows[0].id, values[1].name, values[1].director, values[1].rating, values[1].poster, values[1].actors, values[1].description, values[1].duration, true], db);
                addBook([res.rows[0].id, values[3].name, values[3].author, values[3].pages, values[3].image, values[3].publication_year, values[3].rating, values[3].description, false], db)
                addRestaurant([res.rows[0].id, values[0].name, values[0].street, values[0].city, values[0].province, values[0].post_code, values[0].rating, values[0].image, values[0].price, false], db)
                addProduct([res.rows[0].id, values[2].name, values[2].link, values[2].image, values[2].description, false], db)
              } else if (category === 'books' && values[3] !== {}) {
                console.log('books, correct')
                  addMovie([res.rows[0].id, values[1].name, values[1].director, values[1].rating, values[1].poster, values[1].actors, values[1].description, values[1].duration, false], db);
                  addBook([res.rows[0].id, values[3].name, values[3].author, values[3].pages, values[3].image, values[3].publication_year, values[3].rating, values[3].description, true], db)
                  addRestaurant([res.rows[0].id, values[0].name, values[0].street, values[0].city, values[0].province, values[0].post_code, values[0].rating, values[0].image, values[0].price, false], db)
                  addProduct([res.rows[0].id, values[2].name, values[2].link, values[2].image, values[2].description, false], db)

              } else if (category === 'products' && values[2] !== {}) {
                console.log('products')
                  addMovie([res.rows[0].id, values[1].name, values[1].director, values[1].rating, values[1].poster, values[1].actors, values[1].description, values[1].duration, false], db);
                  addBook([res.rows[0].id, values[3].name, values[3].author, values[3].pages, values[3].image, values[3].publication_year, values[3].rating, values[3].description, false], db)
                  addRestaurant([res.rows[0].id, values[0].name, values[0].street, values[0].city, values[0].province, values[0].post_code, values[0].rating, values[0].image, values[0].price, false], db)
                  addProduct([res.rows[0].id, values[2].name, values[2].link, values[2].image, values[2].description, true], db)
              } else if (category === 'restaurants' && values[0] !== {}) {
                console.log('restaurants')
                // console.log(values[3])
                  addMovie([res.rows[0].id, values[1].name, values[1].director, values[1].rating, values[1].poster, values[1].actors, values[1].description, values[1].duration, false], db);
                  addBook([res.rows[0].id, values[3].name, values[3].author, values[3].pages, values[3].image, values[3].publication_year, values[3].rating, values[3].description, false], db)
                  addRestaurant([res.rows[0].id, values[0].name, values[0].street, values[0].city, values[0].province, values[0].post_code, values[0].rating, values[0].image, values[0].price, true], db)
                  addProduct([res.rows[0].id, values[2].name, values[2].link, values[2].image, values[2].description, false], db)
              }
            });
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

