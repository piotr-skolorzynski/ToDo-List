const createTodoBtns = text => {
    return `${text}
            <div class="tools">
                <button class="btn checkBtn"><i data-element="check" class="fas fa-check"></i></button>
                <button class="btn editBtn"><i data-element="edit" class="far fa-edit"></i></button>
                <button class="btn deleteBtn"><i data-element="delete" class="far fa-trash-alt"></i></button>
            </div>`;
}

export const renderTasksFromFirestore = (snapshot, user) => {
    const filteredTaskList = snapshot.docs.filter(doc => doc.data().user === user.uid);    
    filteredTaskList.forEach(doc => {
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
    });
}