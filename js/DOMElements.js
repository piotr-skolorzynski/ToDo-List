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

export const prepareTodoElement = (id, text) => {
        const task = document.createElement('li');
        task.setAttribute('data-id', id);
        task.classList.add('list-item')
        task.innerHTML = 
           `${text}
                <div class="tools">
                    <button class="btn checkBtn"><i class="fas fa-check"></i></button>
                    <button class="btn editBtn"><i class="far fa-edit"></i></button>
                    <button class="btn deleteBtn"><i class="far fa-trash-alt"></i></button>
                    </div>`;
        return task;
}

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