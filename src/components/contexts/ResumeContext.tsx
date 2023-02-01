import React, { useEffect, useReducer } from 'react';
import { v4 as uuidV4 } from 'uuid';
import {
  ResumeType,
  Candidate,
  SectionType,
  ResumeSettingsType,
} from 'types/resume';
import resumeReducer, {
  ActionTypes,
  ResumeReducerAction,
} from './resumeReducer';

export type ResumeContextType = {
  resume: ResumeType;
  setCandidate(candidate: Partial<Candidate>): void;
  addSection(name: string): void;
  updateSection(section: SectionType): void;
  removeSection(id: string): void;
  updateResumeSettings(values: Partial<ResumeSettingsType>): void;
  setResume(values: Partial<ResumeType>): void;
};

export const ResumeContext = React.createContext<ResumeContextType | undefined>(
  undefined
);

type ResumeContextProviderType = {
  children: React.ReactNode;
  initialResume: ResumeType;
};

export const ResumeContextProvider: React.FC<ResumeContextProviderType> = ({
  initialResume,
  children,
}) => {
  const [resume, dispatch] = useReducer<
    (state: ResumeType, action: ResumeReducerAction) => ResumeType
  >(resumeReducer, initialResume);

  const setCandidate = (candidate: Partial<Candidate>) => {
    dispatch({ type: ActionTypes.SetCandidate, payload: candidate });
  };
  const addSection = (name: string) => {
    dispatch({
      type: ActionTypes.AddSection,
      payload: { id: uuidV4(), name, items: [] },
    });
  };
  const updateSection = (section: SectionType) => {
    dispatch({ type: ActionTypes.UpdateSection, payload: section });
  };
  const removeSection = (id: string) => {
    dispatch({ type: ActionTypes.DeleteSection, payload: { id } });
  };

  const updateResumeSettings = (values: Partial<ResumeSettingsType>) =>
    dispatch({ type: ActionTypes.UpdateSettings, payload: values });

  const setResume = (values: Partial<ResumeType>) =>
    dispatch({ type: ActionTypes.SetResume, payload: values });

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setCandidate,
        addSection,
        updateSection,
        removeSection,
        updateResumeSettings,
        setResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
