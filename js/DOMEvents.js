import { addTask } from "./Tools.js";

export const prepareDOMEvents = () => {
    const addTaskBtn = document.querySelector('[data-element="add"]');
    addTaskBtn.addEventListener('click', addTask);



    // $list.addEventListener('click', checkClick);
    // $input.addEventListener('keyup', checkEnter);
};