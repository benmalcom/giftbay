import { Box, CloseButton, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { ContactsAndLinksType, ModalTriggerFunctionProps } from 'types/resume';
import { ModalManager as ContactsAndLinksModalManager } from './ContactsAndLinksModal';

type ContactInformationProps = {
  onSave(values: ContactsAndLinksType): void;
  contactsAndLinks: ContactsAndLinksType;
  showRemoveButton?: boolean;
  onRemove?(): void;
};

export const ContactsAndLinks: React.FC<ContactInformationProps> = ({
  onSave,
  contactsAndLinks,
  showRemoveButton,
  onRemove,
}) => {
  return (
    <ContactsAndLinksModalManager
      onSave={onSave}
      initialValues={contactsAndLinks}
      triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
        <Box
          role="group"
          position="relative"
          onDoubleClick={() => trigger()}
          w="full"
          _hover={{
            border: '1px dashed gray',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
          {...rest}
        >
          <UnorderedList mx={0}>
            {Object.values(contactsAndLinks).map(item => (
              <ListItem
                key={item}
                sx={{
                  '@media screen, print': {
                    fontWeight: 400,
                    color: '#717276',
                    float: 'left',
                    marginLeft: 5,
                    listStyleType: 'disc',
                    ':first-of-type': {
                      marginLeft: 0,
                      listStyleType: 'none',
                    },
                  },
                }}
              >
                {item}
              </ListItem>
            ))}
          </UnorderedList>
          {showRemoveButton && (
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
