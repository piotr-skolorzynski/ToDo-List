export const prepareDOMElements = () => {
    const app = document.querySelector('[data-element="app"]');
    app.innerHTML = 
       `<div class="todo-header">
            <h1>ToDo List</h1>
            <div class="add-task">
                <input data-element="input" type="text" placeholder="Wpisz treść zadania...">
                <button data-element="add" class="addBtn">Add</button>
            </div>
        </div>
        <div class="todo-body">
            <h2>Lista zadań:</h2>
            <p data-element="info" class="warning">Brak zadań na liście!</p>
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

export const prepareTodoElement = (id, text) => {
        const task = document.createElement('li');
        task.setAttribute('data-id', id);
       
        // dodanie atrybutu czy jest zakończone
        task.setAttribute('data-is-finished', false);

        task.classList.add('list-item');
        task.innerHTML = prepareTodoContent(text);
        return task;
}

export const preparePopupElement = () => {
    const container = document.querySelector('[data-element="app"]')
    const popup = document.createElement('div');
    popup.setAttribute('data-element', 'popup');
    popup.classList.add('popup');
    popup.innerHTML = 
       `<h2>Edytuj zadanie:</h2>
        <div class="popup-body">
            <p class="popup-warning"></p>
            <input data-element="popup_input" type="text" placeholder="Wpisz nową treść zadania...">
            <div class="btns">
                <button data-element="popup_accept" class="popup-btn accept">Zatwierdź</button>
                <button data-element="popup_cancel" class="popup-btn cancel">Anuluj</button>
                </div>
        </div>`;
    container.append(popup);
};