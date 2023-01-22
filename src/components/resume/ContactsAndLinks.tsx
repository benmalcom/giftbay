import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { ContactsAndLinksType, ModalTriggerFunctionProps } from 'types/resume';
import { ModalManager as ContactsAndLinksModalManager } from './ContactsAndLinksModal';

type ContactInformationProps = {
  onSave(values: ContactsAndLinksType): void;
  contactsAndLinks: ContactsAndLinksType;
};

export const ContactsAndLinks: React.FC<ContactInformationProps> = ({
  onSave,
  contactsAndLinks,
}) => {
  return (
    <ContactsAndLinksModalManager
      onSave={onSave}
      initialValues={contactsAndLinks}
      triggerFunc={(props: ModalTriggerFunctionProps) => (
        <Box
          onDoubleClick={() => props.trigger()}
          w="full"
          _hover={{
            border: '1px dashed gray',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
          {...props}
        >
          <UnorderedList mx={0}>
            {Object.values(contactsAndLinks).map((item, index) => (
              <ListItem
                key={item}
                fontWeight={600}
                color="#717276"
                float="left"
                ml={index === 0 ? 0 : 5}
                listStyleType={index === 0 ? 'none' : 'disc'}
              >
                {item}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
    />
  );
};

ContactsAndLinks.displayName = 'ContactsAndLinks';

export default ContactsAndLinks;
