
/*
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
*/


const request = require('request');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_KEY);
//


module.exports = {
  apiRequest : function(url) {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, body) => {
        if (err) reject(err);
        resolve(body);
      });
    });
  },
  yelpRequest : function(name, location) {
    const searchRequest = {
      term: name,
      location: location
    };
    return new Promise((resolve) => {
      resolve(client.search(searchRequest));
    });
  },

  compareResults : function(array, searchTerm) {
    let dbTitle = "";
    const restaurant = array[0].name;
    const book = array[2].name;
    const product = array[3].name;
    const movie = array[1].name;
    if (restaurant === searchTerm) {
      dbTitle = 'restaurants';
      return dbTitle;
    }
    if (book === searchTerm) {
      dbTitle = 'books';
      return dbTitle;
    }
    if (product === searchTerm) {
      dbTitle = 'products';
      return dbTitle;
    }
    if (movie === searchTerm) {
      dbTitle = 'movies';
      return dbTitle;
    }

    dbTitle = 'movies';
    return dbTitle;
  }

};
