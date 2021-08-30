const newListInput = document.getElementById("add-new-list") 
const newTaskInput = document.getElementById("add-new-task")
const titleDiv = document.getElementById("list-title-id") 
const taskCountDisplay = document.getElementById("task-count-digit")
const taskContainer = document.getElementById("taskContainer")


const toDoContainer = {}
let taskCounter = 0
let taskId = 0

newListInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        createList(e)
    }
})

newTaskInput.addEventListener("keyup", (e) => {
    if(e.key ==="Enter") {
        createTask(e)
    }
})



const createList = (e) => {
    // resetTodos()
    switchActiveList()
    const title = e.target.value // Store users input in variable
    const listUl = document.getElementById("task-list-id") // Grab list UL element
    if(title !== "") { // Check to make sure input is not an empty string
        toDoContainer[title] = [] // Add list title and empty array to toDoContainer object
        listUl.innerHTML += `
        <li class="list-name active-list" 
        onclick="displayList(this)">${title}</li>
        `
        newListInput.value = "" // Reset input feild to empty string
        titleDiv.innerHTML = title // set title to current list
        taskCounter = 0 // Reset task counter


    }
}

const createTask= (e) => {
    const list = document.getElementById("list-title-id").textContent // Get name of current list 
    const task = e.target.value // Get new task input
    if(list !== "") { // Check to make sure there is currently a list being edited *prevents creating tasks without assigned list
        if(task !== "") {
            taskCounter ++ // Add task to taskCounter
            toDoContainer[list].push(task) // Push task to correct list in toDoContainr OBJ
            const newTask = document.createElement("div") // Create new div to store new task
            newTask.classList.add("task")
            taskId ++
            newTask.innerHTML = `
            <input type="checkbox" class="active-task" id="task-${taskId}">
            <label for="task-${taskId}">
                <span class="custom-checkbox" onclick="countTasks()"></span>
            ${task}</label>
            `
            tasksContainer.appendChild(newTask) // Display new task 
            taskCountDisplay.textContent = taskCounter //Update task count
            newTaskInput.value = "" // Set task input to empty string

        }
    }
}


// Runs when user clicks on a list they want to edit
const displayList = (list) => {
    // resetTodos()
    switchActiveList()
    list.classList.add("active-list")
    titleDiv.textContent = list.textContent // Set title to name of selected list
    const listArr = Object.keys(toDoContainer) // Create array of all list names 
    listArr.forEach((key) => {
        if(key === list.textContent) { // Compaire each key to selected list
            displayTasks(key) // Display all tasks of the correct list
        }
    })
}

const displayTasks = (key) => {
    const taskArr = toDoContainer[key] // Get all tasks of the selected list
    taskCounter = 0 // Reset task counter
    taskArr.forEach((value) => {
        taskCounter ++ // Increment task counter by 1 for each task in array
        const newTask = document.createElement("div") // For each task create new div 
        const tasksContainer = document.getElementById("tasksContainer") // Grab tasks Container
        newTask.classList.add("task")                 // Add class of task & set inner html                // Add class of task & set inner html 
        newTask.innerHTML = `
        <input type="checkbox" class="active-task" id="task-${taskCounter}">
        <label for="task-${taskCounter}">
            <span class="custom-checkbox"></span>
            ${value}</label>
            `
            tasksContainer.appendChild(newTask) // Display new task
            taskCountDisplay.textContent = taskCounter
    })
}


const resetTodos = () => {
    tasksContainer.innerHTML = "" // Clear tasks form prev list if present
    titleDiv.textContent = ""
    taskCounter = 0 // Reset task counter
    taskCountDisplay.textContent = taskCounter
}

const countTasks = () => {
    setTimeout(() => {
        const allTasks = document.querySelectorAll(".active-task")
        allTasks.forEach((task) => {
            if(task.checked) {
                task.classList.remove("active-task")
                task.classList.add("finished-task")
                taskCounter --
                taskCountDisplay.textContent = taskCounter
            }
        })
    }, 300); 
}

const switchActiveList = () => {
    const prevActiveList = document.querySelectorAll(".list-name")
    prevActiveList.forEach((list) => {
        list.classList.remove("active-list")
    })
}




