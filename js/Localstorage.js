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
            const task = prepareTodoElement(generateID(), savedTask);
            const list = document.querySelector('[data-element="list"]');
            list.append(task);
        });
    }
};

export const saveTaskInLocalStorage = taskContent => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    taskList = [...taskList, taskContent];
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

export const updateLocalStorage = (oldTaskContent, newTaskContent) => {
    let taskList;
    const info = document.querySelector('[data-element="info"]');
    if (localStorage.getItem("taskList") === null) {
        taskList = [];
        info.innerText = 'Brak zadań na liście!';
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    const oldTaskIndex = taskList.indexOf(oldTaskContent);
    taskList.fill(newTaskContent, oldTaskIndex, oldTaskIndex + 1);
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


