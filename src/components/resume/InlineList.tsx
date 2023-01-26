import { Box, Text, Stack, Flex, CloseButton } from '@chakra-ui/react';
import React from 'react';
import { InlineListType, ModalTriggerFunctionProps } from 'types/resume';
import { ModalManager as InlineListModalManager } from './InlineListModal';

type InlineListProps = {
  onSave(values: InlineListType): void;
  onRemoveInlineList(inlineListId: string): void;
  inlineList: InlineListType;
};

export const InlineList: React.FC<InlineListProps> = ({
  onSave,
  inlineList,
  onRemoveInlineList,
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
                    color: '#717276',
                    fontWeight: 600,
                  },
                }}
              >
                {inlineList.name}:
              </Text>
              <Text
                sx={{
                  '@media screen, print': {
                    marginLeft: 1,
                    color: '#717276',
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
