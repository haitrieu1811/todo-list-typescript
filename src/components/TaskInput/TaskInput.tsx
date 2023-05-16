import PropTypes from 'prop-types';
import { useState } from 'react';

import { Todo } from '../../@types/todo.type';
import { TodoTypes } from '../../PropTypes/todo.proptype';
import styles from './TaskInput.module.scss';

interface Props {
    addTodo: (todoName: string) => void;
    editTodo: (name: string) => void;
    currentTodo: Todo | null;
    finishUpdateTodo: () => void;
}

const TaskInput = ({ addTodo, editTodo, currentTodo, finishUpdateTodo }: Props) => {
    const [todoName, setTodoName] = useState<string>('');

    // CHANGE TODO NAME
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!currentTodo) setTodoName(value);
        else editTodo(value);
    };

    // SUBMIT ADD TODO
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentTodo) {
            addTodo(todoName);
            setTodoName('');
        } else {
            if (currentTodo) {
                finishUpdateTodo();
                if (todoName) setTodoName('');
            }
        }
    };

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>Todo List TypeScript</h1>
            <div className={styles.form}>
                <input
                    type='text'
                    placeholder='Type todo...'
                    value={currentTodo ? currentTodo.name : todoName}
                    className={styles.input}
                    onChange={handleChangeInput}
                />
                <button className={styles.btnAdd}>{!currentTodo ? '➕' : '✔️'}</button>
            </div>
        </form>
    );
};

TaskInput.propTypes = {
    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
    finishUpdateTodo: PropTypes.func.isRequired
};

export default TaskInput;
