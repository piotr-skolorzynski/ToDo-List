const listenForAuthChanges = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            const signedInElements = document.querySelectorAll('[data-element="signed-in"]');
            const signedOutElements = document.querySelectorAll('[data-element="signed-out"]');
            if (user) {
                console.log('user logged in:', user) // do usunięcia
                signedInElements.forEach(el => el.style.display = 'block');
                signedOutElements.forEach(el => el.style.display = 'none');
            } else {
                console.log('user logged out') // do usuniecia
                signedInElements.forEach(el => el.style.display = 'none');
                signedOutElements.forEach(el => el.style.display = 'block');
            }
        });
}

const createSignUpModal = () => {
    const div = document.createElement('div');
    div.setAttribute('data-element', 'modal-signup');
    div.classList.add('popup');
    const html = `<h2>Sign up</h2>
                <form data-element="form-signup" class="form-signup">
                    <div class="input-field">
                        <label for="signup-email"> Email address </label>
                        <input type="email" name="signup-email" id="signup-email" required>
                    </div>
                    <div class="input-field">
                        <label for="signup-password">Choose password</label>
                        <input type="password" name="signup-password" id="signup-password" required>
                    </div>
                    <button type="submit" class="signup-btn">Sign up</button>
                </form>`;
    div.innerHTML = html;
    const appContainer = document.querySelector('[data-element="app"]');
    appContainer.append(div);
}

const signUpUser = () => {
    createSignUpModal();
    const signUpForm = document.querySelector('[data-element="form-signup"]');
    signUpForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = signUpForm['signup-email'].value;
        const password = signUpForm['signup-password'].value;
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {
            const signUpModal = document.querySelector('[data-element="modal-signup"]');
            signUpModal.remove();
            firebase.auth()
                .signOut()
                .then(() => {
                const info = document.querySelector('[data-element="info"]');
                info.textContent = 'Aby rozpocząć pracę z aplikacją zaloguj się';        
            });     
        })
        .catch(err => console.log('sth went wrong', err.message));
    });
}

const createSignInModal = () => {
    const div = document.createElement('div');
    div.setAttribute('data-element', 'modal-signin');
    div.classList.add('popup');
    const html = `<h2>Sign in</h2>
                <form data-element="form-signin" class="form-signin">
                    <div class="input-field">
                        <label for="signin-email"> Email address </label>
                        <input type="email" name="signin-email" id="signin-email" required>
                    </div>
                    <div class="input-field">
                        <label for="signin-password">Choose password</label>
                        <input type="password" name="signin-password" id="signin-password" required>
                    </div>
                    <button type="submit" class="signin-btn">Sign in</button>
                </form>`;
    div.innerHTML = html;
    const appContainer = document.querySelector('[data-element="app"]');
    appContainer.append(div);
}

const signInUser = () => {
    createSignInModal();
    const signInForm = document.querySelector('[data-element="form-signin"]');
    signInForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = signInForm['signin-email'].value;
        const password = signInForm['signin-password'].value;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(credential => {
                const signInModal = document.querySelector('[data-element="modal-signin"]');
                signInModal.remove();
            })
            .catch(err => console.log('sth went wrong', err.message));
    });
}

const signOutUser = e => {
    e.preventDefault();
    firebase.auth()
        .signOut();
}

const setListeners = () => {
    const signUp = document.querySelector('[data-element="sign-up"]');
    signUp.addEventListener('click', signUpUser);
    const signIn = document.querySelector('[data-element="sign-in"]');
    signIn.addEventListener('click', signInUser);
    const signOut = document.querySelector('[data-element="sign-out"]');
    signOut.addEventListener('click', e => signOutUser(e));
    listenForAuthChanges();
    //listenForFirestoreChanges();
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

    setListeners();
}