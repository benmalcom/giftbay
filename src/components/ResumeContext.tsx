import React, { useReducer } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { ResumeType, Candidate, SectionType } from 'types/resume';

export type ResumeContextType = {
  resume: ResumeType;
  setCandidate(candidate: Partial<Candidate>): void;
  addSection(): void;
  updateSection(section: SectionType): void;
  removeSection(id: string): void;
};

export enum ActionTypes {
  SetCandidate = 'SET_CANDIDATE',
  AddSection = 'ADD_SECTION',
  UpdateSection = 'UPDATE_SECTION',
  DeleteSection = 'DELETE_SECTION',
}

type ResumeReducerAction = {
  type: string;
  payload: Partial<Candidate> | Partial<SectionType>;
};

export const resumeReducer = (
  state: ResumeType,
  action: ResumeReducerAction
): ResumeType => {
  switch (action.type) {
    case ActionTypes.SetCandidate:
      return {
        ...state,
        candidate: Object.assign({}, state.candidate, action.payload),
      };
    case ActionTypes.AddSection: {
      return {
        ...state,
        sections: [...state.sections, action.payload as SectionType],
      };
    }
    case ActionTypes.UpdateSection: {
      const sections = state.sections.slice();
      const payload = action.payload as SectionType;
      const index = sections.findIndex(item => item.id === payload.id);
      if (index > -1) {
        sections[index] = Object.assign({}, sections[index], payload);
      }

      return {
        ...state,
        sections,
      };
    }
    case ActionTypes.DeleteSection: {
      const payload = action.payload as SectionType;
      return {
        ...state,
        sections: state.sections.filter(section => section.id !== payload.id),
      };
    }
    default:
      return state;
  }
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
  const [state, dispatch] = useReducer<
    (state: ResumeType, action: ResumeReducerAction) => ResumeType
  >(resumeReducer, initialResume);

  const setCandidate = (candidate: Partial<Candidate>) => {
    dispatch({ type: ActionTypes.SetCandidate, payload: candidate });
  };
  const addSection = () => {
    dispatch({
      type: ActionTypes.AddSection,
      payload: { id: uuidV4(), items: [] },
    });
  };
  const updateSection = (section: SectionType) => {
    dispatch({ type: ActionTypes.UpdateSection, payload: section });
  };
  const removeSection = (id: string) => {
    dispatch({ type: ActionTypes.DeleteSection, payload: { id } });
  };

  return (
    <ResumeContext.Provider
      value={{
        resume: state,
        setCandidate,
        addSection,
        updateSection,
        removeSection,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
