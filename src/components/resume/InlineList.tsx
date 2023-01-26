import { Box, Text, Stack, Flex, CloseButton } from '@chakra-ui/react';
import React from 'react';
import {
  InlineListType,
  ModalTriggerFunctionProps,
  ResumeSettingsType,
} from 'types/resume';
import { ModalManager as InlineListModalManager } from './InlineListModal';

type InlineListProps = {
  onSave(values: InlineListType): void;
  onRemoveInlineList(inlineListId: string): void;
  inlineList: InlineListType;
  settings: ResumeSettingsType;
};

export const InlineList: React.FC<InlineListProps> = ({
  onSave,
  inlineList,
  onRemoveInlineList,
  settings,
}) => {
  return (
    <InlineListModalManager
      initialValues={inlineList}
      onSave={onSave}
      triggerFunc={(props: ModalTriggerFunctionProps) => (
        <Box
          role="group"
          sx={{
            '@media screen, print': {
              width: '100%',
              boxSizing: 'border-box',
              position: 'relative',
            },
          }}
          _hover={{
            border: '1px dashed gray',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
          onDoubleClick={() => props.trigger()}
        >
          <Stack>
            <Flex>
              <Text
                sx={{
                  '@media screen, print': {
                    color: settings.colors.common,
                    fontWeight: 600,
                    fontSize: '11pt',
                  },
                }}
              >
                {inlineList.name}:
              </Text>
              <Text
                sx={{
                  '@media screen, print': {
                    marginLeft: 1,
                    color: settings.colors.common,
                    fontSize: '10.5pt',
                  },
                }}
              >
                {inlineList.content}
              </Text>
            </Flex>
          </Stack>
          <CloseButton
            size="sm"
            color="red"
            position="absolute"
            top="-10px"
            right="-20px"
            display="none"
            _groupHover={{ display: 'inline-block' }}
            onClick={() => onRemoveInlineList(inlineList.id)}
          />
        </Box>
      )}
    />
  );
};

InlineList.displayName = 'InlineList';

export default InlineList;
