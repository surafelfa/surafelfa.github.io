document.querySelector("body").style.width = screen.availWidth - 15 + "px";
console.log("hi")
document.querySelectorAll(".close-nav").forEach(item=>{
    item.addEventListener("click", function(){
        document.querySelector(".nav-wrapper").classList.remove("show-nav-wrapper");
    })
})
document.querySelector(".top-nav-bar img:first-child").addEventListener("click", function(){
    document.querySelector(".nav-wrapper").classList.add("show-nav-wrapper");
})
document.querySelectorAll("#food img").forEach(item=>{
    item.addEventListener("click", function(){
        document.getElementById("full-image-box").style.display = "flex";
        document.getElementById("full-image").src = item.src;
    })
})
document.querySelector("#full-image-box span").addEventListener("click", function(){
    document.getElementById("full-image-box").style.display = "none";
})
