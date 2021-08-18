//Selectors
const todoInput = document.getElementsByClassName('todo-input')[0]
const todoButton = document.getElementsByClassName('todo-button')[0]
const todoList = document.getElementsByClassName('todo-list')[0]
const filterOption = document.querySelector('.filter-todo')


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Functions

function addTodo(event) {
    //prevent from submitting
    event.preventDefault();

    //TODO Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //Create LI
    const newTodo = document.createElement('li')
    newTodo.classList.add('todo-item')
    newTodo.innerText = todoInput.value
    todoDiv.appendChild(newTodo)

    //Add TODO to Local Storage
    saveLocalTodos(todoInput.value)

    //Check Mark Button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class= "fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    // Trash Button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    //Add todoDiv to todoList
    todoList.appendChild(todoDiv)

    //Clear input box
    todoInput.value = ""
}

function deleteCheck(event) {
    const item = event.target
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        //Animation
        todo.classList.add('fall')
        removeLocalTodo(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
        todo.remove()
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch (event.target.value) {
            case "all":
                odo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                }
                else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                }
                else {
                    todo.style.display = "none"
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    //check if there already exists a todo in there
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos;

    //check if there already exists a todo in there
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach((todo) => {

        //TODO Div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        //Create LI
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo-item')
        newTodo.innerText = todo
        todoDiv.appendChild(newTodo)

        //CheckMark Button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class= "fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        // Trash Button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class= "fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        //Add todoDiv to todoList
        todoList.appendChild(todoDiv)

    })
}

function removeLocalTodo(todo) {
    let todos;

    //check if there already exists a todo in there
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText //get Name of deleted element
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}