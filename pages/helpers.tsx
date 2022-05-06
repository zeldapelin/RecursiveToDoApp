import { v4 as uuidv4 } from "uuid";

export const taskDidChange = (tasks, modified) => {
    for (let current of tasks) {
        if (current.id === modified.id) {
            current.message = modified.message;
            current.done = modified.done;
        }
    }
    return tasks;
};

export const addEmptyItem = (tasks) => {
    const newTasks = [
        {
            id: uuidv4(),
            message: "",
            done: false,
            subTasks: [],
        },
        ...tasks,
    ];
    return newTasks;
};

