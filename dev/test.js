export function write(){
  //Create the element using the createElement method.
var myDiv = document.createElement("div");

//Set its unique ID.
myDiv.id = 'div_id';

//Add your content to the DIV
myDiv.innerHTML = "<h1>Hello World! asdas ddasdasds</h1>";

//Finally, append the element to the HTML body
document.body.appendChild(myDiv);

}


export function changeH1(text){
  document.querySelector('h1').innerText = text;
}
