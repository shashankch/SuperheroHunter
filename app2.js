// variable to declare dom elements.
const favdiv = document.getElementById("favul");
const alert = document.getElementById("alrt");
var superhero = localStorage.getItem("superhero");
var sup = JSON.parse(superhero);

// function to display alert box.
function showalertfun(msg) {
  alrt.classList.add("alert");
  alrt.classList.add("alert-danger");

  alrt.innerText = msg;
  alert.style.display = "block";
  setTimeout(() => {
    alrt.style.display = "none";
  }, 1200);
}

// function to remove superhero from favourites list.
function removefav(event) {
  var name = event.currentTarget.parentNode.querySelector("a").innerText;
  var index = sup.indexOf(name);
  sup.splice(index, 1);

  localStorage.setItem("superhero", JSON.stringify(sup));
  event.currentTarget.parentNode.remove();
  showalertfun(name + " - removed from your favourites list");
  console.log(name);
  console.log(index);
  console.log(superhero);
}

addfavfunction();
// function to show the superhero favourites list.
function addfavfunction() {
  // traverse through favourite superhero list and showing the list.
  for (let val of sup) {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("list-group-item-action");
    var removebtn = document.createElement("button");
    removebtn.classList.add("btn");
    removebtn.classList.add("btn-danger");

    var div = document.createElement("div");
    var divimg = document.createElement("div");
    removebtn.innerText = "remove";
    var link = document.createElement("a");
    link.innerText = val;
    div.appendChild(link);
    li.appendChild(div);

    li.appendChild(removebtn);

    favdiv.appendChild(li);
    // adding event listener to remove superhero btn.
    removebtn.addEventListener("click", removefav);
  }
}
