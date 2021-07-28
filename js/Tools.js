import { prepareTodoElement, preparePopupElement, prepareTodoContent } from "./DOMElements.js";
import { saveTaskInLocalStorage, removeTaskFromLocalStorage, updateLocalStorage } from "./Localstorage.js";

export const generateID = (min=0, max=1000) => {
    return Math.floor(Math.random() * ((max - min + 1) + min));
};

export const addTask = () => {
    const input = document.querySelector('[data-element="input"]');
    const info = document.querySelector('[data-element="info"]');
    if (input.value !== '') {
        const isFinished = 'false';
        const id = generateID();
        const task = prepareTodoElement(id, input.value, isFinished);
        const list = document.querySelector('[data-element="list"]');
        list.append(task)
        saveTaskInLocalStorage(id, task.innerText, isFinished);
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
    const task = e.target.closest('li');
    task.classList.toggle('completed');
    if (task.dataset.isFinished === "false") {
        task.dataset.isFinished = "true";
        updateLocalStorage(Number(task.dataset.id), task.innerText, task.dataset.isFinished);
    } else {
        task.dataset.isFinished = "false";
        updateLocalStorage(Number(task.dataset.id), task.innerText, task.dataset.isFinished);
    }
};

const handleEditTodo = e => {
    const clickedTaskId = Number(e.target.closest('li').dataset.id);
    const clickedTask = document.querySelector(`[data-id="${clickedTaskId}"]`);
    //block edition of finished task
    const isFinished = clickedTask.dataset.isFinished;
    if (isFinished === "true") {
        return;
    }
    preparePopupElement();
    const popup = document.querySelector('[data-element="popup"]');
    const popupInput = document.querySelector('[data-element="popup_input"]');
    const popupAcceptBtn = document.querySelector('[data-element="popup_accept"]');
    const popupCancelBtn = document.querySelector('[data-element="popup_cancel"]');
    popupInput.value = clickedTask.innerText;
    popupAcceptBtn.addEventListener('click', () => {
        if (popupInput.value === '') {
        popupInput.placeholder = 'Nowe zadanie musi posiadać treść!';
        } else {
            updateLocalStorage(clickedTaskId, popupInput.value, isFinished);
            clickedTask.innerHTML = prepareTodoContent(popupInput.value);            
            popup.remove();
        }
    });
    popupCancelBtn.addEventListener('click', () => popup.remove());
};

const handleDeleteTodo = e => {
    const todoId = Number(e.target.closest('li').dataset.id);
    const todo = document.querySelector(`[data-id="${todoId}"]`);
    removeTaskFromLocalStorage(todoId);
    todo.remove();
};

export const handleTodoBtns = e => {
    const elementData = e.target.dataset.element;
    switch (elementData) {
        case 'check':
            handleCheckedTodo(e);
            break;
        case 'edit':
            handleEditTodo(e);
            break;
        case 'delete':
            handleDeleteTodo(e);
            break;
    }
};
