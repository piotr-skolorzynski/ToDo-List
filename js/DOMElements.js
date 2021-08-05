export const createStartingInfo = () => {
    const container = document.querySelector('[data-element="app"]')
    const popup = document.createElement('div');
    popup.setAttribute('data-element', 'popup_info');
    popup.classList.add('popup');
    popup.innerHTML = 
       `<h2>Where would you like to store your tasks?</h2>
        <div class="popup-body">
            <p class="warning">Firebase - Google service, you can work anywhere you want.</p>
            <p class="warning">Local Storage - you can storage your task in browser's storage. Tasks are available only on the browser you are currently working with</p>
            <div class="btns">
                <button data-element="popup_firebase" class="popup-btn accept">Firebase</button>
                <button data-element="popup_storage" class="popup-btn cancel">Local Storage</button>
            </div>
        </div>`;
    container.append(popup);
};

export const prepareDOMElements = () => {
    const app = document.querySelector('[data-element="app"]');
    app.innerHTML = 
       `<div data-element="header" class="todo-header">
            <h1>ToDo List</h1>
            <div class="add-task">
                <input data-element="input" type="text" placeholder="Enter task content ...">
                <button data-element="add" class="addBtn">Add</button>
            </div>
        </div>
        <div class="todo-body">
            <h2>Tasks list:</h2>
            <p data-element="info" class="warning">No tasks on the list!</p>
            <ul data-element="list" class="todo-list"></ul>
        </div>`;
};

export const prepareTodoContent = text => {
    return `${text}
                <div class="tools">
                    <button class="btn checkBtn"><i data-element="check" class="fas fa-check"></i></button>
                    <button class="btn editBtn"><i data-element="edit" class="far fa-edit"></i></button>
                    <button class="btn deleteBtn"><i data-element="delete" class="far fa-trash-alt"></i></button>
                </div>`;
}

export const prepareTodoElement = (id, text, isFinished) => {
        const task = document.createElement('li');
        task.setAttribute('data-id', id);      
        task.setAttribute('data-is-finished', isFinished);
        task.classList.add('list-item');
        if(isFinished === 'true') {
            task.classList.add('completed');
        }
        task.innerHTML = prepareTodoContent(text);
        return task;
}

export const preparePopupElement = () => {
    const container = document.querySelector('[data-element="app"]')
    const popup = document.createElement('div');
    popup.setAttribute('data-element', 'popup');
    popup.classList.add('popup');
    popup.innerHTML = 
       `<h2>Edit task:</h2>
        <div class="popup-body">
            <p data-element="popup_warning" class="popup-warning"></p>
            <input data-element="popup_input" type="text" placeholder="Enter task content ...">
            <div class="btns">
                <button data-element="popup_accept" class="popup-btn accept">Change</button>
                <button data-element="popup_cancel" class="popup-btn cancel">Cancel</button>
                </div>
        </div>`;
    container.append(popup);
};