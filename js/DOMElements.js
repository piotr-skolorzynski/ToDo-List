export const prepareDOMElements = () => {
    const app = document.querySelector('[data-element="app"]');
    app.innerHTML = 
       `<div class="todo-header">
            <h1>ToDo List</h1>
            <div class="add-task">
                <input type="text" placeholder="Wpisz treść zadania...">
                <button class="addBtn">Add</button>
            </div>
        </div>
        <div class="todo-body">
            <h2>Lista zadań:</h2>
            <p class="warning">Brak zadań na liście!</p>
            <ul class="todo-list"></ul>
        </div>`;
};

export const preparePopupElement = () => {
    const popup = document.createElement('div');
    popup.setAttribute('data-element', 'popup');
    popup.classList.add('popup');
    popup.innerHTML = 
       `<h2>Edytuj zadanie:</h2>
        <div class="popup-body">
            <p class="popup-warning"></p>
            <input type="text" placeholder="Wpisz nową treść zadania...">
            <div class="btns">
                <button class="popup-btn accept">Zatwierdź</button>
                <button class="popup-btn cancel">Anuluj</button>
                </div>
        </div>`;
};