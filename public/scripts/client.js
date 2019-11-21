/* eslint-disable no-undef */

const createItem = function(category, item) {
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

  const $button = $('<button>')
    .addClass('delete')
    .text('Delete');
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

  const $nameLink = $('<a>')
    .attr('href', `http://localhost:8080/api/users/${item}/${category.item_id}`)
    .append($pName);

  const $commands = $('<p>')
    .addClass('commands')
    .html('<i class="fa fa-ellipsis-v" aria-hidden="true"></i>');

  const $divCard = $('<div>')
    .addClass('card')
    .append($divImg)
    .append($commands)
    .append($nameLink)
    .append($button);

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
});
