import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import JobFunctions from 'components/resume/JobFunctions';
import JobRole from 'components/resume/JobRole';
import loremIpsum from 'data/loremIpsum.json';
import {
  JobFunctionType,
  JobRoleType,
  ModalTriggerFunctionProps,
  SectionItemType,
  SectionType,
} from 'types/resume';
import { ModalManager as JobFunctionsModalManager } from './JobFunctionsModal';
import { ModalManager as JobRoleModalModalManager } from './JobRoleModal';

type SectionProps = {
  section: SectionType;
  addSection(): void;
  updateSection(section: SectionType): void;
  removeSection(id: string): void;
};

export const Section: React.FC<SectionProps> = ({ section, updateSection }) => {
  const onSaveJobRole = (values: JobRoleType) => {
    const sectionPayload = structuredClone(section);
    if (values.id) {
      const index = sectionPayload.items.findIndex(
        item =>
          item.type === SectionItemType.JobRole &&
          (item.content as JobRoleType).id === values.id
      );
      if (index === -1) throw new Error('Job role not found');
      const oldContent = sectionPayload.items[index].content;
      sectionPayload.items[index].content = Object.assign(
        {},
        oldContent,
        values
      );
    } else {
      const jobRole = {
        type: SectionItemType.JobRole,
        order: sectionPayload.items.length,
        content: {
          ...values,
          id: uuid(),
        },
      };

      sectionPayload.items.push(jobRole);
    }
    updateSection(sectionPayload);
  };

  const onSaveJobFunctions = (values: Record<string, number>) => {
    const jobFunctions = [];
    for (let i = 0; i < values.count; i++) {
      jobFunctions.push({ id: uuid(), text: loremIpsum.text });
    }

    const sectionPayload = structuredClone(section);
    const index = sectionPayload.items.findIndex(
      item => item.type === SectionItemType.JobFunctions
    );
    if (index > -1) {
      const content = sectionPayload.items[index].content as JobFunctionType[];
      content.push(...jobFunctions);
      sectionPayload.items[index].content = content;
    } else {
      const sectionItem = {
        type: SectionItemType.JobFunctions,
        order: sectionPayload.items.length,
        content: jobFunctions,
      };

      sectionPayload.items.push(sectionItem);
    }

    updateSection(sectionPayload);
  };

  const onSaveJobFunction = (values: JobFunctionType) => {
    const sectionPayload = structuredClone(section);
    const sectionItemIndex = sectionPayload.items.findIndex(
      item => item.type === SectionItemType.JobFunctions
    );
    if (sectionItemIndex === -1) throw new Error('Cannot find job functions');
    const jobFunctions = sectionPayload.items[sectionItemIndex]
      .content as JobFunctionType[];

    const jobFunctionIndex = jobFunctions.findIndex(
      item => item.id === values.id
    );
    if (jobFunctionIndex === -1) throw new Error('Cannot find job function');

    const jobFunction = jobFunctions[jobFunctionIndex];
    jobFunctions[jobFunctionIndex] = Object.assign({}, jobFunction, values);

    sectionPayload.items[sectionItemIndex].content = jobFunctions;
    updateSection(sectionPayload);
  };

  return (
    <Stack w="full" spacing={3} my="20px">
      <Flex mb={0} justify="space-between" role="group">
        <Text textTransform="uppercase" color="#9c432f">
          {section.title}
        </Text>
        <Flex>
          <Menu>
            <MenuButton
              as={Button}
              size="xs"
              display="none"
              mr="10px"
              _groupHover={{ display: 'inline-block' }}
            >
              <AiOutlinePlus />
            </MenuButton>
            <MenuList>
              <JobRoleModalModalManager
                triggerFunc={(props: ModalTriggerFunctionProps) => (
                  <MenuItem {...props} onClick={() => props.trigger()}>
                    Job Role
                  </MenuItem>
                )}
                onSave={onSaveJobRole}
              />
              <JobFunctionsModalManager
                triggerFunc={(props: ModalTriggerFunctionProps) => (
                  <MenuItem {...props} onClick={() => props.trigger()}>
                    Job Functions
                  </MenuItem>
                )}
                onSave={onSaveJobFunctions}
              />

              <MenuItem>Paragraph</MenuItem>
            </MenuList>
          </Menu>
          <Button
            size="xs"
            display="none"
            _groupHover={{ display: 'inline-block' }}
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
            />
          );
        }

        if (sectionItem.type === SectionItemType.JobFunctions) {
          return (
            <JobFunctions
              key={sectionItem.order}
              onSaveJobFunction={onSaveJobFunction}
              jobFunctions={sectionItem.content as JobFunctionType[]}
            />
          );
        }
      })}
    </Stack>
  );
};

export default Section;
