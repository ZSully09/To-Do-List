/* eslint-disable no-undef */
$(document).ready(function () {
  $('.send-button').click(function () {
    $.ajax({
      method: 'POST',
      url: '/api/users/login'
    }).done(data => {
      if (data.error) {
        alert('something wrong!');
      }
    });
  });
});
