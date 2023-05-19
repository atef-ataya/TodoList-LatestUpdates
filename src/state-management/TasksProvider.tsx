import React, { useReducer } from 'react';
import tasksReducers from './reducers/tasksReducer';
import TasksContext from './contexts/tasksContext';

interface Props {
  children: React.ReactNode;
}

const TasksProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(tasksReducers, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
