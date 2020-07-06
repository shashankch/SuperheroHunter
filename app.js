// variable declaration for dom elements.
const selectedhero = localStorage.getItem("selectedhero");
const heroimg = document.getElementById("hero-img");
const title = document.getElementById("title");
const powers = document.getElementById("powers");
const bio = document.getElementById("bio");

suggestfun();
// function to display superhero details
function displayfun(result) {
  // setting image for superhero.
  heroimg.setAttribute("src", result.image.url);
  title.innerText = result.name;
  var stats = result.powerstats;
  var biog = result.biography;
  // traversing the key,value pairs of powerstats,bio object.
  for (const [key, value] of Object.entries(stats)) {
    var li = document.createElement("li");
    // adding dom element to display the details.
    li.classList.add("list-group-item");
    li.classList.add("list-group-item-action");
    li.innerText = `${key}: ${value}`;
    powers.appendChild(li);
  }
  // for biography
  for (const [key, value] of Object.entries(biog)) {
    var li = document.createElement("li");

    li.classList.add("list-group-item");
    li.classList.add("list-group-item-action");
    li.innerText = `${key}: ${value}`;
    bio.appendChild(li);
  }
}

function suggestfun() {
  // making ajax call to fetch selected superhero details using the id.
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    let result = JSON.parse(xhrRequest.response);
    displayfun(result);
  };
  var url =
    "https://www.superheroapi.com/api.php/102871238164987/" + selectedhero;
  console.log(url);
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}
