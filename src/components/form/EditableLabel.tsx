import {
  Box,
  Textarea,
  TextareaProps,
  useDisclosure,
  Text,
  TextProps,
  HeadingProps,
} from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';

type EditableInputProps = {
  text: string;
  inputProps?: TextareaProps;
  onChange?(value: string): void;
  displayNode?: React.ElementType;
  displayNodeProps?: TextProps | HeadingProps;
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
      rows={2}
      onBlur={onClickReveal}
      fontSize="16px"
      {...props.inputProps}
      onChange={handleChange}
      value={value}
      _focus={{ boxShadow: 'none' }}
    />
  ) : (
    <Box
      w="full"
      onDoubleClick={onClickReveal}
      _hover={{
        border: '1px dashed gray',
        cursor: 'pointer',
        borderRadius: '2px',
      }}
    >
      <DisplayComponent {...props.displayNodeProps}>{value}</DisplayComponent>
    </Box>
  );
};

EditableLabel.displayName = 'EditableLabel';

export default EditableLabel;
