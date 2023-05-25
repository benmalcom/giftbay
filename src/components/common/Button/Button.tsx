import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { match } from 'ts-pattern';

type ButtonProps = ChakraButtonProps & {
  variant?: 'outline' | 'primary' | 'light' | 'transparent';
};

export default function Button({ variant = 'primary', ...props }: ButtonProps) {
  return match(variant)
    .with('outline', () => <OutlineButton {...props} />)
    .with('primary', () => <PrimaryButton {...props} />)
    .with('light', () => <LightButton {...props} />)
    .with('transparent', () => <TransparentButton {...props} />)
    .exhaustive();
}

function OutlineButton(props: ButtonProps) {
  return (
    <ChakraButton
      variant="outline"
      bg="white"
      borderColor="purple.200"
      color="purple.700"
      shadow="sm"
      fontWeight="500"
      opacity="0.9"
      _hover={{ bg: 'purple.50', opacity: 1 }}
      _active={{ bg: 'purple.50', opacity: 1 }}
      _disabled={{ bg: 'purple.50', opacity: 0.8 }}
      {...props}
    />
  );
}

function PrimaryButton(props: ButtonProps) {
  return (
    <ChakraButton
      color="white"
      bgGradient="linear(to-r, purple.500, purple.400)"
      opacity="0.9"
      _hover={{ opacity: 1 }}
      _active={{ opacity: 1 }}
      _disabled={{ opacity: 0.8 }}
      {...props}
    />
  );
}

function LightButton(props: ButtonProps) {
  return (
    <ChakraButton
      color="purple.500"
      bg="purple.50"
      opacity="0.9"
      _hover={{ opacity: 1 }}
      _active={{ opacity: 1 }}
      _disabled={{ opacity: 0.8 }}
      {...props}
    />
  );
}

function TransparentButton(props: ButtonProps) {
  return (
    <ChakraButton
      bg="transparent"
      opacity="0.9"
      border="1px solid currentcolor"
      _hover={{ opacity: 1, bg: 'transparent' }}
      _active={{ opacity: 1, bg: 'transparent' }}
      _disabled={{ opacity: 0.8, bg: 'transparent' }}
      {...props}
    />
  );
}
