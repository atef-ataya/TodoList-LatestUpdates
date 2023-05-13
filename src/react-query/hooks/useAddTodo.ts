import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from './useTodos';
import axios from 'axios';
import { CACHE_KEY_TODOS } from '../constants';

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then((res) => res.data),

    //Optimistic Updates
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
      //APPROACH 1: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ['todos'],
      // });

      //APPROACH 2: Updating the data in the cache directly
      // queryClient.setQueryData<Todo[]>(['todos'], (todos) => [
      //   savedTodo,
      //   ...(todos || []),
      // ]);

      //Optimitistic Updates
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
