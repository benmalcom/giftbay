import { useContext } from 'react';
import { UserContext } from 'contexts/UserProvider';

function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useAppConfigContext must be within ContextProvider');
  }

  return context;
}

export default useUserContext;
