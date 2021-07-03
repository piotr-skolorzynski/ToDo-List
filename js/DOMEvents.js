import { addTask, checkEnter, handleTodoBtns } from "./Tools.js";

export const prepareDOMEvents = () => {
    const addTaskBtn = document.querySelector('[data-element="add"]');
    const input = document.querySelector('[data-element="input"]');
    const list = document.querySelector('[data-element="list"]');

    addTaskBtn.addEventListener('click', addTask);
    input.addEventListener('keyup', checkEnter);
    list.addEventListener('click', handleTodoBtns);
};