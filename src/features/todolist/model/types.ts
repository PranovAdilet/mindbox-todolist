import type {TodoItemTypes} from "@/shared";
import {Dispatch, SetStateAction} from "react";

export interface TodoListProps{
    todolist: TodoItemTypes[]
    filter: string
    setTodolist: Dispatch<SetStateAction<TodoItemTypes[]>>
}