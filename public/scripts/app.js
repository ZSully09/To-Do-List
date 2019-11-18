
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



module.exports = {

  apiRequest : function(url){
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, body) => {
        if (err) reject(err)
          resolve(body)
        });
    })
  },
  yelpRequest : function(name, location) {
    const searchRequest = {
      term: name,
      location: location
    };
    return new Promise((resolve, reject) => {
      resolve(client.search(searchRequest))
    })
  },

}


