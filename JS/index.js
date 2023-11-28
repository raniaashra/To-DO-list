const inputEL = document.getElementById("input-el")
const ulEL = document.querySelector("#tasks-list")
const Btn = document.querySelector(".btn")
const lists = document.querySelectorAll("li input")
let listItem = []
let deleteItems = []
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("listItem") )
let deleteFromLocalStorage = JSON.parse( localStorage.getItem("deleteItems") ) || []

if (leadsFromLocalStorage) {
    listItem = leadsFromLocalStorage
    render()
}
Btn.addEventListener("click", function(event){
    if(inputEL.value !== ""){
    listItem.push(inputEL.value)
    inputEL.value = ""
    saveToLocalStorage()
    // localStorage.setItem("listItem", JSON.stringify(listItem) )
    // localStorage.setItem("deleteItems", JSON.stringify(deleteItems) )
    render()
    }
    else{
        alert("Enter new task")
    }


})

function render(){
    let list = ""
    for(let j = 0; j < listItem.length; j++){
        list += 
        `<li class="list" style = "list-style: none;margin-bottom:10px; position:relative;color:#67729D; font-size:23px;text-transform: capitalize; font-weight: 800">
        <input id="checkbox"  class="check" type="checkbox" 
        style=" 
        margin: 4px 0 0;
        width: 20px;
        height: 20px;
        cursor:pointer;
        "
        onchange="updateTextDecoration(this, ${j})">
        <label for="checkbox" id="label-${j}" style="min-width: 10px;  overflow-wrap: break-word; margin-buttom:10px">
        ${listItem[j]}
        </label>
        <input type="date" class= "date-input">
        <button class="delete-btn" onclick="deleteItem(${j})"><i class="fas fa-trash trash"></i></button>
        </li>`
    }
    ulEL.innerHTML = list
    
}

const styles = `
    .list{
        border:1px solid black;
        padding:10px;
        border-radius:5px
    }
    .delete-btn {
        background-color:white;
        border:none;
        font-size: 17px;
        margin-top: 7px;
        cursor: pointer;
        position: absolute;
        right:10px;
    }
    .trash{
        color:red;
    }
    .trash:hover{
        transform:rotateY(360deg);
        transition:1.5s
    }
    .date-input{
        width: 25%;
        border:none;
        position:absolute;
        right: 10%;
        top: -18px
    }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

function saveToLocalStorage() {
    localStorage.setItem("listItem", JSON.stringify(listItem));
    localStorage.setItem("deleteItems", JSON.stringify(deleteItems));
}

function deleteItem(index) {
   deleteItems.push(listItem.splice(index, 1)[0]);
   saveToLocalStorage()
    render();
}

function updateTextDecoration(checkbox, index) {
    const label = document.getElementById(`label-${index}`);
    label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
}
