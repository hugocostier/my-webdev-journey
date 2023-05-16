// Update the date 
function updateDate() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    const date = new Date();
    let day = date.getDate();
    let dayName = days[date.getDay()];
    let month = date.getMonth() + 1;
    let monthName = months[date.getMonth()];
    
    if (day == 1 || day == 21 || day == 31) {
        day += "st";
    }
    else if (day == 2 || day == 22) {
        day += "nd";
    }
    else if (day == 3 || day == 23) {
        day += "rd";
    }
    else {
        day += "th";
    }
    
    document.getElementById("date").innerHTML = dayName + ", " + monthName + " " + day;
}
updateDate();


// Update number of tasks 
function updateTasks() {
    let tasks = document.getElementsByClassName("task-list-item");
    document.getElementById("tasks").innerHTML = tasks.length + " tasks";
}
updateTasks();


// Add task function 
function addTask() {
    // Get the task from the input
    let task = document.getElementById("task").value; 

    // Create the task list item
    let label = document.createElement("label");
    let checkbox = document.createElement("input");
    let checkmark = document.createElement("span");
    let circle = document.createElement("span");
    let p = document.createElement("p");
    let button = document.createElement("button");

    p.appendChild(document.createTextNode(task));

    if (task === "") { // The task is empty, alert the user
        alert("You must enter a task !"); 
    }
    else { // Append the task list item to the task list
        document.getElementsByClassName("task-list")[0].appendChild(label);
        label.setAttribute("class", "task-list-item");
        
        label.appendChild(checkbox);
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "task-check");
        
        label.appendChild(checkmark);
        checkmark.setAttribute("class", "task-mark");
        
        label.appendChild(circle);
        circle.setAttribute("class", "circle");
        
        label.appendChild(p);
        p.setAttribute("class", "task-desc");

        label.appendChild(button);
        button.setAttribute("class", "btn-delete");
    }

    // Clear the input
    document.getElementById("task").value = "";

    updateTasks();
    getClickedBtn();
}

// Add task when enter is pressed
let input = document.getElementById("task");

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && input.value !== "") {
        addTask();
    }
});


// Get the clicked button 
function getClickedBtn() {
    let deleteBtn = document.getElementsByClassName("btn-delete");  

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", deleteTask);
    }
}
getClickedBtn();


// Delete task function 
function deleteTask() {
    let task = this.parentElement; 
    const taskList = document.getElementsByClassName("task-list")[0];

    taskList.removeChild(task);
    updateTasks();
    getClickedBtn();
}