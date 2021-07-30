import { createStartingInfo } from "./DOMElements.js";
import { chooseStorageForm } from "./DOMEvents.js";
import { firebaseConfig } from "./Firebase/Firebase.config.js";

const main = () => {
    createStartingInfo();
    chooseStorageForm();
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.firestore()
        .settings({ timestampsInSnapshots: true });
};

document.addEventListener('DOMContentLoaded', main);