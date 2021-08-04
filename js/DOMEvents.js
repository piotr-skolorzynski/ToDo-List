import { addTask, checkEnter, handleTodoBtns } from "./Tools.js";
import { prepareDOMElements } from "./DOMElements.js";
import { loadTasksFromLocalStorage } from "./Localstorage.js";
import { renderUserNav } from "./Firebase/Auth.js";

export const prepareDOMEvents = () => {
    const addTaskBtn = document.querySelector('[data-element="add"]');
    const input = document.querySelector('[data-element="input"]');
    const list = document.querySelector('[data-element="list"]');
    addTaskBtn.addEventListener('click', addTask);
    input.addEventListener('keyup', checkEnter);
    list.addEventListener('click', handleTodoBtns);
};

export const chooseStorageForm = () => {
    const firebaseBtn = document.querySelector('[data-element="popup_firebase"]');
    const localStorageBtn = document.querySelector('[data-element="popup_storage"]');
    const popup = document.querySelector('[data-element="popup_info"]');
    firebaseBtn.addEventListener('click', () => {
        prepareDOMElements();
        renderUserNav();
        popup.remove();
    });
    localStorageBtn.addEventListener('click', () => {
        popup.remove();
        prepareDOMElements();
        prepareDOMEvents();
        loadTasksFromLocalStorage();
    });
} 
