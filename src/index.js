let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  fetchToys();
  newToy();
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      displayToys(resp);
    });
}

function displayToys(resp) {
  toyContainer = document.querySelector("#toy-collection");
  resp.forEach((resp) => {
    toyDiv = document.createElement("div");
    toyDiv.className = "card";
    toyH2 = document.createElement("h2");
    toyH2.innerText = resp.name;
    toyImg = document.createElement("img");
    toyImg.src = resp.image;
    toyImg.className = "toy-avatar";
    toyP = document.createElement("p");
    toyP.innerText = resp.likes;
    toyP.id = "like-count";
    toyButton = document.createElement("button");
    toyButton.innerText = "like";
    toyButton.className = "like-btn";
    // add event listener
    toyButton.addEventListener("click", function (e) {
      console.log("clicked");
      countLikes(resp);
    });

    toyDiv.append(toyH2, toyImg, toyP, toyButton);
    toyContainer.appendChild(toyDiv);
  });
}

function newToy() {
  let toyForm = document.querySelector(".add-toy-form");

  toyForm.addEventListener("submit", function (e) {
    e.preventDefault;
    newFormeventListener(e);
  });
}

function newFormeventListener(e) {
  let formInfo = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  };

  postNewToy(formInfo);
}
function postNewToy(formInfo) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formInfo),
  });
}

function countLikes(resp) {
  // get like count
  likeCount = resp.likes;
  let addLike = ++likeCount;
  let toyId = resp.id;
  updateLikesFetch(addLike, toyId);
  // update like count
  // update dom
}

function updateLikesFetch(addLike, toyId) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes: addLike }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      let toyContainer = document.querySelector("#toy-collection");
      toyContainer.innerHTML = "";
      fetchToys();
    });
}
