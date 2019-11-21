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
  const markup = $(`<select id='${movies.item_id}'>
    <option value="default">Change Category</option>
    <option value="books">Book</option>
    <option value="products">Product</option>
    <option value="restaurants">Restaurant</option>
  </select>)`);

  const $nameLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/watch/${movies.item_id}`)
    .append($pName);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($nameLink)
    .append(markup)
    .change(function() {
      console.log(movies.item_id);
      // currentCategory, item_id, user_id, newCategory
      let data = $(`#${movies.item_id} option:selected`)
      const newCategory = data[0].value;
      const currentCategory = 'movies';
      const item_id = movies.item_id;
      $.post('api/users/change/', { itemID: item_id, tableName : currentCategory, newTable: newCategory},
        function() {

        });
      $('.card').remove();
      loadItems();
    });






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

  const $nameLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/read/${books.item_id}`)
    .append($pName);

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($nameLink);

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
  return $.ajax({
    method: 'GET',
    url: '/api/users'
  }).done(data => {
    if (!data) {
      alert('Error: not be able to fetch items');
    } else {
      $('.card').remove();
      renderItems(data);
    }
  });
};
$(document).ready(function () {
  loadItems();
});
