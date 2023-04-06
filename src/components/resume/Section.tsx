import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { omit } from 'lodash';
import React, { useRef } from 'react';
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import { EditableLabel } from 'components/form';
import JobRole from 'components/resume/JobRole';
import loremIpsum from 'data/loremIpsum.json';
import {
  ItemListType,
  JobFunctionType,
  JobRoleType,
  ModalTriggerFunctionProps,
  ResumeSettingsType,
  SectionItemType,
  SectionParagraphType,
  SectionType,
} from 'types/resume';
import { ModalManager as AddSectionModalManager } from './AddSectionModal';
import ItemList from './ItemList';
import { ModalManager as InlineListModalModalManager } from './ItemListModal';
import { ModalManager as JobRoleModalModalManager } from './JobRoleModal';

type SectionProps = {
  section: SectionType;
  settings: ResumeSettingsType;
  isEditable?: boolean;
  updateSection?(section: SectionType): void;
  removeSection?(id: string): void;
};

export const Section: React.FC<SectionProps> = ({
  section,
  updateSection,
  removeSection,
  settings,
  isEditable,
}) => {
  const initRef = useRef();
  const onSaveJobRole = (values: JobRoleType) => {
    const sectionPayload = structuredClone(section);
    if (values.id) {
      const index = sectionPayload.items.findIndex(
        item =>
          item.type === SectionItemType.JobRole &&
          (item.content as JobRoleType).id === values.id
      );
      if (index === -1) throw new Error('Job role not found');
      const jobRole = sectionPayload.items[index].content;
      sectionPayload.items[index].content = Object.assign(
        {},
        jobRole,
        omit(values, 'jobFunctions')
      );
    } else {
      const jobRole = {
        type: SectionItemType.JobRole,
        order: sectionPayload.items.length,
        content: {
          ...values,
          id: uuid(),
          sectionId: sectionPayload.id,
          jobFunctions: [],
        },
      };

      sectionPayload.items.push(jobRole);
    }
    updateSection?.(sectionPayload);
  };

  const onAddJobFunctions = (
    jobRoleId: string,
    values: Record<string, number | string>
  ) => {
    const sectionPayload = structuredClone(section);
    const jobRoleIndex = sectionPayload.items.findIndex(
      item =>
        item.type === SectionItemType.JobRole && item.content.id === jobRoleId
    );
    if (jobRoleIndex === -1) throw new Error('Cannot find job role');
    const jobRole = sectionPayload.items[jobRoleIndex].content as JobRoleType;

    // Check if it's bulleted list
    if ('text' in values) {
      const inputText = values.text as string;
      /*const dot = '•';
      const hasBullets = inputText.startsWith('•');
      if (hasBullets) {
        inputText.replaceAll('•', '');
        console.log('inputText ', inputText);
      }*/
      const texts = inputText.split(/\r?\n/);
      jobRole.jobFunctions = texts.filter(Boolean).map(text => ({
        id: uuid(),
        text: text.replaceAll('•', ''),
        jobRoleId,
      }));
    } else {
      const jobFunctions = [];
      for (let i = 0; i < values.count; i++) {
        jobFunctions.push({ id: uuid(), text: loremIpsum.text, jobRoleId });
      }
      jobRole.jobFunctions.push(...jobFunctions);
      sectionPayload.items[jobRoleIndex].content = jobRole;
    }
    updateSection?.(sectionPayload);
  };

  const onSaveJobFunction = (values: JobFunctionType) => {
    const sectionPayload = structuredClone(section);
    const jobRoleIndex = sectionPayload.items.findIndex(
      item =>
        item.type === SectionItemType.JobRole &&
        item.content.id === values.jobRoleId
    );
    if (jobRoleIndex === -1) throw new Error('Cannot find job role');

    const jobRole = sectionPayload.items[jobRoleIndex].content as JobRoleType;
    const jobFunctions = jobRole.jobFunctions;
    const jobFunctionIndex = jobFunctions.findIndex(
      item => item.id === values.id
    );
    if (jobFunctionIndex === -1) throw new Error('Cannot find job function');
    const jobFunction = jobFunctions[jobFunctionIndex];
    jobFunctions[jobFunctionIndex] = Object.assign({}, jobFunction, values);
    jobRole.jobFunctions = jobFunctions;
    sectionPayload.items[jobRoleIndex].content = jobRole;
    updateSection?.(sectionPayload);
  };

  const onSaveSectionName = (values: Partial<SectionType>) => {
    updateSection?.({ ...section, ...values });
  };

  const onRemoveJobFunction = (jobFunctionId: string, jobRoleId: string) => {
    const sectionPayload = structuredClone(section);
    const jobRoleIndex = sectionPayload.items.findIndex(
      item =>
        item.type === SectionItemType.JobRole && item.content.id === jobRoleId
    );
    if (jobRoleIndex === -1) throw new Error('Cannot find job role');
    const jobRole = sectionPayload.items[jobRoleIndex].content as JobRoleType;
    const jobFunctions = jobRole.jobFunctions;
    jobRole.jobFunctions = jobFunctions.filter(
      item => item.id !== jobFunctionId
    );
    sectionPayload.items[jobRoleIndex].content = jobRole;
    updateSection?.(sectionPayload);
  };

  const onSaveInlineList = (values: ItemListType) => {
    const sectionPayload = structuredClone(section);
    if (values.id) {
      const index = sectionPayload.items.findIndex(
        item =>
          item.type === SectionItemType.InlineList &&
          (item.content as ItemListType).id === values.id
      );
      if (index === -1) throw new Error('Inline list not found');
      const inlineList = sectionPayload.items[index].content;
      sectionPayload.items[index].content = Object.assign(
        {},
        inlineList,
        values
      );
    } else {
      const inlineList = {
        type: SectionItemType.InlineList,
        order: sectionPayload.items.length,
        content: {
          ...values,
          id: uuid(),
          sectionId: sectionPayload.id,
        },
      };

      sectionPayload.items.push(inlineList);
    }
    updateSection?.(sectionPayload);
  };

  const onRemoveSectionItem = (itemId: string, sectionItemType: string) => {
    const sectionPayload = structuredClone(section);
    const sectionItemIndex = sectionPayload.items.findIndex(
      item => item.type === sectionItemType && item.content.id === itemId
    );
    if (sectionItemIndex === -1)
      throw new Error(`Cannot find ${sectionItemType.toString()}`);
    sectionPayload.items.splice(sectionItemIndex, 1);
    updateSection?.(sectionPayload);
  };

  const onAddParagraph = () => {
    const sectionPayload = structuredClone(section);
    const paragraph = {
      type: SectionItemType.SectionParagraph,
      order: sectionPayload.items.length,
      content: {
        text: loremIpsum.text,
        id: uuid(),
        sectionId: sectionPayload.id,
      },
    };

    sectionPayload.items.push(paragraph);
    updateSection?.(sectionPayload);
  };
  const onChangeParagraph = (paragraphId: string, text: string) => {
    const sectionPayload = structuredClone(section);
    const index = sectionPayload.items.findIndex(
      item =>
        item.type === SectionItemType.SectionParagraph &&
        (item.content as SectionParagraphType).id === paragraphId
    );
    if (index === -1) throw new Error('Paragraph not found');
    const paragraph = sectionPayload.items[index]
      .content as SectionParagraphType;
    paragraph.text = text;
    sectionPayload.items[index].content = paragraph;
    updateSection?.(sectionPayload);
  };

  const onJobFunctionDrop = (
    sourceIndex: number,
    destinationIndex: number,
    jobRoleId: string
  ) => {
    const sectionPayload = structuredClone(section);
    const jobRoleIndex = sectionPayload.items.findIndex(
      item =>
        item.type === SectionItemType.JobRole && item.content.id === jobRoleId
    );
    if (jobRoleIndex === -1) throw new Error('Cannot find job role');
    const jobRole = sectionPayload.items[jobRoleIndex].content as JobRoleType;
    const jobFunctions = [...jobRole.jobFunctions];
    const tmp = jobFunctions[sourceIndex];
    jobFunctions[sourceIndex] = jobFunctions[destinationIndex];
    jobFunctions[destinationIndex] = tmp;
    jobRole.jobFunctions = jobFunctions;
    sectionPayload.items[jobRoleIndex].content = jobRole;
    updateSection?.(sectionPayload);
  };

  return (
    <Stack
      sx={{
        '@media screen, print': { marginTop: '20px', gap: 2, width: '100%' },
      }}
    >
      <Flex mb={0} mt={0} role="group">
        <Text
          sx={{
            '@media screen, print': {
              color: settings.colors.accent,
              textTransform: 'uppercase',
              fontSize: '11pt',
            },
          }}
        >
          {section.name}
        </Text>
        <Flex
          sx={{
            '@media screen, print': {
              marginLeft: '20px',
              display: 'none',
            },
          }}
          _groupHover={{ display: isEditable ? 'inline-block' : undefined }}
        >
          <Popover
            closeOnBlur={false}
            placement="left"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            initialFocusRef={initRef}
          >
            {({ onClose }) => (
              <>
                <PopoverTrigger>
                  <Button size="xs" mr="10px">
                    <AiOutlinePlus />
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverHeader>Add section contents</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody py="10px">
                      <JobRoleModalModalManager
                        triggerFunc={({
                          trigger,
                          ...rest
                        }: ModalTriggerFunctionProps) => (
                          <Button
                            size="xs"
                            {...rest}
                            onClick={() => {
                              trigger();
                              onClose();
                            }}
                            mr="10px"
                          >
                            Job Role
                          </Button>
                        )}
                        onSave={onSaveJobRole}
                      />

                      <InlineListModalModalManager
                        triggerFunc={({
                          trigger,
                          ...rest
                        }: ModalTriggerFunctionProps) => (
                          <Button
                            size="xs"
                            {...rest}
                            onClick={() => {
                              trigger();
                              onClose();
                            }}
                            mr="10px"
                          >
                            Inline List
                          </Button>
                        )}
                        onSave={onSaveInlineList}
                      />
                      <Button size="xs" onClick={onAddParagraph} mr="10px">
                        Paragraph
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>

          <AddSectionModalManager
            onSave={onSaveSectionName}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            initialValues={{ name: section.name! }}
            triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
              <Button size="xs" mr="10px" {...rest} onClick={() => trigger()}>
                <AiOutlineEdit />
              </Button>
            )}
          />
          <Button size="xs" onClick={() => removeSection?.(section.id)}>
            <AiFillDelete color="red" />
          </Button>
        </Flex>
      </Flex>
      <Box
        h="1.2px"
        w="full"
        bg="blackAlpha.200"
        sx={{
          marginTop: '0 !important',
        }}
      />
      {section.items.map(sectionItem => {
        if (sectionItem.type === SectionItemType.JobRole) {
          const jobRole = sectionItem.content as JobRoleType;
          return (
            <JobRole
              isEditable={isEditable}
              settings={settings}
              key={jobRole.id}
              onSave={onSaveJobRole}
              jobRole={sectionItem.content as JobRoleType}
              onSaveJobFunction={onSaveJobFunction}
              onAddJobFunctions={onAddJobFunctions}
              onRemoveJobFunction={onRemoveJobFunction}
              onRemove={jobRoleId =>
                onRemoveSectionItem(jobRoleId, SectionItemType.JobRole)
              }
              onJobFunctionDragEnd={(
                sourceIndex: number,
                destinationIndex: number
              ) => onJobFunctionDrop(sourceIndex, destinationIndex, jobRole.id)}
            />
          );
        }
        if (sectionItem.type === SectionItemType.InlineList) {
          return (
            <ItemList
              isEditable={isEditable}
              settings={settings}
              key={(sectionItem.content as ItemListType).id}
              onSave={onSaveInlineList}
              onRemoveInlineList={inlineListId =>
                onRemoveSectionItem(inlineListId, SectionItemType.InlineList)
              }
              inlineList={sectionItem.content as ItemListType}
            />
          );
        }

        if (sectionItem.type === SectionItemType.SectionParagraph) {
          const paragraph = sectionItem.content as SectionParagraphType;
          return (
            <EditableLabel
              isEditable={isEditable}
              key={paragraph.id}
              text={paragraph.text}
              onChange={text => onChangeParagraph(paragraph.id, text)}
              showRemoveButton
              displayNodeProps={{
                sx: {
                  color: settings.colors.common,
                  position: 'relative',
                  fontSize: '11pt',
                  lineHeight: '160%',
                  '@media print': {
                    fontSize: '10.5pt',
                  },
                },
              }}
              onRemove={() =>
                onRemoveSectionItem(
                  paragraph.id,
                  SectionItemType.SectionParagraph
                )
              }
            />
          );
        }
      })}
    </Stack>
  );
};

export default Section;
