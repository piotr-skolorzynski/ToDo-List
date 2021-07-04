import { prepareTodoElement, preparePopupElement, prepareTodoContent } from "./DOMElements.js";
import { saveTaskInLocalStorage, removeTaskFromLocalStorage, updateLocalStorage } from "./Localstorage.js";

export const generateID = (min=0, max=1000) => {
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
        saveTaskInLocalStorage(task.innerText);
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

const handleEditTodo = e => {
    preparePopupElement();
    const popup = document.querySelector('[data-element="popup"]');
    const clickedTaskId = e.target.closest('li').dataset.id;
    const clickedTask = document.querySelector(`[data-id="${clickedTaskId}"]`);
    const popupInput = document.querySelector('[data-element="popup_input"]');
    const popupAcceptBtn = document.querySelector('[data-element="popup_accept"]');
    const popupCancelBtn = document.querySelector('[data-element="popup_cancel"]');
    popupInput.value = clickedTask.innerText;
    popupAcceptBtn.addEventListener('click', () => {
        if (popupInput.value === '') {
        popupInput.placeholder = 'Nowe zadanie musi posiadać treść!';
        } else {
            updateLocalStorage(clickedTask.innerText, popupInput.value);
            clickedTask.innerHTML = prepareTodoContent(popupInput.value);            
            popup.remove();
        }
    });
    popupCancelBtn.addEventListener('click', () => popup.remove());
};

const handleDeleteTodo = e => {
    const todoId = e.target.closest('li').dataset.id;
    const todo = document.querySelector(`[data-id="${todoId}"]`);
    removeTaskFromLocalStorage(todo.innerText);
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
