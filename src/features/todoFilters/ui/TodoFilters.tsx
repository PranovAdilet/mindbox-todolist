import {FC} from "react";
import clsx from "clsx";
import {LocalStorageService, TodoItemTypes} from "@/shared";
import { TodoFiltersProps } from "../model/types.ts";
import {TODOLIST_FILTERS_TYPES} from "../model/consts.ts";
import styles from "./styles.module.scss";

const TodoFilters: FC<TodoFiltersProps> = ({ setFilter, filter, setTodolist }) => {

    const handleClick = (filter: string) => {
        setFilter(filter);
    };

    const todolistFromStorage: TodoItemTypes[] = LocalStorageService.getTodolist() || []
    const filteredTodolist = todolistFromStorage.filter(todo => !todo.isCompleted);

    const handleClear = () => {
        const activeTodolist = todolistFromStorage.filter(todo => !todo.isCompleted);
        LocalStorageService.setTodolist(activeTodolist);

        setTodolist(activeTodolist);
        setFilter(TODOLIST_FILTERS_TYPES.all)
    };

    return (
        <div className={styles.filters}>
            <h4 className={styles.filters__button}>
                {filteredTodolist.length} items left
            </h4>
            <div className={styles.filters__buttons}>
                <button
                    onClick={() => handleClick(TODOLIST_FILTERS_TYPES.all)}
                    className={clsx(styles.filters__button, filter === TODOLIST_FILTERS_TYPES.all && styles.active)}
                    data-testid="filter-all"
                >
                    All
                </button>
                <button
                    onClick={() => handleClick(TODOLIST_FILTERS_TYPES.active)}
                    className={clsx(styles.filters__button, filter === TODOLIST_FILTERS_TYPES.active && styles.active)}
                    data-testid="filter-active"
                >
                    Active
                </button>
                <button
                    onClick={() => handleClick(TODOLIST_FILTERS_TYPES.completed)}
                    className={clsx(styles.filters__button, filter === TODOLIST_FILTERS_TYPES.completed && styles.active)}
                    data-testid="filter-completed"
                >
                    Completed
                </button>
            </div>
            <button
                onClick={handleClear}
                className={styles.filters__button}
                data-testid="clear-completed"> Clear completed
            </button>
        </div>
    );
};

export default TodoFilters;
