import { Dispatch } from 'react';
import { userAction } from '../reducers/authReducer';
import React from 'react';

interface AuthContextType {
  user: string;
  dispatch: Dispatch<userAction>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
