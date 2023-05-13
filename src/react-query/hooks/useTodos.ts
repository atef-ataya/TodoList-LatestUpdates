import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import todoService, { Todo } from '../services/todoService';

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 1 * 60 * 1000,
  });

export default useTodos;
