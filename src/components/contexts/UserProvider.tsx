import { ReactNode, useReducer, createContext } from 'react';
import { User } from 'types/user';

type DispatchUserContextT = unknown;

export const DispatchUserContext = createContext<DispatchUserContextT | null>(
  null
);
export const UserContext = createContext<User | null>(null);

type DispatchActionType = {
  type: 'set' | 'update';
  payload: User;
};

const reducer = (
  state: User | null,
  action: DispatchActionType
): User | null => {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'update':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

const UserProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [state, dispatch] = useReducer(reducer, null);

  return (
    <DispatchUserContext.Provider value={dispatch}>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </DispatchUserContext.Provider>
  );
};

export default UserProvider;
