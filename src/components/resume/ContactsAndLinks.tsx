import { Box, CloseButton, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { ContactsAndLinksType, ModalTriggerFunctionProps } from 'types/resume';
import { ModalManager as ContactsAndLinksModalManager } from './ContactsAndLinksModal';

type ContactInformationProps = {
  onSave(values: ContactsAndLinksType): void;
  contactsAndLinks: ContactsAndLinksType;
  showRemoveButton?: boolean;
  onRemove?(): void;
  color: string;
};

export const ContactsAndLinks: React.FC<ContactInformationProps> = ({
  onSave,
  contactsAndLinks,
  showRemoveButton,
  onRemove,
  color,
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
            padding: 0,
          }}
          {...rest}
        >
          <UnorderedList mx={0} className="kendo-ui-list inline">
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
