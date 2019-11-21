/* eslint-disable no-undef */

const createItem = function (category,item) {
  const $img = $('<img>').attr('src', category.image);
  const $imgLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/${item}/${category.item_id}`)
    .append($img);

  const $divImg = $('<div>')
    .addClass('img-div')
    .append($imgLink);

  const $pName = $('<p>')
    .addClass('name')
    .text(category.name);
  const markup = $(`<select id='${category.item_id}'>
    <option value="default">Select</option>
    <option value="movies">Movies</option>
    <option value="books">Books</option>
    <option value="restaurants">Restaurants</option>
    <option value="products">Products</option>
  </select>)`);

  const $button = $('<button>')
    .addClass('delete')
    .text('Delete');
  $($button.on('click', function () {
    $.ajax({
      url: `/api/users/delete/${item}/${category.item_id}`,
      datatype: 'JSON',
      method: 'POST',
    });
    loadItems();
  }));

  const $nameLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/${item}/${category.item_id}`)
    .append($pName);

  const $commands = $('<p>')
    .addClass('commands')
    .html('<i class="fa fa-ellipsis-v" aria-hidden="true"></i>');

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($nameLink)
    .append($button)
    .append(markup)
    .change(function() {
      // currentCategory, item_id, user_id, newCategory
      let data = $(`#${category.item_id} option:selected`);
      console.log(data[0].value, item)
      if (data[0].value === item) {
        alert('Already in selected category');
      } else {
        const newCategory = data[0].value;
        const currentCategory = item;
        const item_id = category.item_id;
        $.post('api/users/change/', { itemID: item_id, tableName : currentCategory, newTable: newCategory},
          function(res) {

          });
        loadItems();
      }
    });
  return $divCard;
};

const renderItems = function(obj) {
  for (const item in obj) {
    obj[item].forEach(element => {
      $(`.${item}`).append(createItem(element,item));
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

});
