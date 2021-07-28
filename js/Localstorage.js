import { prepareTodoElement } from "./DOMElements.js";
import { generateID } from "./Tools.js";

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
            const task = prepareTodoElement(generateID(), savedTask.content, savedTask.isFinished);
            const list = document.querySelector('[data-element="list"]');
            list.append(task);
        });
    }
};

export const saveTaskInLocalStorage = (taskContent, taskStatus) => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    let newTask = {
        content: taskContent,
        isFinished: taskStatus
    }
    taskList = [...taskList, newTask];
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

export const updateLocalStorage = (oldTaskContent, newTaskContent, taskStatus) => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }

    const oldTaskIndex = taskList.indexOf(oldTaskContent);

    const newTask = {
        content: newTaskContent,
        isFinished: taskStatus
    }
    taskList.splice(oldTaskIndex, 1, newTask);
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

export const removeTaskFromLocalStorage = taskContent => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    const taskIndex = taskList.indexOf(taskContent);
    taskList.splice(taskIndex,1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
};


