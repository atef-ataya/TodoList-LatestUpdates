import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import todoService, { Todo } from '../services/todoService';

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,

    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) => [
        newTodo,
        ...oldTodos,
      ]);

      onAdd();

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTdoo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (todos) => {
        return todos?.map((todo) => (todo === newTdoo ? savedTodo : todo));
      });
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos);
    },
  });
};

export default useAddTodo;
