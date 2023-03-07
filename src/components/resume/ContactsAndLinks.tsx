import { Box, CloseButton, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { ContactsAndLinksType, ModalTriggerFunctionProps } from 'types/resume';
import { ModalManager as ContactsAndLinksModalManager } from './ContactsAndLinksModal';

type ContactInformationProps = {
  onSave(values: ContactsAndLinksType): void;
  contactsAndLinks: ContactsAndLinksType;
  showRemoveButton?: boolean;
  isEditable?: boolean;
  onRemove?(): void;
  color: string;
};

export const ContactsAndLinks: React.FC<ContactInformationProps> = ({
  onSave,
  contactsAndLinks,
  showRemoveButton,
  onRemove,
  color,
  isEditable,
}) => {
  return (
    <ContactsAndLinksModalManager
      onSave={onSave}
      initialValues={contactsAndLinks}
      triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
        <Box
          role="group"
          position="relative"
          onDoubleClick={isEditable ? () => trigger() : undefined}
          w="full"
          _hover={{
            border: isEditable ? '1px dashed gray' : undefined,
            cursor: isEditable ? 'pointer' : undefined,
            borderRadius: '2px',
            padding: 0,
          }}
          {...rest}
        >
          <UnorderedList mx={0} fontSize={0} className="kendo-ui-list inline">
            {Object.values(contactsAndLinks)
              .filter(item => Boolean(item))
              .map(item => (
                <ListItem
                  key={item}
                  fontSize="11.5pt"
                  sx={{
                    '@media screen': {
                      fontWeight: 400,
                      color,
                    },
                    '@media print': {
                      fontSize: '10.5pt',
                    },
                  }}
                >
                  {item}
                </ListItem>
              ))}
          </UnorderedList>
          {showRemoveButton && isEditable && (
            <CloseButton
              size="sm"
              color="red"
              position="absolute"
              top="-10px"
              right="-20px"
              display="none"
              _groupHover={{ display: 'inline-block' }}
              onClick={() => onRemove?.()}
            />
          )}
        </Box>
      )}
    />
  );
};

ContactsAndLinks.displayName = 'ContactsAndLinks';

export default ContactsAndLinks;
