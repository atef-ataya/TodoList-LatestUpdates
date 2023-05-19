import { useReducer } from 'react';
import './App.css';
import LoginStatus from './state-management/LoginStatus';
import tasksReducers from './state-management/reducers/tasksReducer';
import NavBar from './routing/NavBar';
import HomePage from './routing/HomePage';
import TasksContext from './state-management/contexts/tasksContext';
import authReducer from './state-management/reducers/authReducer';
import AuthContext from './state-management/contexts/authContext';
import AuthProvider from './state-management/AuthProvider';

function App() {
  const [tasks, tasksDispatch] = useReducer(tasksReducers, []);

  return (
    <AuthProvider>
      <TasksContext.Provider value={{ tasks, dispatch: tasksDispatch }}>
        <NavBar />
        <HomePage />
      </TasksContext.Provider>
    </AuthProvider>
  );
}

export default App;
