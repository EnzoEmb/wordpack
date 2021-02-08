import {hola} from './myfunction';
import $ from 'jquery'

hola();

// $('body').append('<h1>hola</h1>')
var container = document.getElementById("container");
var content = document.createElement("span");
content.style.color = "red";
content.innerHTML = "Hello asd000aa";
container.appendChild(content);

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