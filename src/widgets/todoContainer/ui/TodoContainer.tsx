import {useEffect, useState} from "react";
import {TodoForm} from "@/features/todoForm";
import {Todolist} from "@/features/todolist";
import {TodoFilters, TODOLIST_FILTERS_TYPES} from "@/features/todoFilters";
import {LocalStorageService, TodoItemTypes} from "@/shared";
import styles from "./styles.module.scss"

const TodoContainer = () => {
    const todolistFromStorage = () => {
        const newTodolist = LocalStorageService.getTodolist()
        if (!newTodolist?.length) {
            LocalStorageService.setTodolist([])
            return []
        }
        return newTodolist
    }
    const [todolist, setTodolist] = useState<TodoItemTypes[]>(todolistFromStorage())
    const [filter, setFilter] = useState<string>(TODOLIST_FILTERS_TYPES.all);

    useEffect(() => {
        const newTodolist = LocalStorageService.getTodolist();
        applyFilter(filter, newTodolist);
    }, [filter]);

    const applyFilter = (filterType: string, list: TodoItemTypes[]) => {
        switch (filterType) {
            case TODOLIST_FILTERS_TYPES.active:
                setTodolist(list.filter(todo => !todo.isCompleted));
                break;
            case TODOLIST_FILTERS_TYPES.completed:
                setTodolist(list.filter(todo => todo.isCompleted));
                break;
            default:
                setTodolist(list);
        }
    };

    useEffect(() => {
        const newTodolist = LocalStorageService.getTodolist()
        applyFilter(filter, newTodolist);
    }, [])

    return (
        <div className={styles.container}>
            <h1 className="h1">todos</h1>
            <div className={styles.container__content}>
                <TodoForm setTodolist={setTodolist}/>
                <Todolist todolist={todolist} setTodolist={setTodolist} filter={filter}/>
                <TodoFilters filter={filter} setFilter={setFilter} setTodolist={setTodolist}/>
            </div>
        </div>
    );
};

export default TodoContainer;