export enum SectionItemType {
  JobRole = 'JOB_ROLE',
  JobFunctions = 'JOB_FUNCTIONS',
  InlineList = 'INLINE_LIST',
  Paragraph = 'PARAGRAPH',
}
export type SectionItem = {
  type: SectionItemType;
  order: number;
};

export type JobRoleType = {
  id: string;
  name: string;
  company: string;
  location: string;
  duration: string;
};

export type ContactsAndLinksType = {
  email: string;
  linkedIn: string;
  github?: string;
};

export type ModalTriggerFunctionProps = {
  trigger: () => void;
};

export type ResumeType = {
  candidate: Candidate;
  sections: SectionType[];
};

export type Candidate = {
  name: string;
  headline: string;
  contactsAndLinks: ContactsAndLinksType;
};

export type SectionType = {
  id: string;
  name?: string;
  items: Array<SectionItem & { content: JobRoleType | JobFunctionType[] }>;
};

export type JobFunctionType = {
  id: string;
  text: string;
};
