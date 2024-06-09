import {Dispatch, SetStateAction} from "react";
import type {TodoItemTypes} from "@/shared";

export interface TodoFiltersProps{
    setTodolist: Dispatch<SetStateAction<TodoItemTypes[]>>

    filter: string
    setFilter: (v:string) => void
}