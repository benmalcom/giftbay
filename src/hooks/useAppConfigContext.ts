import { useContext } from 'react';
import { AppConfigContext } from 'contexts/AppConfigProvider';

function useAppConfigContext() {
  const context = useContext(AppConfigContext);
  if (context === null) {
    throw new Error('useAppConfigContext must be within ContextProvider');
  }

  return context;
}

export default useAppConfigContext;
