import {
  Box,
  Textarea,
  TextareaProps,
  useDisclosure,
  Text,
  TextProps,
  HeadingProps,
  CloseButton,
} from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';

type EditableInputProps = {
  text: string;
  inputProps?: TextareaProps;
  onChange?(value: string): void;
  displayNode?: React.ElementType;
  displayNodeProps?: TextProps | HeadingProps;
  showRemoveButton?: boolean;
  onRemove?(): void;
};
export const EditableLabel: React.FC<EditableInputProps> = props => {
  const [value, setValue] = useState(props.text);
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const DisplayComponent = props.displayNode ?? Text;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
      inputRef.current.setSelectionRange(Infinity, Infinity);
    }
  }, [isOpen]);

  const onClickReveal = () => {
    onToggle();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange?.(e.target.value);
  };

  return isOpen ? (
    <Textarea
      ref={inputRef}
      placeholder="Enter text here"
      size="sm"
      w="full"
      onBlur={onClickReveal}
      fontSize="16px"
      {...props.inputProps}
      onChange={handleChange}
      boxShadow="sm"
      value={value}
      _focus={{ boxShadow: 'none' }}
    />
  ) : (
    <Box
      onDoubleClick={onClickReveal}
      role="group"
      sx={{
        '@media screen, print': {
          width: '100%',
          position: 'relative',
          boxSizing: 'border-box',
        },
      }}
      _hover={{
        border: '1px dashed gray',
        cursor: 'pointer',
        borderRadius: '2px',
      }}
    >
      <DisplayComponent
        sx={{
          '@media screen, print': {
            ...props.displayNodeProps?.sx,
          },
        }}
      >
        {value}
      </DisplayComponent>
      {props.showRemoveButton && (
        <CloseButton
          size="sm"
          color="red"
          position="absolute"
          top="-10px"
          right="-20px"
          display="none"
          _groupHover={{ display: 'inline-block' }}
          onClick={() => props.onRemove?.()}
        />
      )}
    </Box>
  );
};

EditableLabel.displayName = 'EditableLabel';

export default EditableLabel;