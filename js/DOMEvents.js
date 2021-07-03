import { addTask, checkEnter } from "./Tools.js";

export const prepareDOMEvents = () => {
    const addTaskBtn = document.querySelector('[data-element="add"]');
    const input = document.querySelector('[data-element="input"]');
    
    addTaskBtn.addEventListener('click', addTask);
    input.addEventListener('keyup', checkEnter);



    // $list.addEventListener('click', checkClick);
};