import { ReactNode, useReducer, createContext } from 'react';
import { AppConfig } from 'types/common';

const initialState: AppConfig = { layoutOrientation: 'vertical' };

type DispatchUserContextT = unknown;

export const DispatchAppConfigContext =
  createContext<DispatchUserContextT | null>(null);
export const AppConfigContext = createContext<AppConfig>(initialState);

type DispatchActionType = {
  type: 'set' | 'update';
  payload: AppConfig;
};

const reducer = (state: AppConfig, action: DispatchActionType): AppConfig => {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'update':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

const AppConfigProvider = ({ children, ...props }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...props });

  return (
    <DispatchAppConfigContext.Provider value={dispatch}>
      <AppConfigContext.Provider value={state}>
        {children}
      </AppConfigContext.Provider>
    </DispatchAppConfigContext.Provider>
  );
};

export default AppConfigProvider;
