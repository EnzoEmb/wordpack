import {hola} from './myfunction';
// import $ from 'jquery'

hola();

// $('body').append('<h1>hola</h1>')
var container = document.getElementById("container");
var content = document.createElement("span");
content.style.color = "red";
content.innerHTML = "Hello";
container.appendChild(content);