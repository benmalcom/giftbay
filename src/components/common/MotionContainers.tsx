import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Grid,
  GridProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

export const MotionBox = motion<BoxProps>(Box);
export const MotionFlex = motion<FlexProps>(Flex);
export const MotionGrid = motion<GridProps>(Grid);

export const FlexColumn = forwardRef<HTMLDivElement, FlexProps>(
  function FlexColumn({ children, ...props }, ref) {
    return (
      <Flex {...props} direction="column" ref={ref}>
        {children}
      </Flex>
    );
  }
);

export const MotionFlexColumn = motion<FlexProps>(FlexColumn);
