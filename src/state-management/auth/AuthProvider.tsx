import { useReducer } from 'react';
import AuthContext from './authContext';

interface login {
  type: 'LOGIN';
  user: string;
}

interface logout {
  type: 'LOGOUT';
}

export type userAction = login | logout;

const authReducer = (user: string, action: userAction): string => {
  switch (action.type) {
    case 'LOGIN':
      return (user = action.user);
    case 'LOGOUT':
      return (user = '');
    default:
      return user;
  }
};

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(authReducer, '');

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
