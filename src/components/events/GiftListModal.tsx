import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Stack,
  ModalFooter,
  Flex,
  Image,
  Icon,
  Text,
  Checkbox,
  Box,
  Skeleton,
  Link as ChakraLink,
  Heading,
  Highlight,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';
import { FaHandPointDown } from 'react-icons/fa';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { GoKebabVertical } from 'react-icons/go';
import {
  Button as CustomButton,
  CustomModalCloseButton,
} from 'components/common/Button';
import { ModalManager as GiftItemModalManager } from 'components/events/AddGiftItemModal';
import { CurrencyType } from 'types/common';
import { GiftComponentProps, GiftType } from 'types/gift';

type GiftProps = Pick<
  GiftComponentProps,
  'onCreateGift' | 'onDeleteGift' | 'onUpdateGift' | 'loading'
> & {
  gifts: GiftType[];
  isOpen: boolean;
  onClose(): void;
  preferredCurrency: CurrencyType;
};

const GiftListModal: React.FC<GiftProps> = ({
  gifts,
  isOpen,
  onClose,
  loading,
  preferredCurrency,
  onCreateGift,
  onUpdateGift,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="subtle"
      colorScheme="purple"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent w={{ base: '99%', md: 'full' }} pos="relative">
        <ModalHeader fontSize="xl" color="gray.700">
          My Gifts
        </ModalHeader>
        <CustomModalCloseButton />
        <ModalBody pb={4} px={gifts.length > 0 ? 5 : 6}>
          <Stack spacing={0}>
            {/*{loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <GiftItemSkeleton key={i} />)
              : gifts.map(item => (
                  <GiftItem
                    key={item.id}
                    gift={item}
                    preferredCurrency={preferredCurrency}
                  />
                ))}*/}
            {gifts.length > 0 ? (
              gifts.map(item => (
                <GiftItem
                  key={item.id}
                  gift={item}
                  preferredCurrency={preferredCurrency}
                />
              ))
            ) : (
              <Text>
                <Highlight
                  query="+"
                  styles={{ px: '1', fontSize: 'lg', fontWeight: 'bold' }}
                >
                  You don't have any wishlist yet. Use the + button below to add
                  one.
                </Highlight>
              </Text>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <GiftItemModalManager
            loading={loading}
            preferredCurrency={preferredCurrency!.symbol}
            onCreateGift={onCreateGift}
            onUpdateGift={onUpdateGift}
            triggerFunc={({ trigger }) => (
              <CustomButton
                onClick={() => trigger()}
                leftIcon={<CiCirclePlus size={30} />}
                as="a"
                textDecoration="none"
                cursor="pointer"
                colorScheme="purple"
                variant="outline"
                size="md"
                w="full"
              >
                Add Item
              </CustomButton>
            )}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

type ModalManagerProps = Pick<
  GiftComponentProps,
  'onCreateGift' | 'onDeleteGift' | 'onUpdateGift' | 'loading'
> & {
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
  gifts: GiftType[];
  preferredCurrency: CurrencyType;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  triggerFunc,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <GiftListModal isOpen={isOpen} onClose={onToggle} {...props} />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};

type GiftItemProps = {
  gift: GiftType;
  preferredCurrency: CurrencyType;
};
const GiftItem: React.FC<GiftItemProps> = ({ gift, preferredCurrency }) => {
  const [showExtra, setShowExtra] = useState(false);
  const nf = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: preferredCurrency.code,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  });

  return (
    <Stack
      borderBottom="1px solid"
      borderColor="gray.200"
      pb={showExtra ? 3 : undefined}
    >
      <Flex
        align="center"
        minH="60px"
        columnGap={2}
        px={1}
        _hover={{
          bg: showExtra ? undefined : 'gray.50',
        }}
        mt={0}
      >
        {!showExtra && <Checkbox colorScheme="purple" size="md" />}

        <Icon
          as={showExtra ? FiChevronDown : FiChevronRight}
          boxSize="1.2em"
          cursor="pointer"
          mx={3}
          onClick={() => setShowExtra(visibility => !visibility)}
          color={showExtra ? 'purple.300' : 'gray.500'}
        />
        <Flex flex={1} flexDir="column">
          <Flex w="full" justify="space-between" columnGap={4}>
            <Text fontSize={{ base: 'sm', md: 'md' }} noOfLines={1}>
              {gift.name}
            </Text>
            <Text fontSize="xs" fontWeight={600}>
              {nf.format(gift.amount)}
            </Text>
          </Flex>
        </Flex>
        <Icon as={GoKebabVertical} cursor="pointer" />
      </Flex>
      {showExtra && (
        <Flex columnGap={3}>
          <Box
            w="50px"
            h="45px"
            border="0.5px solid"
            borderColor="gray.300"
            p="1px"
          >
            {gift.imageUrl ? (
              <Image
                w="full"
                h="full"
                src={gift.imageUrl}
                alt="gift-item"
                objectFit="cover"
              />
            ) : (
              <Icon
                as={BsCardImage}
                w="full"
                h="full"
                cursor="pointer"
                color="purple.300"
              />
            )}
          </Box>
          <Flex flexDir="column" w="full" flexWrap="wrap" px={1} rowGap={2}>
            <Heading as="h6" size="sm">
              {gift.name}
            </Heading>
            {gift.externalUrl && (
              <Stack spacing={0}>
                <Flex align="center" columnGap={1} mt={2} mb={1}>
                  <Text fontSize="sm" noOfLines={1} fontWeight={600}>
                    Link to item
                  </Text>
                  <Icon color="purple.500" as={FaHandPointDown} />
                </Flex>

                <ChakraLink
                  fontSize="sm"
                  href={gift.externalUrl}
                  isExternal
                  color="blue.500"
                >
                  <Text fontSize="sm">{gift.externalUrl}</Text>
                </ChakraLink>
              </Stack>
            )}
            <Text fontSize="sm">{gift.description}</Text>
          </Flex>
        </Flex>
      )}
    </Stack>
  );
};

/*const GiftItemSkeleton = () => (
  <Flex
    align="center"
    h="60px"
    columnGap={3}
    borderBottom="1px solid"
    borderColor="gray.200"
    bg="gray.50"
    px={1}
    mt={0}
  >
    <Skeleton h="15px" w="15px" />
    <Skeleton w="40px" h="35px" borderColor="gray.300" />
    <Flex flex={1} justify="space-between" columnGap={4}>
      <Skeleton h="10px" flex={1} />
      <Skeleton h="10px" w="55px" />
    </Flex>
    <Skeleton h="15px" w="3px" mr={2} />
  </Flex>
);*/
