const createTodoBtns = text => {
    return `${text}
            <div class="tools">
                <button class="btn checkBtn"><i data-element="check" class="fas fa-check"></i></button>
                <button class="btn editBtn"><i data-element="edit" class="far fa-edit"></i></button>
                <button class="btn deleteBtn"><i data-element="delete" class="far fa-trash-alt"></i></button>
            </div>`;
}

const renderTodo = doc => {
    const todoList = document.querySelector('[data-element="list"]');
    const li = document.createElement('li');
    li.setAttribute('data-id', `${doc.id}`);
    li.setAttribute('data-is-finished', `${doc.data().done}`);
    li.classList.add('list-item');
    if (doc.data().done === true) {
        li.classList.add('completed');
    }
    li.innerHTML = createTodoBtns(doc.data().content);
    todoList.appendChild(li);
}

export const renderTasksFromFirestore = () => {
    const info = document.querySelector('[data-element="info"]');
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    db.collection('tasks').get().then(snapshot => {
        console.log(snapshot.docs)
        //snapshot.size - pokazuje rozmiar pobranej kolekcji, dobre dla małych kolekcji przy dużych powyżej 1000 się mysli, wydłuża pracę z kolekcją i podraża temat przy większych kolekcjach także ostrożnie, są lepsze rozwiązania tutaj powinno wystarczyć
        if(snapshot.size > 0) {
            info.innerText = '';
        }
        snapshot.docs.forEach(doc => renderTodo(doc));
    });
}