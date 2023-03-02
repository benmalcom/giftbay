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
  isEditable?: boolean;
  onRemove?(): void;
  onOpenEdit?(): void;
  onCloseEdit?(): void;
};
export const EditableLabel: React.FC<EditableInputProps> = ({
  isEditable,
  displayNodeProps,
  showRemoveButton,
  onRemove,
  inputProps,
  displayNode,
  text,
  onChange,
  onOpenEdit,
  onCloseEdit,
}) => {
  const [value, setValue] = useState(text);
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const DisplayComponent = displayNode ?? Text;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const element = inputRef.current;
      element.focus({ preventScroll: true });
      element.selectionStart = element.value.length;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      onOpenEdit?.();
    } else {
      onCloseEdit?.();
    }
  }, [isOpen, onCloseEdit, onOpenEdit]);

  useEffect(() => {
    if (text !== value) {
      setValue(text);
    }
  }, [text, value]);

  const onClickReveal = () => {
    if (!isEditable) return;
    onToggle();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  return isOpen ? (
    <Textarea
      ref={inputRef}
      placeholder="Enter text here"
      size="sm"
      w="full"
      onBlur={onClickReveal}
      fontSize="16px"
      {...inputProps}
      onChange={handleChange}
      boxShadow="md"
      value={value}
      _focus={{ outline: 'none', boxShadow: 'md' }}
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
          marginTop: '0 !important',
        },
      }}
      _hover={{
        border: isEditable ? '1px dashed gray' : undefined,
        cursor: isEditable ? 'pointer' : undefined,
        borderRadius: '2px',
      }}
    >
      <DisplayComponent
        sx={{
          ...displayNodeProps?.sx,
        }}
      >
        {value}
      </DisplayComponent>
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
  );
};

EditableLabel.displayName = 'EditableLabel';

export default EditableLabel;
