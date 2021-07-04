import { prepareDOMElements } from "./DOMElements.js";
import { prepareDOMEvents } from "./DOMEvents.js";
import { loadTasksFromLocalStorage } from "./Localstorage.js";

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    loadTasksFromLocalStorage();
};

document.addEventListener('DOMContentLoaded', main);