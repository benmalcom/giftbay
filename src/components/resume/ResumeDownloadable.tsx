import { PaperSize } from '@progress/kendo-drawing/pdf';
import { PDFExport } from '@progress/kendo-react-pdf';
import React, { forwardRef } from 'react';
import { ResumeContextType } from 'components/contexts';
import useResumeContext from 'hooks/useResumeContext';
import { ResumeType } from 'types/resume';
import { User } from 'types/user';
import { pdfPageSizes } from 'utils/constants';
import { formatResumeFilename } from 'utils/functions';
import Resume from './Resume';

type EditableResumeProps = {
  isEditable?: true;
  onSaveResume(): void;
} & Pick<
  ResumeContextType,
  'resume' | 'removeSection' | 'updateSection' | 'setCandidate'
>;

type NotEditableResumeProps = {
  isEditable?: false;
  resume: ResumeType;
  removeSection: never;
  updateSection: never;
  setCandidate: never;
  onSaveResume: never;
};

type ResumeProps = EditableResumeProps | NotEditableResumeProps;
type DownloadableResumeProps = ResumeProps & { user: User };

export const ResumeDownloadable = forwardRef<
  PDFExport,
  DownloadableResumeProps
>(
  (
    {
      resume,
      removeSection,
      updateSection,
      setCandidate,
      user,
      isEditable,
      onSaveResume,
    },
    pdfExportComponent
  ) => (
    <PDFExport
      // @ts-ignore: Typescript misbehaviour
      paperSize={pdfPageSizes.US}
      scale={0.645}
      avoidLinks
      keepTogether=".job-function-item"
      fileName={formatResumeFilename(resume)}
      ref={pdfExportComponent}
      author={user.name}
      creator={process.env.NEXT_PUBLIC_APP_NAME}
      title={`${resume.candidate.name} - Resume`}
    >
      <Resume
        isEditable={isEditable}
        resume={resume}
        updateSection={updateSection}
        setCandidate={setCandidate}
        removeSection={removeSection}
        onSaveResume={onSaveResume}
      />
    </PDFExport>
  )
);

ResumeDownloadable.displayName = 'ResumeDownloadable';

export default ResumeDownloadable;

export const withDownloadCta = () =>
  // eslint-disable-next-line react/display-name
  forwardRef<
    PDFExport,
    { resume: ResumeType; user: User; isEditable?: boolean }
  >(({ isEditable, user, resume }, pdfExportComponent) => {
    const { updateSection, setCandidate, removeSection } = useResumeContext();
    const resumeProps = { resume, isEditable };
    if (isEditable) {
      Object.assign(resumeProps, {
        updateSection,
        setCandidate,
        removeSection,
      });
    }

    return (
      <PDFExport
        paperSize={pdfPageSizes.US as PaperSize}
        scale={0.645}
        avoidLinks
        fileName={formatResumeFilename(resume)}
        ref={pdfExportComponent}
        author={user.name}
        keepTogether=".job-function-item"
        creator={process.env.NEXT_PUBLIC_APP_NAME}
        title={`${resume.candidate.name} - Resume`}
      >
        <Resume {...resumeProps} />
      </PDFExport>
    );
  });
