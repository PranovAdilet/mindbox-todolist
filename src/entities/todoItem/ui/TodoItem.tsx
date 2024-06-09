import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {Check} from "lucide-react";
import {LocalStorageService, TODOLIST_FILTERS_TYPES} from "@/shared";
import {TodoItemProps} from "../model/types.ts";
import {useOutside} from "../model/useOutside.ts"
import styles from "./styles.module.scss"

const TodoItem:FC<TodoItemProps> = ({item, setTodolist, filter}) => {
    const { task, isCompleted, id } = item

    const [text, setText] = useState(item.task)
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        ref,
        isEdit,
        setIsEdit,
    } = useOutside(() => handleSubmit())

    useEffect(() => {
        if (inputRef.current){
            inputRef.current.focus()
        }
    }, [isEdit]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    const handleComplete = () => {
        setTodolist(prevState => {
            const updatedTodolist = prevState.map(todo => {
                if (todo.id === id) {
                    const updatedTodo = {...todo, isCompleted: !todo.isCompleted}
                    LocalStorageService.setTodoItem(updatedTodo)
                    return updatedTodo
                }
                return todo
            })

            const newTodolist = updatedTodolist.filter(todo => {
                if (filter === TODOLIST_FILTERS_TYPES.active) {
                    return !todo.isCompleted;
                }
                if (filter === TODOLIST_FILTERS_TYPES.completed) {
                    return todo.isCompleted;
                }
                return true;
            });

            return newTodolist;
        })
    }

    const handleEdit = () => {
        if (isEdit){
            handleSubmit()
        }
        setIsEdit(!isEdit)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }
    const handleSubmit = () => {
        setTodolist(prevState => {
            const updatedTodolist = prevState.map(el => {
                if (el.id === item.id){
                    const updatedTodo = {...el, task: text}
                    LocalStorageService.setTodoItem(updatedTodo)

                    return updatedTodo
                }
                return el
            })
            return updatedTodolist
        })
        setIsEdit(false)
    }

    return (
        <li className={styles.item} ref={ref}>
            <div className={styles.item__content}>
                <button
                    onClick={handleComplete}
                    className={clsx(styles.item__checkbox, isCompleted && styles.active)}
                    data-testid="checkbox">
                    {
                        isCompleted && <Check/>
                    }
                </button>

                {
                    isEdit &&
                    <input
                        ref={inputRef}
                        value={text}

                        onChange={handleChange}
                        onKeyDown={handleKeyDown}

                        type="text"
                        data-testid="input"
                        className={clsx(styles.item__input, isCompleted && styles.active)}
                    />
                }
                {
                    !isEdit && <h4 className={clsx(styles.item__task, isCompleted && styles.active)}>{task}</h4>
                }
            </div>
            <button className={styles.item__editButton} onClick={handleEdit} type="button" data-testid="edit">
                {
                    isEdit ? "Сохранить" : "Изменить"
                }
            </button>
        </li>
    );
};

export default TodoItem;