import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { match } from 'ts-pattern';

type ButtonProps = ChakraButtonProps & {
  variant?: 'outline' | 'primary' | 'light';
};

export default function Button({ variant = 'primary', ...props }: ButtonProps) {
  return match(variant)
    .with('outline', () => <OutlineButton {...props} />)
    .with('primary', () => <PrimaryButton {...props} />)
    .with('light', () => <LightButton {...props} />)
    .exhaustive();
}

function OutlineButton(props: ButtonProps) {
  return (
    <ChakraButton
      variant="outline"
      bg="white"
      borderColor="pink.200"
      color="pink.700"
      shadow="sm"
      fontWeight="500"
      _hover={{ bg: 'pink.800', color: 'white' }}
      _active={{ bg: 'pink.900', color: 'white' }}
      _disabled={{ bg: 'pink.300', color: 'white' }}
      {...props}
    />
  );
}

function PrimaryButton(props: ButtonProps) {
  return (
    <ChakraButton
      color="white"
      bgGradient="linear(to-r, purple.500, purple.300)"
      opacity="0.9"
      _hover={{ opacity: 1 }}
      _active={{ opacity: 1 }}
      _disabled={{ opacity: 8 }}
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
      _disabled={{ opacity: 8 }}
      {...props}
    />
  );
}
