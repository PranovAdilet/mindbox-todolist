import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoFilters, TODOLIST_FILTERS_TYPES } from '@/features/todoFilters';
import { LocalStorageService } from '@/shared';

jest.mock('@/shared', () => ({
    LocalStorageService: {
        getTodolist: jest.fn(),
        setTodolist: jest.fn(),
    },
}));

describe('TodoFilters tests', () => {
    const setTodolistMock = jest.fn();
    const setFilterMock = jest.fn();

    beforeAll(() => {
        (LocalStorageService.getTodolist as jest.Mock).mockReturnValue([
            { id: 1, task: 'Task 1', isCompleted: false },
            { id: 2, task: 'Task 2', isCompleted: true },
        ]);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders TodoFilters correctly', () => {
        render(<TodoFilters setFilter={setFilterMock} filter="All" setTodolist={setTodolistMock} />);
        expect(screen.getByText('1 items left')).toBeInTheDocument();
    });

    test('filters by all', async () => {
        render(<TodoFilters setFilter={setFilterMock} filter={TODOLIST_FILTERS_TYPES.active} setTodolist={setTodolistMock} />);
        await userEvent.click(screen.getByTestId('filter-all'));
        expect(setFilterMock).toHaveBeenCalledWith(TODOLIST_FILTERS_TYPES.all);
    });

    test('filters by active', async () => {
        render(<TodoFilters setFilter={setFilterMock} filter={TODOLIST_FILTERS_TYPES.all} setTodolist={setTodolistMock} />);
        await userEvent.click(screen.getByTestId('filter-active'));
        expect(setFilterMock).toHaveBeenCalledWith(TODOLIST_FILTERS_TYPES.active);
    });

    test('filters by completed', async () => {
        render(<TodoFilters setFilter={setFilterMock} filter={TODOLIST_FILTERS_TYPES.all} setTodolist={setTodolistMock} />);
        await userEvent.click(screen.getByTestId('filter-completed'));
        expect(setFilterMock).toHaveBeenCalledWith(TODOLIST_FILTERS_TYPES.completed);
    });

    test('clears completed items', async () => {
        render(<TodoFilters setFilter={setFilterMock} filter={TODOLIST_FILTERS_TYPES.active} setTodolist={setTodolistMock} />);
        await userEvent.click(screen.getByTestId('clear-completed'));
        expect(setFilterMock).toHaveBeenCalledWith(TODOLIST_FILTERS_TYPES.all);
        expect(LocalStorageService.setTodolist).toHaveBeenCalledWith([{ id: 1, task: 'Task 1', isCompleted: false }]);
    });
});
