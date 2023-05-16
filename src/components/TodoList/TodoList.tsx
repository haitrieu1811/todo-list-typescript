import { useEffect, useState } from 'react';

import { Todo } from '../../@types/todo.type';
import TaskInput from '../TaskInput/TaskInput';
import TaskList from '../TaskList/TaskList';
import styles from './TodoList.module.scss';

// interface HandleNewTodos {
//     (todos: Todo[]): Todo[];
// }

type HandleNewTodos = (todos: Todo[]) => Todo[];

const syncReactInLocal = (handleNewTodos: HandleNewTodos) => {
    const todosString = localStorage.getItem('todos');
    const todosObj = JSON.parse(todosString || '[]');
    const newTodos = handleNewTodos(todosObj);
    localStorage.setItem('todos', JSON.stringify(newTodos));
};

const TodoList = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

    const unFinishedTodos = todoList.filter((todo) => !todo.done);
    const finishedTodos = todoList.filter((todo) => todo.done);

    useEffect(() => {
        const todosString = localStorage.getItem('todos');
        const todosObj = JSON.parse(todosString || '[]');
        setTodoList(todosObj);
    }, []);

    // ADD TODO
    const handleAddTodo = (todoName: string) => {
        if (todoName.trim()) {
            const newTodo: Todo = {
                name: todoName,
                done: false,
                id: new Date().toISOString()
            };
            setTodoList((prevState) => [newTodo, ...prevState]);
            syncReactInLocal((todosObj: Todo[]) => [newTodo, ...todosObj]);
        }
    };

    // FINISH TODO
    const handleFinishTodo = (todoId: string, done: boolean) => {
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === todoId) return { ...todo, done };
                return todo;
            });
        };
        setTodoList(handler);
        syncReactInLocal(handler);
    };

    // START UPDATE TODO
    const startUpdateTodo = (todo: Todo) => {
        if (todo) setCurrentTodo(todo);
    };

    // EDIT TODO
    const handleEditTodo = (todoName: string) => {
        setCurrentTodo((prevState) => {
            if (prevState) return { ...prevState, name: todoName };
            return null;
        });
    };

    // FINISH UPDATE TODO
    const finishUpdateTodo = () => {
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === currentTodo?.id) return currentTodo;
                return todo;
            });
        };
        setTodoList(handler);
        setCurrentTodo(null);
        syncReactInLocal(handler);
    };

    // DELETE TODO
    const handleDeleteTodo = (todoId: string) => {
        if (currentTodo) setCurrentTodo(null);
        const handler = (todosObj: Todo[]) => {
            return todosObj.filter((todo) => todo.id !== todoId);
        };
        setTodoList(handler);
        syncReactInLocal(handler);
    };

    return (
        <div className={styles.wrapper}>
            <TaskInput
                addTodo={handleAddTodo}
                editTodo={handleEditTodo}
                currentTodo={currentTodo}
                finishUpdateTodo={finishUpdateTodo}
            />
            <TaskList
                doneTaskList={false}
                todoList={unFinishedTodos}
                finishTodo={handleFinishTodo}
                startUpdateTodo={startUpdateTodo}
                deleteTodo={handleDeleteTodo}
            />
            <TaskList
                doneTaskList={true}
                todoList={finishedTodos}
                finishTodo={handleFinishTodo}
                startUpdateTodo={startUpdateTodo}
                deleteTodo={handleDeleteTodo}
            />
        </div>
    );
};

export default TodoList;
