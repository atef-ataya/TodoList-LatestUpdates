import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import APIClient from '../services/apiClient';
import { CACHE_KEY_TODOS } from '../constants';
import { Todo } from './useTodos';

const apiClient = new APIClient<Todo>('/todos');
interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: apiClient.post,

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
