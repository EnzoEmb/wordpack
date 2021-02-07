import $ from 'jquery';

$.ajax({
  type: "POST",
  url: AJAX_URL,
  data: {
    action: 'MY_AJAX_ACTION',
    nonce_data: MY_AJAX_NAME,
  },
  success: function (data) {
    $('body').append(data);
  },
});