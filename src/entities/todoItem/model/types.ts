import {TodoItemTypes} from "@/shared";
import {Dispatch, SetStateAction} from "react";

export interface TodoItemProps{
    item: TodoItemTypes
    filter: string
    setTodolist: Dispatch<SetStateAction<TodoItemTypes[]>>
}