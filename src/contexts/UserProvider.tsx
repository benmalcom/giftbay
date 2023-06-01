import { ReactNode, useReducer, createContext, Dispatch } from 'react';
import { User } from 'types/user';

const initialState = null;

type DispatchUserContextT = Dispatch<DispatchActionType>;

export const DispatchUserContext = createContext<DispatchUserContextT>(
  () => null
);
export const UserContext = createContext<User | null>(null);

type DispatchActionType = {
  type: 'set' | 'update';
  payload: User | null;
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

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchUserContext.Provider value={dispatch}>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </DispatchUserContext.Provider>
  );
};

export default UserProvider;
