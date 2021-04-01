let $input; //task content
let $addBtn; //add task button
let $info; //paragraph to show warnings
let $list; //list of tasks
let $task; //single task




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
    //$addBtn.addEventListener('click', addTask);
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