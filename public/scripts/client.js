/* eslint-disable no-undef */

const createItem = function(category, item) {
  const $img = $('<img>').attr('src', category.image);
  const $imgLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/${item}/${category.item_id}`)
    .append($img);

  const $divImg = $('<div>')
    .addClass('card-imgdiv')
    .append($imgLink);

  const $pName = $('<p>')
    .addClass('name')
    .text(category.name);

  const $defaultOption = $('<option>')
    .val('default')
    .text('');
  const $moviesOption = $('<option>')
    .val('movies')
    .text('Movies');

  const $booksOption = $('<option>')
    .val('books')
    .text('Books');

  const $restaurantsOption = $('<option>')
    .val('restaurants')
    .text('Restaurants');

  const $productsOption = $('<option>')
    .val('products')
    .text('Products');

  const $select = $('<select>');

  if (item === 'movies') {
    $select
      .attr('id', category.item_id)
      .append()
      .append([
        $defaultOption,
        $booksOption,
        $restaurantsOption,
        $productsOption
      ]);
  }
  if (item === 'books') {
    $select
      .attr('id', category.item_id)
      .append([
        $defaultOption,
        $moviesOption,
        $restaurantsOption,
        $productsOption
      ]);
  }
  if (item === 'restaurants') {
    $select
      .attr('id', category.item_id)
      .append([$defaultOption, $moviesOption, $booksOption, $productsOption]);
  }
  if (item === 'products') {
    $select
      .attr('id', category.item_id)
      .append([
        $defaultOption,
        $moviesOption,
        $booksOption,
        $restaurantsOption
      ]);
  }

  const $button = $('<button>')
    .addClass('delete')
    .html('<i class="fas fa-minus-square"></i>');
  $(
    $button.on('click', function() {
      $.ajax({
        url: `/api/users/delete/${item}/${category.item_id}`,
        datatype: 'JSON',
        method: 'POST'
      });
      loadItems();
    })
  );

  const $nameLink = $('<div>')
    .addClass('card-main')
    .append(
      $('<a>')
        .attr(
          'href',
          `http://localhost:8080/api/users/${item}/${category.item_id}`
        )
        .append($pName)
    );

  const $commands = $('<div>')
    .addClass('card-commands')
    .append($button)
    .append($select);

  // <i class="fas fa-minus-square"></i>

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($nameLink)
    .append($commands)

    .change(function() {
      // currentCategory, item_id, user_id, newCategory
      let data = $(`#${category.item_id} option:selected`);
      console.log(data[0].value, item);
      if (data[0].value === item) {
        alert('Already in selected category');
      } else {
        const newCategory = data[0].value;
        const currentCategory = item;
        $.ajax({
          url: `api/users/change/${category.item_id}`,
          data: { tableName: currentCategory, newTable: newCategory },
          datatype: 'JSON',
          method: 'POST'
        }).done(() => {
          loadItems();
        });
      }
    });
  return $divCard;
};

const renderItems = function(obj) {
  for (const item in obj) {
    obj[item].forEach(element => {
      $(`.${item}`).append(createItem(element, item));
    });
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
      $('.card').remove();
      renderItems(data);
    }
  });
};
$(document).ready(function() {
  loadItems();
  $('.search').submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    $.ajax({ type: "POST", url: '/api/widgets/add', data: data, })
      .then(function () {
        loadItems();
      });
  });
});
