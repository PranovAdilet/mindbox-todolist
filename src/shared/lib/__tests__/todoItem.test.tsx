import {fireEvent, render} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {TodoItem} from "@/entities/todoItem";


describe("todoItem tests", () => {
    const setTodolistMock = jest.fn()
    const item = {id: Date.now(), task: "Buy something", isCompleted: false}

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("TodoItem changes after clicking", async () => {
        const {getByTestId} = render(<TodoItem filter="All" item={item} setTodolist={setTodolistMock}/>)
        const button = getByTestId("checkbox")

        await userEvent.click(button)
        expect(setTodolistMock).toHaveBeenCalled()
    })

    test("Submitting after click on Enter", () => {
        const { getByTestId } = render(<TodoItem filter="All" item={item} setTodolist={setTodolistMock} />);

        fireEvent.click(getByTestId("edit"));

        const input = getByTestId("input");

        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(setTodolistMock).toHaveBeenCalled();
    });

    test("Submitting after click on Save", () => {
        const { getByTestId } = render(<TodoItem filter="All" item={item} setTodolist={setTodolistMock} />);

        fireEvent.click(getByTestId("edit"));
        fireEvent.click(getByTestId("edit"));

        expect(setTodolistMock).toHaveBeenCalled();
    });
})