import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import APIClient from '../services/apiClient';

const apiClient = new APIClient<Todo>('/todos');

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiClient.getAll,
    staleTime: 1 * 60 * 1000,
  });

export default useTodos;
