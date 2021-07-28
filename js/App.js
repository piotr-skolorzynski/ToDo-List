import { createStartingInfo } from "./DOMElements.js";
import { chooseStorageForm } from "./DOMEvents.js";

const main = () => {
    createStartingInfo();
    chooseStorageForm();
};

document.addEventListener('DOMContentLoaded', main);