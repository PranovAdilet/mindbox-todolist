import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { LocalStorageService } from "@/shared";
import { TodoFormProps } from "../model/types.ts";
import { DATA_THEME } from "../model/consts.ts";
import styles from "./styles.module.scss";

const TodoForm: FC<TodoFormProps> = ({ setTodolist }) => {
    const themeFromStorage = localStorage.getItem("theme") || DATA_THEME.light;

    const [theme, setTheme] = useState(themeFromStorage);
    const [task, setTask] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTask(event.target.value);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!task.length) return;
        setTodolist((prevState) => {
            const newTask = {
                task,
                id: Date.now(),
                isCompleted: false,
            };
            const newState = [...prevState, newTask];
            LocalStorageService.setTodolist(newState);
            return newState;
        });
        setTask("");
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === DATA_THEME.light ? DATA_THEME.dark : DATA_THEME.light;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form__content}>
                <label className={styles.form__label}>
                    <button data-testid="submit-button" type="submit" className={styles.form__button}>
                        <ChevronDown />
                    </button>
                    <input
                        value={task}
                        onChange={handleChange}
                        type="text"
                        placeholder="What needs to be done?"
                        className={styles.form__input}
                    />
                </label>
                <button data-testid="theme-button" onClick={toggleTheme} type="button" className={styles.form__theme}>
                    {theme === DATA_THEME.light ? <Moon className={styles.form__moon}/> : <Sun className={styles.form__sun}/>}
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
