var bookmarkName = document.querySelector("#bookmarkName");
var address = document.querySelector("#address");
var submitBtn = document.querySelector("#submitBtn");
var bookmarksSection = document.querySelector("#bookmarks");
if (localStorage.getItem("bookmarkItems")?.length >= 3) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarkItems"));
} else {
  var bookmarks = [];
}
render();

//data-bs-toggle="modal"
submitBtn.addEventListener("mouseenter", function () {
  if (validInput()) {
    submitBtn.removeAttribute("data-bs-toggle");
  } else {
    submitBtn.setAttribute("data-bs-toggle", "modal");
  }
});
submitBtn.addEventListener("click", function () {
  if (validInput()) {
    bookmarks.push({
      bookmarkName: bookmarkName.value,
      address: address.value,
    });
    localStorage.setItem("bookmarkItems", JSON.stringify(bookmarks));
    console.log(bookmarks);
    render();
    bookmarkName.value = address.value = "";
    bookmarkName.classList.remove("is-valid");
    address.classList.remove("is-valid");
  }
});

function render() {
  var box = ``;
  if (localStorage.getItem("bookmarkItems")?.length >= 3) {
    for (var i = 0; i < bookmarks.length; i++) {
      box += ` <div class="row py-2 bookmark-info">
    <span class="col-3 text-center">${i + 1}</span>
    <span class="col-3 text-center">${bookmarks[i].bookmarkName}</span>

    <a href="${bookmarks[i].address}" class="col-3 text-center">
      <button class="btn btn-warning w-auto">
        <i class="fa-solid fa-eye"></i> Visit
      </button>
    </a>

    <button class="btn btn-danger col-3 m-auto w-auto" onclick = "deleteItem(${i})">
      <i class="fa-solid fa-trash"></i> Delete
    </button>
  </div>`;
    }
  }
  bookmarksSection.innerHTML = box;
}

function deleteItem(i) {
  bookmarks.splice(i, 1);
  console.log(bookmarks);
  localStorage.setItem("bookmarkItems", JSON.stringify(bookmarks));
  render();
}

bookmarkName.addEventListener("input", function () {
  nameValidate();
});

address.addEventListener("input", function () {
  urlValidate();
});

function nameValidate() {
  var nameValidator = /^[A-Za-z]{3}/;
  if (nameValidator.test(bookmarkName.value)) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
  } else {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
  }
}

function urlValidate() {
  var urlValidator = /[A-Za-z]{1,}[.]{1}[A-Za-z]{2,}/;
  if (urlValidator.test(address.value)) {
    address.classList.add("is-valid");
    address.classList.remove("is-invalid");
  } else {
    address.classList.remove("is-valid");
    address.classList.add("is-invalid");
  }
}

function validInput() {
  if (
    bookmarkName.classList.contains("is-valid") &&
    address.classList.contains("is-valid")
  ) {
    return true;
  }
  return false;
}
