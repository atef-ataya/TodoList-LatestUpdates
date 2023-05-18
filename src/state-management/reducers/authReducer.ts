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

export default authReducer;
