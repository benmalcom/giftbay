import { Box, Text, CloseButton, HStack, Stack } from '@chakra-ui/react';
import React from 'react';
import {
  ItemListType,
  ModalTriggerFunctionProps,
  ResumeSettingsType,
} from 'types/resume';
import { ModalManager as InlineListModalManager } from './ItemListModal';

type InlineListProps = {
  onSave(values: ItemListType): void;
  onRemoveInlineList(inlineListId: string): void;
  inlineList: ItemListType;
  settings: ResumeSettingsType;
  isLine?: boolean;
};

export const ItemList: React.FC<InlineListProps> = ({
  onSave,
  inlineList,
  onRemoveInlineList,
  settings,
  isLine,
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
              marginTop: '0 !important',
            },
          }}
          _hover={{
            border: '1px dashed gray',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
          onDoubleClick={() => props.trigger()}
        >
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Stack direction={isLine ? 'row' : 'column'}>
            {isLine ? (
              <Text
                sx={{
                  '@media screen, print': {
                    color: settings.colors.common,
                    fontSize: '11pt',
                  },
                }}
              >
                <Text as="span" fontWeight={600}>
                  {inlineList.name}:{' '}
                </Text>
                {inlineList.content}
              </Text>
            ) : (
              <>
                <Text
                  fontWeight={600}
                  sx={{
                    '@media screen, print': {
                      color: settings.colors.common,
                      fontSize: '11pt',
                    },
                  }}
                >
                  {inlineList.name}:
                </Text>
                <Text> {inlineList.content}</Text>
              </>
            )}
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

ItemList.displayName = 'ItemList';

export default ItemList;
