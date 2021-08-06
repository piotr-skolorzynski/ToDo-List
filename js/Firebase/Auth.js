import { prepareTodoContent } from "../DOMElements.js";
import { renderTasksFromFirestore, addTaskToFirestore, handleUserRequests } from "./Firestore.js";
import { createSignUpModal, createSignInModal, createAccountModal } from "./Modals.js";

const addFileToStorage = (token, avatar) => {
    const metadata = {
        contentType: avatar.type
    }
    return firebase.storage()
                .ref(`avatars/${token.user.uid}/user-avatar.jpg`)
                .put(avatar, metadata);
}

const addUsersDetailsToFirestore = (token, biography, city) => {
    return firebase.firestore().collection('users').doc(token.user.uid).set({
                biography,
                city
            });
}

const signUpUser = () => {
    createSignUpModal();
    const signUpModal = document.querySelector('[data-element="modal-signup"]');
    const closeBtn = document.querySelector('[data-element="signup-close"]');
    closeBtn.addEventListener('click', () => signUpModal.remove());
    const signUpForm = document.querySelector('[data-element="form-signup"]');
    signUpForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = signUpForm['signup-email'].value;
        const password = signUpForm['signup-password'].value;
        const biography = signUpForm['signup-bio'].value;
        const city = signUpForm['signup-city'].value;
        const avatar = document.querySelector('[data-element="signup-file"]').files[0];
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(token => {
            const avatarPromise = addFileToStorage(token, avatar);
            const userDetailsPromise = addUsersDetailsToFirestore(token, biography, city);
            return Promise.all([avatarPromise, userDetailsPromise]);
        })
        .then(() => {
            signUpModal.remove();
            firebase.auth()
                .signOut();
        })
    });
}

const signInUser = () => {
    createSignInModal();
    const signInModal = document.querySelector('[data-element="modal-signin"]');
    const signInForm = document.querySelector('[data-element="form-signin"]');
    const modalCloseBtn = document.querySelector('[data-element="modal-btn-close"]');
    modalCloseBtn.addEventListener('click', () => signInModal.remove());
    signInForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = signInForm['signin-email'].value;
        const password = signInForm['signin-password'].value;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                signInModal.remove();
            })
            .catch(err => {
                console.log(err.message);
                const errorInfo = document.createElement('p');
                errorInfo.classList.add('warning');
                errorInfo.innerText = `${err.message}`;
                signInModal.insertAdjacentElement('beforeend', errorInfo);
            });
    });
}

const signOutUser = () => {
    firebase.auth()
        .signOut()
        .then(() => {
            const accountDetails = document.querySelector('[data-element="modal-account"]');
            accountDetails.remove();
        })
}

const showAccountDetails = () => {
    const accountModal = document.querySelector('[data-element="modal-account"]');
    accountModal.style.display = 'block';
    const closeBtn = document.querySelector('[data-element="account-close"]');
    closeBtn.addEventListener('click', () => {
        accountModal.style.display = 'none';
    })
}

const listenForAuthChanges = () => {
    const signedInElements = document.querySelectorAll('[data-element="signed-in"]');
    const signedOutElements = document.querySelectorAll('[data-element="signed-out"]');
    const info = document.querySelectorAll('[data-element="info"]');
    const todoList = document.querySelector('[data-element="list"]');
    firebase.auth()
    .onAuthStateChanged(user => {
        if (user) {
                signedInElements.forEach(el => el.style.display = 'block');
                signedOutElements.forEach(el => el.style.display = 'none');
                createAccountModal(user);
                firebase.firestore()
                .collection('tasks')
                .where('user', '==', user.uid) //query to filter tasks belonging to signed in user
                .onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        if (change.type === 'added') {
                            renderTasksFromFirestore(change.doc)
                        } else if (change.type === 'removed') {
                            let taskToDelete = document.querySelector(`[data-id="${change.doc.id}"]`);
                            taskToDelete.remove();
                        } else if (change.type === 'modified') {
                            const taskToModify = document.querySelector(`[data-id="${change.doc.id}"]`);
                            taskToModify.innerHTML = prepareTodoContent(change.doc.data().content);
                            taskToModify.dataset.isFinished = change.doc.data().done.toString();
                            if (taskToModify.dataset.isFinished === 'true') {
                                taskToModify.classList.add('completed');
                            } else {
                                taskToModify.classList.remove('completed');
                            }
                        }
                    })
                }, err => console.log(err.message)) //przy onsnapshot nie ma catch ale error jest jako drugi parametr
            } else {
                signedInElements.forEach(el => el.style.display = 'none');
                signedOutElements.forEach(el => el.style.display = 'block');
                info.innerText = 'Sign Up or sign in to start!';
                todoList.innerHTML = '';
                const accountDetails = document.querySelector('[data-element="modal-account"]');
                if (accountDetails) accountDetails.remove();
            }
        });
}
    
const setListeners = () => {
    const signUp = document.querySelector('[data-element="sign-up"]');
    signUp.addEventListener('click', signUpUser);
    const signIn = document.querySelector('[data-element="sign-in"]');
    signIn.addEventListener('click', signInUser);
    const signOut = document.querySelector('[data-element="sign-out"]');
    signOut.addEventListener('click', signOutUser);
    const account = document.querySelector('[data-element="account"]');
    account.addEventListener('click', showAccountDetails);
    const addBtn = document.querySelector('[data-element="add"]');
    addBtn.addEventListener('click', addTaskToFirestore);
    const input = document.querySelector('[data-element="input"]');
    input.addEventListener('keyup', e => {
        if (e.code === 'Enter') addTaskToFirestore();
    });                       
}

export const renderUserNav = () => {
    const nav = document.createElement('nav');
    nav.classList.add('todo-nav');
    const html = `<div data-element="nav-container" class="nav-container">
                        <li data-element="signed-in" style="display:none;">
                            <a href="#" class="nav-link" data-element="account">Account</a>
                        </li>
                        <li data-element="signed-in" style="display:none;">
                            <a href="#" class="nav-link" data-element="sign-out">Sign Out</a>
                        </li>
                        <li data-element="signed-out" style="display:none;">
                            <a href="#" class="nav-link" data-element="sign-in">Sign In</a>
                        </li>
                        <li data-element="signed-out" style="display:none;">
                            <a href="#" class="nav-link" data-element="sign-up">Sign Up</a>
                        </li>
                </div>`;
    nav.innerHTML = html;
    const todoHeader = document.querySelector('[data-element="header"]');
    todoHeader.insertAdjacentElement('afterbegin', nav);
    const todoList = document.querySelector('[data-element="list"]');
    todoList.addEventListener('click', e => handleUserRequests(e));
    setListeners();
    listenForAuthChanges();
}