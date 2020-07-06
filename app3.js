// variable declarations of dom elements
const inpValue = document.querySelector("input");
const suggestul = document.getElementById("suggest");
const fetchbtn = document.getElementById("button-addon2");
const alert = document.getElementById("alrt");

// event listener for input search box.
inpValue.addEventListener("keyup", suggestfun);

// function to display alert box
function showalertfun(msg) {
  alrt.classList.add("alert");
  alrt.classList.add("alert-success");

  alrt.innerText = msg;
  // to enable alert box.
  alert.style.display = "block";
  // to disable alert box
  setTimeout(() => {
    alrt.style.display = "none";
  }, 1200);
}

// functions to display search suggestions
function suggestfun() {
  // array to store superhero object
  var superheroarray = [];
  // ajax async request
  var xhrRequest = new XMLHttpRequest();

  // performing actions on load
  xhrRequest.onload = function () {
    // parsing response to json
    var json = JSON.parse(xhrRequest.response);
    console.log(json.results);

    let results = json.results;
    // storing the input box text
    const val = inpValue.value;
    // clearing the suggestions container at the starting.
    suggestul.innerHTML = "";

    // filtering data based on the text entered.
    const suggestarray = results.filter((item) => {
      return item.name.toLowerCase().startsWith(val);
    });

    // for the filtered array items performing actions
    suggestarray.forEach((item) => {
      // creating list item with favourite button and appending to list.
      var li = document.createElement("li");

      var favbtn = document.createElement("button");
      favbtn.classList.add("btn");
      favbtn.classList.add("btn-secondary");
      var div = document.createElement("div");
      div.innerText = item.name;
      favbtn.innerText = "Add to favourite";
      li.classList.add("list-group-item");
      li.classList.add("list-group-item-action");
      li.id = item.id;
      li.appendChild(div);
      li.appendChild(favbtn);
      suggestul.appendChild(li);

      // adding event listener to favourites button
      favbtn.addEventListener("click", function (event) {
        var name = event.currentTarget.parentNode.querySelector("div")
          .innerText;
        console.log(event.currentTarget.parentNode);
        // storing selected superhero to array.
        superheroarray.push(name);
        // calling function to display alert box.
        showalertfun(name + " - added to your favourites list");
        // storing favourites list to local storage to persist the list in the memory.
        localStorage.setItem("superhero", JSON.stringify(superheroarray));
      });
      // adding event listener to selected list item.
      li.addEventListener("click", function (event) {
        var name = event.currentTarget.querySelector("div").innerText;
        // storing selected hero to local storage.
        localStorage.setItem("selectedhero", this.id);

        inpValue.value = name;
      });
    });
    // clearing input box
    if (val === "") {
      suggestul.innerHTML = "";
    }
  };
  // making ajax get call with url..
  var url =
    "https://www.superheroapi.com/api.php/102871238164987/search/" +
    inpValue.value;

  xhrRequest.open("get", url, true);
  xhrRequest.send();
}
