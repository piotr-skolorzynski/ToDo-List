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



                    // <div class="input-field">
                    //     <label for="signup-file">Avatar</label>
                    //     <input type="file" data-element="signup-file" name="signup-file" id="signup-file">
                    // </div>