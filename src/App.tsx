import { useReducer } from 'react';
import './App.css';
import LoginStatus from './state-management/LoginStatus';
import tasksReducers from './state-management/reducers/tasksReducer';
import NavBar from './routing/NavBar';
import HomePage from './routing/HomePage';
import TasksContext from './state-management/contexts/tasksContext';

function App() {
  const [tasks, dispatch] = useReducer(tasksReducers, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      <NavBar />
      <HomePage />
    </TasksContext.Provider>
  );
}

export default App;
