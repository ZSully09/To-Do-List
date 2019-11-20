/* eslint-disable no-undef */
const createMoviesItemElement = function(movies) {
  const $img = $('<img>').attr('src', movies.image);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($img);

  const $pName = $('<p>')
    .addClass('name')
    .text(movies.title);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($pName);

  return $divCard;
};
// const createMovieItemElement = function(movies) {
//   const markup = ` <section class="card">
//   <div class="img-div">
//     <img
//       class="thumbnail rounded-circle"
//       src=${movies.image}
//       alt="friends"
//     />
//   </div>

//   <p class="name">${movies.title}</p>
// </section>`;

//   return markup;
// };

const createBooksItemElement = function(books) {
  const $img = $('<img>').attr('src', books.image);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($img);

  const $pName = $('<p>')
    .addClass('name')
    .text(books.title);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($pName);

  return $divCard;
};

// const createBooksItemElement = function(books) {
//   console.log(books);
//   const markup = ` <section class="card">
//   <div class="img-div">
//     <img
//       class="thumbnail rounded-circle"
//       src=${books.image}
//       alt="friends"
//     />
//   </div>

//   <p class="name">${books.title}</p>
// </section>`;

//   return markup;
// };

const createRestaurantsItemElement = function(restaurant) {
  const $img = $('<img>').attr('src', restaurant.image);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($img);

  const $pName = $('<p>')
    .addClass('name')
    .text(restaurant.name);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($pName);

  return $divCard;
};

// const createRestaurantsItemElement = function(restaurant) {
//   const markup = ` <section class="card">
//   <div class="img-div">
//     <img
//       class="thumbnail rounded-circle"
//       src=${restaurant.image}
//       alt="friends"
//     />
//   </div>

//   <p class="name">${restaurant.name}</p>
// </section>`;

//   return markup;
// };

const createProductsItemElement = function(product) {
  const $img = $('<img>').attr('src', product.image);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($img);

  const $pName = $('<p>')
    .addClass('name')
    .text(product.name);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($pName);

  return $divCard;
};

// const createProductsItemElement = function(product) {
//   const markup = ` <section class="card">
//   <div class="img-div">
//     <img
//       class="thumbnail rounded-circle"
//       src=${product.image}
//       alt="friends"
//     />
//   </div>

//   <p class="name">${product.name}</p>
// </section>`;

//   return markup;
// };
$(document).ready(function() {
  const renderItems = function(obj) {
    for (const item in obj) {
      if (item === 'movies') {
        obj[item].forEach(element => {
          $('.movies').append(createMoviesItemElement(element));
          console.log('Movie');
        });
      }
      if (item === 'books') {
        obj[item].forEach(element => {
          $('.books').append(createBooksItemElement(element));
          console.log('Books');
        });
      }
      if (item === 'restaurants') {
        obj[item].forEach(element => {
          $('.restaurants').append(createRestaurantsItemElement(element));
          console.log('Rest');
        });
      }
      if (item === 'products') {
        obj[item].forEach(element => {
          $('.products').append(createProductsItemElement(element));
          console.log('prod');
        });
      }
    }
  };

  const loadItems = function() {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    }).done(data => {
      if (!data) {
        alert('Error: not be able to fetch items');
      } else {
        // console.log(data);
        renderItems(data);
      }
    });
  };
  loadItems();
});
