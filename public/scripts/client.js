/* eslint-disable no-undef */
// const createMovieItemElement = function(movies) {
//   const markup = `<a href='http://localhost:8080/api/users/watch/${movies.item_id}'><section class="card movie">
//   <div class="img-div">
//     <img
//       class="thumbnail rounded-circle"
//       src=${movies.image}
//       alt="friends"
//     />
//   </div>
//   <p class="name">${movies.name}</p>
// </section></a>`;

//   return markup;
// };

const createMovieItemElement = function (movies) {
  const $img = $('<img>').attr('src', movies.image);
  const $imgLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/watch/${movies.item_id}`)
    .append($img);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($imgLink);

  const $pName = $('<p>')
    .addClass('name')
    .text(movies.name);

  const $nameLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/watch/${movies.item_id}`)
    .append($pName);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($nameLink);

  return $divCard;
};

// const createBooksItemElement = function(books) {
//   const markup = `<a href='http://localhost:8080/api/users/read/${books.item_id}'> <section class="card book">
//   <div class="img-div">
//     <img
//       class="thumbnail rounded-circle"
//       src=${books.image}
//       alt="friends"
//     />
//   </div>
//   <p class="name">${books.name}</p>
// </section>
// </a>`;

//   return markup;
// };

const createBooksItemElement = function (books) {
  const $img = $('<img>').attr('src', books.image);
  const $imgLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/read/${books.item_id}`)
    .append($img);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($imgLink);

  const $pName = $('<p>')
    .addClass('name')
    .text(books.name);

  const $button = $('<button>')
    .addClass('delete')
    .text('Delete');
  $($button.click(function () {
    $.ajax({
      url: `/api/users/delete/${books.item_id}`,
      datatype: 'JSON',
      method: 'POST',
    });
  }));

  const $nameLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/read/${books.item_id}`)
    .append($pName);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($nameLink)
    .append($button);

  return $divCard;
};

// const createRestaurantsItemElement = function(restaurant) {
//   console.log(restaurant);
//   const markup = `<a href='http://localhost:8080/api/users/eat/${restaurant.item_id}'<section class="card restaurant">
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

const createRestaurantsItemElement = function (restaurant) {
  const $img = $('<img>').attr('src', restaurant.image);
  const $imgLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/eat/${restaurant.item_id}`)
    .append($img);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($imgLink);

  const $pName = $('<p>')
    .addClass('name')
    .text(restaurant.name);

  const $nameLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/eat/${restaurant.item_id}`)
    .append($pName);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($nameLink);

  return $divCard;
};

// const createProductsItemElement = function(product) {
//   const markup = `<a href='http://localhost:8080/api/users/buy/${product.item_id}' <section class="card product" >
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
// .$("a[href$='http://localhost:8080/api/users/buy/${product.item_id}']");

const createProductsItemElement = function (product) {
  const $img = $('<img>').attr('src', product.image);
  const $imgLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/buy/${product.item_id}`)
    .append($img);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($imgLink);

  const $pName = $('<p>')
    .addClass('name')
    .text(product.name);

  const $nameLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/buy/${product.item_id}`)
    .append($pName);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($nameLink);

  return $divCard;
};

const renderItems = function (obj) {
  for (const item in obj) {
    if (item === 'movies') {
      obj[item].forEach(element => {
        $('.movies').append(createMovieItemElement(element));
      });
    } else if (item === 'books') {
      obj[item].forEach(element => {
        $('.books').append(createBooksItemElement(element));
      });
    } else if (item === 'restaurants') {
      obj[item].forEach(element => {
        $('.restaurants').append(createRestaurantsItemElement(element));
      });
    } else if (item === 'products') {
      obj[item].forEach(element => {
        $('.products').append(createProductsItemElement(element));
      });
    }
  }
};

const loadItems = function () {
  $.ajax({
    method: 'GET',
    url: '/api/users'
  }).done(data => {
    if (!data) {
      alert('Error: not be able to fetch items');
    } else {
      renderItems(data);
    }
  });
};
$(document).ready(function () {
  loadItems();

});
