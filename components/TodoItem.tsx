import { v4 as uuidv4 } from "uuid";
import cx from "classnames";
// @ts-ignore
import styles from "../styles/Home.module.css";
import { taskDidChange, addEmptyItem } from "../pages/helpers";
const TodoItem = (props) => {
    const {
        task,
        didChangeTask,
        didAddTask,
        placeHolderText,
        displayElement,
        didDeleteTask,
    } = props;
    const subTasks = task.subTasks;
    const inputStyle = task.done ? cx(styles.inputDone) : cx(styles.input);

    const handleEnter = (e) => {
        if (e.key === "Enter" && task.message && !displayElement) {
            didAddTask();
        }
    };

    return (
        <div>
            <div className={cx(styles.inputDiv)}>
                {displayElement && (
                    <input
                        type="checkbox"
                        className={cx(styles.checkBox)}
                        onChange={() => {
                            const doneTask = { ...task, done: !task.done };
                            didChangeTask(doneTask);
                        }}
                    />
                )}
                <input
                    type="text"
                    value={task.message}
                    className={inputStyle}
                    placeholder={placeHolderText}
                    onChange={(e) => {
                        const modified = { ...task, message: e.target.value };
                        didChangeTask(modified);
                    }}
                    onKeyDown={(e) => handleEnter(e)}
                />
                {displayElement && (
                    <button
                        className={cx(styles.button)}
                        onClick={() => {
                            const newSubTasks = addEmptyItem(subTasks);
                            task.subTasks = newSubTasks;
                            didChangeTask(task);
                        }}
                    >
                        Add subtask
                    </button>
                )}
                {displayElement && (
                    <button
                        className={cx(styles.btn)}
                        onClick={() => didDeleteTask(task)}
                    >
                        Delete
                    </button>
                )}
            </div>

            <ul className="container mx-auto">
                {subTasks.map((subTask, index) => {
                    return (
                        <li key={index} className="ml-5">
                            <TodoItem
                                task={subTask}
                                displayElement={index !== 0}
                                placeHolderText={"Add a subtask to above task and press enter"}
                                didChangeTask={(modifiedSubTask) => {
                                    const newSubTasks = taskDidChange(subTasks, modifiedSubTask);
                                    task.subTasks = newSubTasks;
                                    didChangeTask(task);
                                }}
                                didAddTask={() => {
                                    const newSubTasks = addEmptyItem(subTasks);
                                    task.subTasks = newSubTasks;
                                    didChangeTask(task);
                                }}
                                didDeleteTask={(subTaskToDelete) => {
                                    const newSubTasks = subTasks.filter(
                                        (subTask) => subTaskToDelete.id !== subTask.id
                                    );
                                    task.subTasks = [...newSubTasks];
                                    didChangeTask(task);
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TodoItem;