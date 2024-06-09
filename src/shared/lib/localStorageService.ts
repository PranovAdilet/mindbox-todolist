import {TodoItemTypes} from "@/shared";

export const LocalStorageService = {
    setTodolist: (todolist: TodoItemTypes[] | []) => {
        localStorage.setItem("todolist", JSON.stringify(todolist))
    },
    getTodolist: () => {
        const todolist = JSON.parse(localStorage.getItem("todolist") as string) || []
        return todolist
    },
    setTodoItem: (todo: TodoItemTypes) => {
        const todolist: TodoItemTypes[] = LocalStorageService.getTodolist()
        const updatedTodolist = todolist.map(item => {
            if (item.id === todo.id) {
                return todo
            }

            return item
        })
        LocalStorageService.setTodolist(updatedTodolist)
    }

}