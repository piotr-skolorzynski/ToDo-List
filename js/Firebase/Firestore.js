import { preparePopupElement, prepareTodoContent } from "../DOMElements.js";

export const addTaskToFirestore = () => {
    const input = document.querySelector('[data-element="input"]');
    const info = document.querySelector('[data-element="info"]');
    const list = document.querySelector('[data-element="list"]');
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

const changeTaskStatus = id => {
    const task = document.querySelector(`[data-id="${id}"]`);
    let taskStatus = task.getAttribute('data-is-finished');
    if (taskStatus === 'true') taskStatus = false;
    if (taskStatus === 'false') taskStatus = true;
    firebase.firestore()
        .collection('tasks')
        .doc(id)
        .update({
            done: taskStatus
        })
}

const updateTaskContentInFirestore = (id, content) => {
    firebase.firestore()
        .collection('tasks')
        .doc(id)
        .update({
            content: content
        })
}

const changeTaskContent = id => {
    preparePopupElement();
    const task = document.querySelector(`[data-id="${id}"]`);
    const popup = document.querySelector('[data-element="popup"]');
    const input = document.querySelector('[data-element="popup_input"]');
    const cancelChange = document.querySelector('[data-element="popup_cancel"]');
    const acceptChange = document.querySelector('[data-element="popup_accept"]');
    const info = document.querySelector('[data-element="popup_warning"]');
    input.value = task.textContent;
    cancelChange.addEventListener('click', () => {
        popup.remove();
    });
    input.addEventListener('keyup', e => {
        if (e.code === 'Enter') {
            if (input.value === '' || input.value === ' ') {
                info.textContent = 'insert any content before updating';
            } else {
                info.textContent = '';
                popup.remove();
                updateTaskContentInFirestore(id, input.value);
            }
        } 
    }); 
    acceptChange.addEventListener('click', () => {
        popup.remove();
        updateTaskContentInFirestore(id, input.value);
    });
}

const deleteTask = id => {
    firebase.firestore()
        .collection('tasks')
        .doc(id)
        .delete();
}

const handleUserRequests = e => {
    const request = e.target.dataset.element;
    const taskId = e.target.closest('li').getAttribute('data-id');
    switch (request) {
        case 'check':
            changeTaskStatus(taskId);
            break;
        case 'edit':
            changeTaskContent(taskId)
            break;
        case 'delete':
            deleteTask(taskId);
            break;
    }
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
        li.innerHTML = prepareTodoContent(doc.data().content);
        todoList.appendChild(li);
    });
    todoList.addEventListener('click', e => handleUserRequests(e));
}