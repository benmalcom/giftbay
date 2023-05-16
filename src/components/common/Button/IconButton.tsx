import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { match } from 'ts-pattern';

type IconButtonProps = ChakraIconButtonProps & {
  variant?: 'ghost' | 'outline' | 'overlay';
};

export function IconButton({ variant = 'outline', ...props }: IconButtonProps) {
  return match(variant)
    .with('outline', () => <OutlineIconButton {...props} />)
    .with('ghost', () => <GhostIconButton {...props} />)
    .with('overlay', () => <OverlayIconButton {...props} />)
    .exhaustive();
}

function OutlineIconButton(props: ChakraIconButtonProps) {
  return (
    <ChakraIconButton
      variant="outline"
      borderColor="gray.200"
      color="gray.700"
      fontWeight="400"
      shadow="sm"
      {...props}
    />
  );
}

function GhostIconButton(props: ChakraIconButtonProps) {
  return (
    <ChakraIconButton
      variant="ghost"
      borderColor="gray.200"
      color="gray.700"
      fontWeight="400"
      {...props}
    />
  );
}

function OverlayIconButton(props: ChakraIconButtonProps) {
  return (
    <ChakraIconButton
      bg="whiteAlpha.400"
      color="white"
      _hover={{ bg: 'whiteAlpha.500' }}
      _active={{ bg: 'whiteAlpha.600' }}
      _disabled={{ bg: 'whiteAlpha.100' }}
      {...props}
    />
  );
}
