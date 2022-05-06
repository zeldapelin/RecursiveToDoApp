import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import cx from "classnames";
// @ts-ignore
import styles from "../styles/Home.module.css";
import TodoItem from "../components/TodoItem";
import { taskDidChange, addEmptyItem } from "./helpers";

const Home = () => {
    const [tasks, setTasks] = useState([
        {
            id: uuidv4(),
            message: "",
            done: false,
            subTasks: [],
        },
    ]);
   
    return (
        <div className="container mx-auto">
            <header className={cx(styles.header)}>
                <h1>My Tasks</h1>
            </header>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <TodoItem
                            task={task}
                            displayElement={index !== 0}
                            placeHolderText={"Write your task and press enter"}
                            didChangeTask={(modified) => {
                                const copied = [...tasks];
                                const newTasks = taskDidChange(copied, modified);
                                setTasks(newTasks);
                            }}
                            didAddTask={() => {
                                const newTasks = addEmptyItem(tasks);
                                setTasks(newTasks);
                            }}
                            didDeleteTask={(taskToDelete) => {
                                const newTasks = tasks.filter(
                                    (task) => taskToDelete.id !== task.id
                                );
                                setTasks(newTasks);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;