let $input; //task content
let $addBtn; //add task button
let $info; //paragraph to show warnings
let $list; //list of tasks
let $task; //single task
const $min = 0; //lower limit id number
const $max = 100; //upper limit id number
let $popup; //popup
let $popupInput; //popup task to edit
let $popupInfo; //info in popup
let $acceptBtn; //popup btn to accept changes in edeited task
let $cancelBtn; //popup btn to resign edit mode
let $clickedTask; //edited task

//accept changes in edited task
const acceptChange = () => {
    if ($popupInput.value === '') {
        $popupInfo.innerHTML = 'Wpisz nową treść zadania!';
    } else {
    $clickedTask.innerHTML = $popupInput.value;
    $task = $clickedTask;
    addBtns();
    $popup.style.display = 'none';
    }
};

//cancel changes in edited task
const cancelChange = () => {
    $popup.style.display = 'none';
};

//task edition
const editTask = e => {
    $popup.style.display = 'block';
    const clickedTaskID = e.target.closest('li').id;
    // console.log(clickedTaskID);
    $clickedTask = document.getElementById(clickedTaskID);
    // console.log(clickedTask);
    $popupInput.value = $clickedTask.textContent;
    $acceptBtn.addEventListener('click', acceptChange);
    $cancelBtn.addEventListener('click', cancelChange);
    $popupInfo.innerHTML = '';
};

//function removing task from local storage
const removeLocalTask = taskContent => {
    let taskList;
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        $info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    const taskIndex = taskList.indexOf(taskContent);
    // console.log(taskIndex);
    taskList.splice(taskIndex,1);
    // console.log(taskList);
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

//function responsible for deleting tasks
const deleteTask = e => {
    const taskToDelete = e.target.closest('li');
    // console.log(taskToDelete.innerText);
    taskToDelete.remove();
    removeLocalTask(taskToDelete.innerText);
    const refreshedList = document.getElementsByClassName('list-item');
    // console.log(refreshedList.length);
    if (refreshedList.length === 0) {
        $info.innerHTML = 'Brak zadań na liście!';
    }
};

//function responsible for reconing which tools button was clicked and what procedure to start
const checkClick = e => {
    // console.log(e.target);
    if (e.target.closest('button').classList.contains('checkBtn')) {
        e.target.closest('li').classList.toggle('completed');
    } else if (e.target.closest('button').classList.contains('editBtn')) {
        // console.log('kliknięto przycisk edit');
        editTask(e);
    } else if (e.target.closest('button').classList.contains('deleteBtn')) {
        // console.log('kliknięto przycisk delete');
        deleteTask(e);
    }
};

//function generating id number
const generateID = (min,max) => {
    const id = Math.floor(Math.random() * ((max - min + 1) + min));
    return id;
};

//function creating tools to manipulate single task
const addBtns = () => {
    const div = document.createElement('div');
    div.classList.add('tools');
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('btn');
    checkBtn.classList.add('checkBtn');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    div.appendChild(checkBtn);    
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.classList.add('editBtn');
    editBtn.innerHTML = '<i class="far fa-edit"></i>';
    div.appendChild(editBtn);    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    div.appendChild(deleteBtn);
    $task.appendChild(div);
};

//function adding task content to local storage
const saveLocalTask = taskContent => {
    let taskList;
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        $info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    taskList.push(taskContent);
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

//function creating single task
const addTask = () => {
    if ($input.value !== '') {
        $task = document.createElement('li');
        $task.classList.add('list-item');
        $task.innerHTML = $input.value;
        const idValue = generateID($min, $max);
        $task.setAttribute('id', idValue);
        // console.log($task);
        addBtns();
        $list.appendChild($task);
        // add task content to local storage
        saveLocalTask($input.value);
        $input.value = '';
        $info.innerText = '';
    } else {
        $info.innerText = 'Wpisz treść zadania!';
    }
};

//function responsible for starting addTask function after pushing enter button
const checkEnter = e => { 
    if (e.code === 'Enter') {
        addTask();
    }
};

//load saved tasks from local storage
const getLocalTask = () => {
    let taskList;
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        $info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
        $info.innerText = '';
        taskList.forEach(savedTask => {
            $task = document.createElement('li');
            $task.classList.add('list-item');
            $task.innerHTML = savedTask;
            const idValue = generateID($min, $max);
            $task.setAttribute('id', idValue);
            addBtns();
            $list.appendChild($task);
        });
    }
};

//catch elements on site
const prepareDOMElements = () => {
    $input = document.querySelector('.add-task input');
    // console.log($input);
    $addBtn = document.querySelector('.addBtn');
    // console.log($addBtn);
    $info = document.querySelector('.warning');
    // console.log($info);
    $list = document.querySelector('.todo-list');
    // console.log(($list));
    $popup = document.querySelector('.popup');
    // console.log($popup);
    $popupInfo = document.querySelector('.popup-warning');
    $popupInput = document.querySelector('.popup-body input');
    // console.log($popupInput);
    $acceptBtn = document.querySelector('.accept');
    // console.log($acceptBtn);
    $cancelBtn = document.querySelector('.cancel');
    // console.log($cancelBtn);
};

//listen events 
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addTask);
    $list.addEventListener('click', checkClick);
    $input.addEventListener('keyup', checkEnter);
};

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    getLocalTask();
};

//start function main if site is fully loaded
document.addEventListener('DOMContentLoaded', main);

//<i class="far fa-trash-alt"></i> //trush sign
//<i class="fas fa-check"></i> //check sign
// <i class="far fa-edit"></i>//edit sign