import {Dispatch, SetStateAction} from "react";
import {TodoItemTypes} from "@/shared";

export interface TodoFormProps{
    setTodolist: Dispatch<SetStateAction<TodoItemTypes[]>>
}