import { prepareDOMElements } from "./DOMElements.js";
import { prepareDOMEvents } from "./DOMEvents.js";
import { loadTasksFromLocalStorage } from "./Localstorage.js";
import { firebaseConfig } from "./Firebase.config.js";

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    loadTasksFromLocalStorage();
    // firebase.initializeApp(firebaseConfig);
};

document.addEventListener('DOMContentLoaded', main);