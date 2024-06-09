import {FC} from "react";
import {TodoItem} from "@/entities/todoItem";
import {TodoListProps} from "../model/types.ts";
import styles from "./styles.module.scss"

const Todolist: FC<TodoListProps> = ({todolist, setTodolist, filter}) => {

    return (
        <div className={styles.todolist}>
            <ul className={styles.todolist__list}>
                {
                    todolist?.map(todo =>
                        <TodoItem
                            key={todo.id}
                            item={todo}
                            setTodolist={setTodolist}
                            filter={filter}
                        />
                    )
                }
                {
                    !todolist?.length && <h3 className={styles.todolist__emptyText}>Тут пусто</h3>
                }
            </ul>

        </div>
    );
};

export default Todolist;