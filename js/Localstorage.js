import { prepareTodoElement } from "./DOMElements.js";

export const loadTasksFromLocalStorage = () => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
        info.innerText = '';
        taskList.forEach(savedTask => {
            const task = prepareTodoElement(savedTask.id, savedTask.content, savedTask.isFinished);
            const list = document.querySelector('[data-element="list"]');
            list.append(task);
        });
    }
};

export const saveTaskInLocalStorage = (id, taskContent, taskStatus) => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    let newTask = {
        id: id,
        content: taskContent,
        isFinished: taskStatus
    }
    taskList = [...taskList, newTask];
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

export const updateLocalStorage = (id, newTaskContent, taskStatus) => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    const oldTaskIndex = taskList.findIndex(task => {
        return task.id === id;
    });
    const newTask = {
        id: id,
        content: newTaskContent,
        isFinished: taskStatus
    }
    taskList.splice(oldTaskIndex, 1, newTask);
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

export const removeTaskFromLocalStorage = id => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    const taskIndex = taskList.findIndex(task => {
        return task.id === id;
    });
    taskList.splice(taskIndex,1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
};


