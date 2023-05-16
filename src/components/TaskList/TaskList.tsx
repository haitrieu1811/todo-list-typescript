import PropTypes from 'prop-types';

import { Todo } from '../../@types/todo.type';
import { TodoTypes } from '../../PropTypes/todo.proptype';
import styles from './TaskList.module.scss';

interface Props {
    doneTaskList?: boolean;
    todoList?: Todo[];
    finishTodo: (todoId: string, done: boolean) => void;
    startUpdateTodo: (todo: Todo) => void;
    deleteTodo: (todoId: string) => void;
}

const TaskList = ({ doneTaskList, todoList, finishTodo, startUpdateTodo, deleteTodo }: Props) => {
    // CHECK TODO
    const handleCheckTodo = (todo: Todo) => {
        finishTodo(todo.id, !todo.done);
    };

    // HANDLE CHANGE MODE EDIT
    const handleUpdateTodo = (todo: Todo) => {
        startUpdateTodo(todo);
    };

    // HANDLE DELETE TODO
    const handleDeleteTodo = (todoId: string) => {
        deleteTodo(todoId);
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h1>
            {todoList && todoList.length > 0 ? (
                <div className={styles.list}>
                    {todoList?.map((todo) => (
                        <div key={todo.id} className={`${styles.item} ${todo.done ? styles.done : ''}`}>
                            <div className={styles.text}>
                                <input
                                    type='checkbox'
                                    id={`todo-${todo.name}`}
                                    checked={todo.done}
                                    className={styles.checkbox}
                                    onChange={() => handleCheckTodo(todo)}
                                />
                                <label htmlFor={`todo-${todo.name}`} className={styles.label}>
                                    {todo.name}
                                </label>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.action} onClick={() => handleUpdateTodo(todo)}>
                                    🖊️
                                </button>
                                <button className={styles.action} onClick={() => handleDeleteTodo(todo.id)}>
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>Chưa có todo nào</div>
            )}
        </div>
    );
};

TaskList.propTypes = {
    doneTaskList: PropTypes.bool,
    todoList: PropTypes.arrayOf(TodoTypes).isRequired,
    finishTodo: PropTypes.func.isRequired,
    startUpdateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TaskList;
