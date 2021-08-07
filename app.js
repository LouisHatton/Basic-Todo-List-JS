//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


//Event Listeners
document.addEventListener('DOMContentLoaded', getLocalTodos);

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', listButtonClick);
filterOption.addEventListener('click', filterTodo);



//Functions
function addTodo(event){
    event.preventDefault(); //prevent form from submitting
    
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo); //putting the LI into the DIV

    //Add todo to Local Storage
    saveLocalTodos(todoInput.value)

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
        removeLocalTodos(todo);
        
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

function saveLocalTodos(todo) {
    //CHECK - are there already items avaliable?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []; //if not set blank array
    } else {
        todos = JSON.parse(localStorage.getItem('todos')) //if yes, get them
    }

    //add new item
    todos.push(todo); 

    //save back into local storage
    localStorage.setItem("todos", JSON.stringify(todos)); 

}

function getLocalTodos(){
    //CHECK - are there already items avaliable?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []; //if not set blank array
    } else {
        todos = JSON.parse(localStorage.getItem('todos')) //if yes, get them
    }

    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
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
    })

}

function removeLocalTodos(todo) {
    //CHECK - are there already items avaliable?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []; //if not set blank array
    } else {
        todos = JSON.parse(localStorage.getItem('todos')) //if yes, get them
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    console.log(todoIndex);
    todos.splice(todoIndex, 1);
    
    localStorage.setItem("todos", JSON.stringify(todos)); 
}
