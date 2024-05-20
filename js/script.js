"use strict";

document.addEventListener("click", documentClick);

function documentClick(e) {
  const targetItem = e.target;

  if (targetItem.closest(".icon-menu")) {
    document.documentElement.classList.toggle("menu-open");
  }
}

//----------Popup-------
function openPopup() {
  var overlay = document.getElementById("overlay");
  overlay.classList.add("show");
}
function closePopup() {
  var overlay = document.getElementById("overlay");
  overlay.classList.remove("show");
}

window.addEventListener("click", ({ target }) => {
  const overlay = target.closest("#overlay");
  const popup = target.closest("#popup-inner");
  const clickOpendPopup = overlay && !popup;

  if (clickOpendPopup) {
    overlay.classList.remove("show");
  }
});

function showForm() {
  var btn = document.getElementById("display-form");
  var form = document.getElementById("popup-form");
  var contacts = document.getElementById("popup-contacts");

  btn.classList.toggle("active");

  if (btn.classList.contains("active")) {
    btn.innerHTML = "Details";

    form.style.display = "flex";
    contacts.style.display = "none";
  } else {
    btn.innerHTML = "Send email";

    form.style.display = "none";
    contacts.style.display = "block";
  }
}

$(window).resize(function () {
  var btn = document.getElementById("display-form");
  const styles = window.getComputedStyle(btn);

  if ($(window).width() > 1120 && styles.display == "none") {
    btn.classList.remove("active");

    document.getElementById("popup-form").style.display = "flex";
    document.getElementById("popup-contacts").style.display = "block";
  } else if (styles.display != "none") {
    btn.innerHTML = "Send email";
    btn.classList.remove("active");

    document.getElementById("popup-form").style.display = "none";
    document.getElementById("popup-contacts").style.display = "block";
  }
});

//-------Scrollup-------
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 1500) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);

//-------Reveal animation-------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      // entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".reveal");
hiddenElements.forEach((el) => observer.observe(el));

//----------HEADER SHADOW---------

window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  if (scroll > 100) {
    document.getElementById("page-header").classList.add("active");
  } else {
    document.getElementById("page-header").classList.remove("active");
  }
});
