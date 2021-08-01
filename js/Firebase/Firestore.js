export const addTaskToFirestore = () => {
    const input = document.querySelector('[data-element="input"]');
    const info = document.querySelector('[data-element="info"]')
    firebase.auth()
    .onAuthStateChanged(user => {
        if (user && input.value !== '') {
                firebase.firestore()
                    .collection('tasks')
                    .add({
                        content: input.value,
                        done: false,
                        user: user.uid
                    })
                info.textContent = '';
                input.value = '';
            } else {
                info.textContent = 'Sign Up or sign in to start!';
                list.innerHTML = '';
                input.value = '';
            }
        });
}

const deleteTask = e => {
    const taskId = e.target.closest('li').getAttribute('data-id');
    firebase.firestore()
        .collection('tasks')
        .doc(taskId)
        .delete();
}

const handleUserRequests = e => {
    const request = e.target.dataset.element;
    switch (request) {
        case 'check':
            changeTaskStatus(e);
            break;
        case 'edit':
            changeTaskContent(e)
            break;
        case 'delete':
            deleteTask(e);
            break;
    }
}

const createTodoBtns = text => {
    return `${text}
            <div class="tools">
                <button class="btn checkBtn"><i data-element="check" class="fas fa-check"></i></button>
                <button class="btn editBtn"><i data-element="edit" class="far fa-edit"></i></button>
                <button class="btn deleteBtn"><i data-element="delete" class="far fa-trash-alt"></i></button>
            </div>`;
}

export const renderTasksFromFirestore = snapshot => {   
    const todoList = document.querySelector('[data-element="list"]');
    todoList.innerHTML = '';
    snapshot.docs.forEach(doc => {
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
    todoList.addEventListener('click', e => handleUserRequests(e));
}