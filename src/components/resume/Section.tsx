import {
  Button,
  Divider,
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
import JobRole from 'components/resume/JobRole';
import loremIpsum from 'data/loremIpsum.json';
import {
  InlineListType,
  JobFunctionType,
  JobRoleType,
  ModalTriggerFunctionProps,
  SectionItemType,
  SectionType,
} from 'types/resume';
import { ModalManager as AddSectionModalManager } from './AddSectionModal';
import InlineList from './InlineList';
import { ModalManager as InlineListModalModalManager } from './InlineListModal';
import { ModalManager as JobRoleModalModalManager } from './JobRoleModal';

type SectionProps = {
  section: SectionType;
  updateSection(section: SectionType): void;
  removeSection(id: string): void;
};

export const Section: React.FC<SectionProps> = ({
  section,
  updateSection,
  removeSection,
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
    updateSection(sectionPayload);
  };

  const onAddJobFunctions = (
    jobRoleId: string,
    values: Record<string, number>
  ) => {
    const jobFunctions = [];
    for (let i = 0; i < values.count; i++) {
      jobFunctions.push({ id: uuid(), text: loremIpsum.text, jobRoleId });
    }

    const sectionPayload = structuredClone(section);
    const jobRoleIndex = sectionPayload.items.findIndex(
      item =>
        item.type === SectionItemType.JobRole && item.content.id === jobRoleId
    );
    if (jobRoleIndex === -1) throw new Error('Cannot find job role');

    const jobRole = sectionPayload.items[jobRoleIndex].content as JobRoleType;
    jobRole.jobFunctions.push(...jobFunctions);
    sectionPayload.items[jobRoleIndex].content = jobRole;
    updateSection(sectionPayload);
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
    updateSection(sectionPayload);
  };

  const onSaveSectionName = (values: Partial<SectionType>) => {
    updateSection({ ...section, ...values });
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
    updateSection(sectionPayload);
  };

  const onSaveInlineList = (values: InlineListType) => {
    const sectionPayload = structuredClone(section);
    if (values.id) {
      const index = sectionPayload.items.findIndex(
        item =>
          item.type === SectionItemType.InlineList &&
          (item.content as InlineListType).id === values.id
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
    updateSection(sectionPayload);
  };

  const onRemoveInlineList = (inlineListId: string) => {
    const sectionPayload = structuredClone(section);
    const inlineListIndex = sectionPayload.items.findIndex(
      item =>
        item.type === SectionItemType.InlineList &&
        item.content.id === inlineListId
    );
    if (inlineListIndex === -1) throw new Error('Cannot find inline list');
    sectionPayload.items.splice(inlineListIndex, 1);
    updateSection(sectionPayload);
  };

  const onRemoveJobRole = (jobRoleId: string) => {
    const sectionPayload = structuredClone(section);
    const inlineListIndex = sectionPayload.items.findIndex(
      item =>
        item.type === SectionItemType.JobRole && item.content.id === jobRoleId
    );
    if (inlineListIndex === -1) throw new Error('Cannot find job role');
    sectionPayload.items.splice(inlineListIndex, 1);
    updateSection(sectionPayload);
  };

  return (
    <Stack w="full" spacing={3} my="20px">
      <Flex mb={0} justify="space-between" role="group">
        <Text textTransform="uppercase" color="#9c432f">
          {section.name}
        </Text>
        <Flex>
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
                  <Button
                    size="xs"
                    display="none"
                    mr="10px"
                    _groupHover={{ display: 'inline-block' }}
                  >
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
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>

          <AddSectionModalManager
            onSave={onSaveSectionName}
            initialValues={{ name: section.name! }}
            triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
              <Button
                size="xs"
                display="none"
                mr="10px"
                {...rest}
                onClick={() => trigger()}
                _groupHover={{ display: 'inline-block' }}
              >
                <AiOutlineEdit />
              </Button>
            )}
          />
          <Button
            size="xs"
            display="none"
            _groupHover={{ display: 'inline-block' }}
            onClick={() => removeSection(section.id)}
          >
            <AiFillDelete color="red" />
          </Button>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" colorScheme="teal" h="2px" />
      {section.items.map(sectionItem => {
        if (sectionItem.type === SectionItemType.JobRole) {
          return (
            <JobRole
              key={(sectionItem.content as JobRoleType).id}
              onSave={onSaveJobRole}
              jobRole={sectionItem.content as JobRoleType}
              onSaveJobFunction={onSaveJobFunction}
              onAddJobFunctions={onAddJobFunctions}
              onRemoveJobFunction={onRemoveJobFunction}
              onRemove={onRemoveJobRole}
            />
          );
        }
        if (sectionItem.type === SectionItemType.InlineList) {
          return (
            <InlineList
              key={(sectionItem.content as InlineListType).id}
              onSave={onSaveInlineList}
              onRemoveInlineList={onRemoveInlineList}
              inlineList={sectionItem.content as InlineListType}
            />
          );
        }
      })}
    </Stack>
  );
};

export default Section;
