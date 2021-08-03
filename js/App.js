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
    var storage = firebase.storage();
};

document.addEventListener('DOMContentLoaded', main);