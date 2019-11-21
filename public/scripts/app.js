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
  apiRequest: function(url) {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, body) => {
        if (err) reject(err);
        resolve(body);
      });
    });
  },
  yelpRequest: function(name, location) {
    const searchRequest = {
      term: name,
      location: location
    };
    return new Promise(resolve => {
      resolve(client.search(searchRequest));
    });
  },

  compareResults: function(array, searchTerm) {
    console.log(array, searchTerm);
    let dbTitle = '';
    let name = '';
    let answerArray = [];
    const restaurant = array[0].name;
    const book = array[3].name;
    const product = array[2].name;
    const movie = array[1].name;
    if (movie === searchTerm) {
      dbTitle = 'movies';
      name = movie;
      answerArray.push(dbTitle, name);
      return answerArray;
    }
    if (restaurant === searchTerm) {
      dbTitle = 'restaurants';
      name = restaurant;
      answerArray.push(dbTitle, name);
      return answerArray;
    }
    if (book === searchTerm) {
      dbTitle = 'books';
      name = book;
      answerArray.push(dbTitle, name);

      return answerArray;
    }
    if (product === searchTerm) {
      dbTitle = 'products';
      name = product;
      answerArray.push(dbTitle, name);
      return answerArray;
    }
    dbTitle = 'movies';
    name = movie;
    answerArray.push(dbTitle, name);
    return answerArray;
  },

  isValidResponse: function(res) {
    if (res === undefined) {
      return 'Not Available';
    } else {
      return res;
    }
  }
};
