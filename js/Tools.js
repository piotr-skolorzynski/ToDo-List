import { prepareTodoElement } from "./DOMElements.js";

let tasksArray = [];

const generateID = (min=0, max=1000) => {
    const id = Math.floor(Math.random() * ((max - min + 1) + min));
    return id;
};

export const addTask = () => {
    const input = document.querySelector('[data-element="input"]');
    const info = document.querySelector('[data-element="info"]');

    if (input.value !== '') {
        const task = prepareTodoElement(generateID(), input.value);
        const list = document.querySelector('[data-element="list"]');
        list.append(task)
        tasksArray = [...tasksArray, task];

        // add task content to local storage
        // saveLocalTask($input.value);

        input.value = '';
        info.innerText = '';
    } else {
        info.innerText = 'Wpisz treść zadania!';
    }
};

export const checkEnter = e => {
    if (e.code === 'Enter') {
        addTask();
    }
};

const handleCheckedTodo = e => {
    e.target.closest('li').classList.toggle('completed');
};

export const handleTodoBtns = e => {
    const elementData = e.target.dataset.element;
    switch (elementData) {
        case 'check':
            handleCheckedTodo(e);
            break;
        case 'edit':
            console.log('odpalam funkcję edit');
            break;
        case 'delete':
            console.log('odpalam funkcję delete');
            break;
    }
};
