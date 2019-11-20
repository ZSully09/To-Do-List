/* eslint-disable no-undef */
const createMovieItemElement = function(movies) {
  const markup = ` <section class="card">
  <div class="img-div">
    <img
      class="thumbnail rounded-circle"
      src=${movies.image}
      alt="friends"
    />
  </div>
  <p class="name">${movies.title}</p>
</section>`;

  return markup;
};
const createBooksItemElement = function(books) {
  console.log(books);
  const markup = ` <section class="card">
  <div class="img-div">
    <img
      class="thumbnail rounded-circle"
      src=${books.image}
      alt="friends"
    />
  </div>
  <p class="name">${books.title}</p>
</section>`;

  return markup;
};
const createRestaurantsItemElement = function(restaurant) {
  const markup = ` <section class="card">
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
const createProductsItemElement = function(product) {
  const markup = ` <section class="card">
  <div class="img-div">
    <img
      class="thumbnail rounded-circle"
      src=${product.image}
      alt="friends"
    />
  </div>
  <p class="name">${product.name}</p>
</section>`;

  return markup;
};
const renderMovieItems = function(obj) {
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

const loadMovieItems = function() {
  $.ajax({
    method: 'GET',
    url: '/api/users'
  }).done(data => {
    if (!data) {
      alert('Error: not be able to fetch tweets');
    } else {
      // console.log(data);
      renderMovieItems(data);
    }
  });
};
$(document).ready(function() {
  loadMovieItems();
});
