let $input; //task content
let $addBtn; //add task button
let $info; //paragraph to show warnings
let $list; //list of tasks
let $task; //single task

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
        addBtns();
        $list.appendChild($task);
        $input.value = '';
        $info.innerText = '';
    } else {
        $info.innerText = 'Wpisz treść zadania!';
    }
};

//catch elements on site
const prepareDOMElements = () => {
    $input = document.querySelector('input');
    // console.log($input);
    $addBtn = document.querySelector('.addBtn');
    // console.log($addBtn);
    $info = document.querySelector('.warning');
    // console.log($info);
    $list = document.querySelector('.todo-list');
    // console.log(($list));
};

//listen events 
const prepareDOMEvents = () => {
    // $addBtn.addEventListener('click', addTask);
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