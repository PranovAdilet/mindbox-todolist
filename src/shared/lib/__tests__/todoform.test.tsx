import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TodoForm} from '@/features/todoForm';

describe("TodoForm", () => {
    const setTodolistMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('TodoForm renders correctly', () => {
        render(<TodoForm setTodolist={setTodolistMock} />);
        const inputElement = screen.getByPlaceholderText('What needs to be done?');
        expect(inputElement).toBeInTheDocument();
    });

    test('TodoForm submits a task', async () => {
        render(<TodoForm setTodolist={setTodolistMock} />);
        const inputElement = screen.getByPlaceholderText('What needs to be done?');
        const submitButton = screen.getByTestId('submit-button');

        await userEvent.type(inputElement, 'New Task');
        await userEvent.click(submitButton);

        expect(setTodolistMock).toHaveBeenCalled();
        expect(setTodolistMock).toHaveBeenCalledWith(expect.any(Function));
    });

    test("Theme changes after clicking", async () => {
        render(<TodoForm setTodolist={setTodolistMock} />);
        const themeButton = screen.getByTestId('theme-button');
        const initialTheme = document.documentElement.getAttribute("data-theme");

        await userEvent.click(themeButton);

        const updatedTheme = document.documentElement.getAttribute("data-theme");

        if (initialTheme === "light") {
            expect(updatedTheme).toBe("dark");
        } else {
            expect(updatedTheme).toBe("light");
        }
    });
});
