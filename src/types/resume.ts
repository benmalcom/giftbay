export enum SectionItemType {
  JobRole = 'JOB_ROLE',
  JobFunctions = 'JOB_FUNCTIONS',
  InlineList = 'INLINE_LIST',
  SectionParagraph = 'SECTION_PARAGRAPH',
}
export type SectionItem = {
  type: SectionItemType;
  order: number;
};

export type JobFunctionType = {
  id: string;
  text: string;
  jobRoleId: string;
};

export type SectionParagraphType = {
  id: string;
  text: string;
  sectionId: string;
};

export type JobRoleType = {
  id: string;
  sectionId: string;
  name: string;
  company: string;
  location: string;
  duration: string;
  isInline?: boolean;
  jobFunctions: JobFunctionType[];
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
  settings: ResumeSettingsType;
};

export type Candidate = {
  name: string;
  headline: string;
  contactsAndLinks: ContactsAndLinksType;
};

export type SectionType = {
  id: string;
  name?: string;
  items: Array<
    SectionItem & {
      content: JobRoleType | ItemListType | SectionParagraphType;
    }
  >;
};

export type ResumeSettingsType = {
  colors: {
    accent: string;
    common: string;
    candidateHeadline: string;
    candidateContactsAndLinks: string;
    jobFunctions: string;
    jobRoleName: string;
    jobRoleDuration: string;
    jobRoleCompanyLocation: string;
  };
};

export type ItemListType = {
  id: string;
  name: string;
  content: string;
  sectionId: string;
};

export type ResumeData = {
  id: string;
  user: string;
  name?: string;
  contents: string;
  fileContents?: string;
  updatedAt: string;
};
