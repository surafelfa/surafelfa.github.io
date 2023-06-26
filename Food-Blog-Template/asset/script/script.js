let lists = document.querySelectorAll("nav ul li");

for (let i = 0; i < lists.length; i++) {
  lists[i].addEventListener("click", () => {
    document.querySelector(".nav-wrapper").classList.remove("show");
  });
}

document
  .querySelector("header ul li:nth-child(1)")
  .addEventListener("click", () => {
    document.querySelector(".nav-wrapper").classList.add("show");
  });

let images = document.querySelectorAll(".food img");

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", () => {
    document.getElementById("image-box-wrapper").style.display = "flex";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.querySelector("#image-box img").src = images[i].src;
  });
}

document.getElementById("close").addEventListener("click", () => {
  document.getElementById("image-box-wrapper").style.display = "none";
  document.getElementsByTagName("body")[0].style.overflow = "auto";
});
