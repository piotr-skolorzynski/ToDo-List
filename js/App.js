import { prepareDOMElements, preparePopupElement } from "./DOMElements.js";
import { prepareDOMEvents } from "./DOMEvents.js";


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    // getLocalTask();
};

//start function main if site is fully loaded
document.addEventListener('DOMContentLoaded', main);