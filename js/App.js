import { prepareDOMElements, preparePopupElement } from "./DOMElements.js";


const main = () => {
    prepareDOMElements();
    preparePopupElement();
    // prepareDOMEvents();
    // getLocalTask();
};

//start function main if site is fully loaded
document.addEventListener('DOMContentLoaded', main);