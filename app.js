//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', listButtonClick);
filterOption.addEventListener('click', filterTodo);



//Functions
function addTodo(event){
    event.preventDefault(); //prevent form from submitting
    
    console.log("button clicked!");

    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo); //putting the LI into the DIV

    //checkmark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append To List **
    todoList.appendChild(todoDiv);

    //Clear input value
    todoInput.value = "";
}

function listButtonClick(event){
    const item = event.target;
    const todo = item.parentElement;

    //DELETE BUTTON
    if (item.classList[0] == "trash-btn"){
        //add the animation(transition) class
        todo.classList.add("fall")
        
        //remove the div once transition has finished:
        todo.addEventListener("transitionend", function(){ 
            todo.remove();
        })
    }

    //CHECK BUTTON
    if(item.classList[0] == "complete-btn") {
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value) {
            case "all": //if the option All is selected
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
    console.log(todos)
}