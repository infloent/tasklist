

// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all events listeners
loadEventListeners();

// Load all events listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task  event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks(e) {
    const tasks = getLocalStorageKey('tasks');

    tasks.forEach(function getEachTask(task) {
         // Add task Element
         addTaskElement(task);
    });
}

// Add Task
function addTask(e) {

    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        // Add task Element
        addTaskElement(taskInput.value);
        // Store in LS
        storeTaskInLocalStorage(taskInput.value);
        //Clear input
        taskInput.value = '';
    }

    e.preventDefault();

}

// Add task Element 
function addTaskElement(text) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(text));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    //Add li to ul
    taskList.appendChild(li);
}

// Store task
function storeTaskInLocalStorage(task) {
    const tasks = getLocalStorageKey('tasks');

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove From LS
function removeTaskFromLocalStorage(taskItem) {
    const tasks = getLocalStorageKey('tasks');
    tasks.forEach(function removeEachTasks(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Get LS key
function getLocalStorageKey(key){
    let tasks;
    if (localStorage.getItem(key) === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem(key));
    }
    return tasks;
}

// Clear Tasks
function clearTasks(e) {
    //taskList.innerHTML = '';
    // Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear fom LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    // localStorage.clear();
    // Use this instead to only remove tasks entry from LS
    localStorage.removeItem('tasks');
    
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}