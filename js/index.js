const newListInput = document.getElementById("add-new-list") 
const taskListUl = document.getElementById("task-list-id") 
const addNewTask = document.getElementById("add-new-task")
const toDoTasks = document.getElementById("to-do-tasks")
const titleDiv = document.getElementById("list-title-id")
const taskTotal = document.getElementById("task-count-digit")

addNewTask.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        toDo.createNewTask(e)
    }
})

newListInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        toDo.createNewList(e)
    }
})

class ToDo {
    constructor(taskListUl, titleDiv, newListInput){
        this.toDoContainer = {}
        this.newListInput = newListInput
        this.taskListUl = taskListUl
        this.toDoTasks = toDoTasks
        this.titleDiv = titleDiv
        this.taskCounter = 0
        this.tasksTotal = taskTotal
    }

    createNewList(e) {
        const listTitle = e.target.value // Store users input in variable
        if(listTitle !== "") { // Check to make sure input is not an empty string
            this.toDoContainer[listTitle] = [] // Add list title and empty array to toDoContainer object
            this.taskListUl.innerHTML += `
            <li class="list-name active-list" 
            onclick="toDo.displayList(this)">${listTitle}</li>
            `
            newListInput.value = "" // Reset input feild to empty string
            this.titleDiv.innerHTML = listTitle // set title to current list
        }
    }

    createNewTask(e) {
        const list = document.getElementById("list-title-id").textContent // Get name of current list 
        const task = e.target.value // Get new task input
        if(list !=="") { // Check to make sure there is currently a list being edited *prevents creating tasks without assigned list
            if(task !== "") {
                this.toDoContainer[list].push(task) // Push task to correct list in toDoContainr OBJ
                this.taskCounter ++ // Add 1 task to task counter
                const newTask = document.createElement("div") // Create new div to store new task
                newTask.classList.add("task")
                newTask.innerHTML = `
                <input type="checkbox" id="task-${this.taskCounter}">
                <label for="task-${this.taskCounter}">
                    <span class="custom-checkbox"></span>
                ${task}</label>
                `
                this.toDoTasks.appendChild(newTask) // Display new task 

            }
        }
    }

    displayList(list) {
        console.log("X")
        this.titleDiv.innerHTML = ""
        this.toDoTasks.innerHTML = ""
        this.taskCounter = 0
        const listArr = Object.keys(this.toDoContainer)
        listArr.forEach((key) => {
            if(key === list.textContent) {
                this.titleDiv.innerHTML = key
                this.taskCounter ++
                const taskArr = this.toDoContainer[key]
                taskArr.forEach((value) => {
                    const newTask = document.createElement("div")
                    newTask.classList.add("task")
                    newTask.innerHTML = `
                    <input type="checkbox" id="task-${this.taskCounter}">
                    <label for="task-${this.taskCounter}">
                        <span class="custom-checkbox"></span>
                        ${value}</label>
                        `
                        this.toDoTasks.appendChild(newTask)
                })
                
            }
        })
        
    }
} 

const toDo = new ToDo(taskListUl, titleDiv, toDoTasks)








// <li class="list-name active-list">youtube</li>
            // <li class="list-name">work</li>
            // <li class="list-name">grocery</li>

            // <!-- <div class="task">
            //     <input type="checkbox" id="task-1">
            //     <label for="task-1">
            //         <span class="custom-checkbox"></span>
            //         record todo list video</label>
            // </div> 

            // <div class="task">
            //     <input type="checkbox" id="task-2">
            //     <label for="task-2">
            //         <span class="custom-checkbox"></span>
            //         record todo list video</label>
            // </div> 

            // <div class="task">
            //     <input type="checkbox" id="task-3">
            //     <label for="task-3">
            //         <span class="custom-checkbox"></span>
            //         record todo list video</label>
            // </div>  --></div>