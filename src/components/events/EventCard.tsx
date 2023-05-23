import {
  Flex,
  Icon,
  IconButton,
  Text,
  Box,
  Button as ChakraButton,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { Button } from 'components/common/Button';
import {
  FlexColumn,
  MotionFlexColumn,
} from 'components/common/MotionContainers';
import { EventType } from 'types/event';

type EventCardProps = {
  event: EventType;
};
const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <MotionFlexColumn
      bg={event.backgroundColor}
      rounded="xl"
      shadow="lg"
      h="300px"
      whileHover={{
        y: -1,
        scale: 1.01,
      }}
      position="relative"
    >
      <Box
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        rounded="xl"
      >
        <FlexColumn p="3" gridGap="2" h="full" w="full">
          <Flex justify="space-between" w="full" h="50%">
            <FlexColumn rowGap={5}>
              <Flex columnGap={2}>
                <Text
                  fontSize="xl"
                  color={event.foregroundColor}
                  fontWeight={600}
                >
                  {event.name}
                </Text>
                <IconButton
                  isRound
                  aria-label="project actions"
                  icon={<Icon as={AiOutlinePlus} />}
                  onClick={event => {
                    event.stopPropagation();
                  }}
                  fontSize="lg"
                  size="xs"
                  variant="outline"
                  bg={event.foregroundColor}
                  color={event.backgroundColor}
                  opacity="0.9"
                  border="1px solid currentcolor"
                  _hover={{ opacity: 1 }}
                  _active={{ opacity: 1 }}
                  _disabled={{ opacity: 0.8 }}
                />
              </Flex>
              <Button
                variant="transparent"
                color={event.foregroundColor}
                bg="transparent"
                rounded="3xl"
                width="fit-content"
                fontWeight={400}
              >
                $250,000
              </Button>
            </FlexColumn>
          </Flex>
          <Flex align="center" gridGap="4" h="50%" w="full">
            <Flex h="full" width="40%" alignItems="flex-end">
              <Link href="/overview" passHref>
                <ChakraButton
                  rightIcon={<FiExternalLink />}
                  as="a"
                  textDecoration="none"
                  cursor="pointer"
                  w="fit-content"
                  color={event.foregroundColor}
                  variant="link"
                  fontWeight={400}
                >
                  View details
                </ChakraButton>
              </Link>
            </Flex>
            <Flex
              flex={1}
              mr={-1}
              mb={-1}
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Image
                src={event.lastGiftImageUrl}
                alt="Gift item"
                mr={0}
                mb={0}
              />
            </Flex>
          </Flex>
        </FlexColumn>
      </Box>
    </MotionFlexColumn>
  );
};

export default EventCard;
