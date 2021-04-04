let $input; //task content
let $addBtn; //add task button
let $info; //paragraph to show warnings
let $list; //list of tasks
let $task; //single task
const $min = 0; //lower limit id number
const $max = 100; //upper limit id number
let $popup; //popup
let $popupInput; //popup task to edit
let $acceptBtn; //popup btn to accept changes in edeited task
let $cancelBtn; //popup btn to resign edit mode

const editTask = e => {
    $popup.style.display = 'block';
    const clickedTaskID = e.target.closest('li').id;
    // console.log(clickedTaskID);
    const clickedTask = document.getElementById(clickedTaskID);
    // console.log(clickedTask);
    $popupInput.value = clickedTask.textContent;
};


//function responsible for deleting tasks
const deleteTask = e => {
    const taskToDelete = e.target.closest('li');
    taskToDelete.remove();
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

//function creating single task
const addTask = () => {//adding task
    if ($input.value !== '') {
        $task = document.createElement('li');
        $task.classList.add('list-item');
        $task.innerHTML = $input.value;
        const idValue = generateID($min, $max);
        $task.setAttribute('id', idValue);
        // console.log($task);
        addBtns();
        $list.appendChild($task);
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
    console.log($popup);
    $popupInput = document.querySelector('.popup-body input');
    console.log($popupInput);
    $acceptBtn = document.querySelector('.accept');
    console.log($acceptBtn);
    $cancelBtn = document.querySelector('.cancel');
    console.log($cancelBtn);
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
};

//start function main if site is fully loaded
document.addEventListener('DOMContentLoaded', main);

//<i class="far fa-trash-alt"></i> //trush sign
//<i class="fas fa-check"></i> //check sign
// <i class="far fa-edit"></i>//edit sign