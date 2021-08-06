export const createSignUpModal = () => {
    const div = document.createElement('div');
    div.setAttribute('data-element', 'modal-signup');
    div.classList.add('popup');
    const html = `<h2 class="modal-title">Sign up <span data-element="signup-close" <span class="modal-btn-close">x</span></h2>
                <form data-element="form-signup" class="form-sign">
                    <div class="input-field">
                        <label for="signup-email">email </label>
                        <input type="email" name="signup-email" id="signup-email" required>
                    </div>
                    <div class="input-field">
                        <label for="signup-password"> password </label>
                        <input type="password" name="signup-password" id="signup-password" required>
                    </div>
                    <div class="input-field">
                        <label for="signup-bio">short info </label>
                        <input type="text" name="signup-bio" id="signup-bio">
                    </div>
                    <div class="input-field">
                        <label for="signup-city">city name </label>
                        <input type="text" name="signup-city" id="signup-city">
                    </div>
                    <div class="input-field">
                        <label for="signup-file">avatar (format .jpg) </label>
                        <input type="file" data-element="signup-file" name="signup-file" id="signup-file" required>
                    </div>
                    <button type="submit" class="sign-btn">Sign up</button>
                </form>`;
    div.innerHTML = html;
    const appContainer = document.querySelector('[data-element="app"]');
    appContainer.append(div);
}

export const createSignInModal = () => {
    const div = document.createElement('div');
    div.setAttribute('data-element', 'modal-signin');
    div.classList.add('popup');
    const html = `<h2 class="modal-title">Sign in <span data-element="modal-btn-close" class="modal-btn-close">x</span></h2>
                <form data-element="form-signin" class="form-sign">
                    <div class="input-field">
                        <label for="signin-email">email </label>
                        <input type="email" name="signin-email" id="signin-email" required>
                    </div>
                    <div class="input-field">
                        <label for="signin-password">password </label>
                        <input type="password" name="signin-password" id="signin-password" required>
                    </div>
                    <button type="submit" class="sign-btn">Sign in</button>
                </form>`;
    div.innerHTML = html;
    const appContainer = document.querySelector('[data-element="app"]');
    appContainer.append(div);
}

export const createAccountModal = user => {
        firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                const div = document.createElement('div');
                div.setAttribute('data-element', 'modal-account');
                div.classList.add('popup');
                div.style.display = 'none';
                div.innerHTML = `<h2 class="modal-title">Account details <span data-element="account-close" class="modal-btn-close">x</span></h2>
                <div class="modal-content-wrapper">
                    <img class="user-avatar" data-element="user-avatar" src="" alt="profile picture">
                    <div data-element="account-details" class="account-details">
                        <p class="modal-account-text">Signed in as: <strong> ${user.email}</strong></p>
                        <p class="modal-account-text">Biography: <strong>${doc.data().biography}</strong></p>
                        <p class="modal-account-text">City: <strong>${doc.data().city}</strong></p>
                </div>`;
                const appContainer = document.querySelector('[data-element="app"]');
                appContainer.append(div);
                const userAvatar = document.querySelector('[data-element="user-avatar"]');
                const accountDetails = document.querySelector('[data-element="account-details"]');
                firebase.storage()
                    .ref(`avatars/${user.uid}/user-avatar.jpg`)
                    .getDownloadURL()
                    .then(url => {
                        userAvatar.src = url;
                    })
                    .catch(err => {
                        console.log(err.message);
                        userAvatar.remove();
                        const userIcon = document.createElement('i');
                        userIcon.classList.add('fas');
                        userIcon.classList.add('fa-user-circle');
                        accountDetails.insertAdjacentElement('afterbegin', userIcon);
                    });    
            })
}