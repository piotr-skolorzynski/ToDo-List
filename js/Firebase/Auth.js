export const renderUserNav = () => {
    const nav = document.createElement('nav');
    nav.classList.add('todo-nav');
    const html = `<div data-element="nav-container" class="nav-container">
                        <li data-element="signed-in" class="hide">
                            <a href="#" class="nav-link" data-element="link">Account</a>
                        </li>
                        <li data-element="signed-in" class="hide">
                            <a href="#" class="nav-link" data-element="link">Sign Out</a>
                        </li>
                        <li data-element="signed-out">
                            <a href="#" class="nav-link" data-element="link">Sign In</a>
                        </li>
                        <li data-element="signed-out">
                            <a href="#" class="nav-link" data-element="link">Sign Up</a>
                        </li>
                </div>`;
    nav.innerHTML = html;
    const todoHeader = document.querySelector('[data-element="header"]');
    todoHeader.insertAdjacentElement('afterbegin', nav);
}