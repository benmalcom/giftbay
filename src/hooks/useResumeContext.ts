import { useContext } from 'react';
import { ResumeContext } from 'components/ResumeContext';

function useResumeContext() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be within ContextProvider');
  }

  return context;
}

export default useResumeContext;
