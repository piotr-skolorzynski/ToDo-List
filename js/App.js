import { prepareDOMElements, preparePopupElement } from "./DOMElements.js";
import { prepareDOMEvents } from "./DOMEvents.js";


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    // getLocalTask();
};

document.addEventListener('DOMContentLoaded', main);