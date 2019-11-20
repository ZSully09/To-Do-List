/* eslint-disable no-undef */
const createMovieItemElement = function (movies) {
  const markup =
    `<a href='http://localhost:8080/api/users/watch/${movies.item_id}'><section class="card movie">
  <div class="img-div">
    <img
      class="thumbnail rounded-circle"
      src=${movies.image}
      alt="friends"
    />
  </div>

  <p class="name">${movies.title}</p>
</section></a>`;

  return markup;
};
const createBooksItemElement = function (books) {
  const markup =
    `<a href='http://localhost:8080/api/users/read/${books.item_id}'> <section class="card book">
  <div class="img-div">
    <img
      class="thumbnail rounded-circle"
      src=${books.image}
      alt="friends"
    />
  </div>

  <p class="name">${books.title}</p>
</section>
</a>`;

  return markup;
};
const createRestaurantsItemElement = function (restaurant) {
  console.log(restaurant);
  const markup =
    `<a href='http://localhost:8080/api/users/eat/${restaurant.item_id}'<section class="card restaurant">
  <div class="img-div">
    <img
      class="thumbnail rounded-circle"
      src=${restaurant.image}
      alt="friends"
    />
  </div>

  <p class="name">${restaurant.name}</p>
</section>`;

  return markup;
};
const createProductsItemElement = function (product) {
  const markup =
    `<a href='http://localhost:8080/api/users/buy/${product.item_id}' <section class="card product" >
  <div class="img-div">
    <img
      class="thumbnail rounded-circle"
      src=${product.image}
      alt="friends"
    />
  </div>

//   return markup;
// };

<<<<<<< HEAD
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
=======
  return markup;
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
    method: "GET",
    url: "/api/users"
  }).done((data) => {
    if (!data) {
      alert("Error: not be able to fetch items");
    } else {
      renderItems(data);
    }
>>>>>>> 64d5499cfb30615f4f5cc91dce4125f7c49ac5c1

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
<<<<<<< HEAD

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
=======
$(document).ready(function () {
>>>>>>> 64d5499cfb30615f4f5cc91dce4125f7c49ac5c1
  loadItems();
});
