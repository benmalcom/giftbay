import { Flex, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react';
import {
  FlexColumn,
  MotionFlexColumn,
} from 'components/common/MotionContainers';

const EventCardSkeleton = () => {
  return (
    <MotionFlexColumn
      bg="white"
      rounded="xl"
      shadow="md"
      h="300px"
      position="relative"
    >
      <FlexColumn p="3" gridGap="2" h="full" w="full">
        <Flex justify="space-between" w="full" h="50%">
          <FlexColumn rowGap={5} w="full">
            <Flex columnGap={2} w="full">
              <SkeletonText
                noOfLines={2}
                spacing="3"
                skeletonHeight="4"
                flex={1}
              />
              <SkeletonCircle size="6" />
            </Flex>

            <Skeleton height="40px" width="100px" rounded="3xl" />
          </FlexColumn>
        </Flex>
        <Flex align="center" gridGap="4" h="50%" w="full">
          <Flex h="full" width="40%" alignItems="flex-end">
            <SkeletonText noOfLines={1} w="80%" skeletonHeight="3" />
          </Flex>
          <Flex
            flex={1}
            mr={-1}
            mb={-1}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Skeleton height="100px" width="100px" />
          </Flex>
        </Flex>
      </FlexColumn>
    </MotionFlexColumn>
  );
};

export default EventCardSkeleton;
