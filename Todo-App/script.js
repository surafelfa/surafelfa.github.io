const inputBox = document.querySelector(".input-field input");
const addBtn = document.querySelector(".input-field button")
const todoList = document.querySelector("ul");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
    if (userData.trim() != 0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}

window.addEventListener('load', ()=>{
    showAndAddTasks();
})
addBtn.onclick = ()=>{
    let userData = inputBox.value
    let getLocalStorage = localStorage.getItem("New Todo")
    if(getLocalStorage == null){
        listArray = []
    }else{
        listArray = JSON.parse(getLocalStorage); //json string into an object
    }
    listArray.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArray));//object to a json string
    showAndAddTasks();

}
function showAndAddTasks(){
    let getLocalStorage = localStorage.getItem("New Todo")
    if(getLocalStorage == null){
        listArray = []
    }else{
        listArray = JSON.parse(getLocalStorage); //json string into an object
    } 
    const pendingNumb = document.querySelector('.pendingNumb');
    pendingNumb.textContent = listArray.length;
    if(listArray.length > 0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }   
    let newLiTag = ``;
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag
    inputBox.value = "";
    addBtn.classList.remove("active");
}
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo")
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1)
    localStorage.setItem("New Todo", JSON.stringify(listArray));//object to a json string
    showAndAddTasks();
}

deleteAllBtn.onclick = ()=>{
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showAndAddTasks();

}