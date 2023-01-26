import { merge } from 'lodash';
import {
  Candidate,
  ResumeSettingsType,
  ResumeType,
  SectionType,
} from 'types/resume';

export enum ActionTypes {
  SetCandidate = 'SET_CANDIDATE',
  AddSection = 'ADD_SECTION',
  UpdateSection = 'UPDATE_SECTION',
  DeleteSection = 'DELETE_SECTION',
  UpdateSettings = 'UPDATE_SETTINGS',
}

export type ResumeReducerAction = {
  type: string;
  payload: Partial<Candidate> | Partial<SectionType>;
};

const resumeReducer = (
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

    case ActionTypes.UpdateSettings: {
      const payload = action.payload as Partial<ResumeSettingsType>;
      return {
        ...state,
        settings: merge(state.settings, payload),
      };
    }
    default:
      return state;
  }
};
export default resumeReducer;
