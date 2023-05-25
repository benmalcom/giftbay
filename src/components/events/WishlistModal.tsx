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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';
import { GoKebabVertical } from 'react-icons/go';
import {
  Button as CustomButton,
  CustomModalCloseButton,
} from 'components/common/Button';
import { CurrencyType } from 'types/common';
import { WishlistType } from 'types/wishlist';

type WishlistProps = {
  wishlist: WishlistType[];
  isOpen: boolean;
  onClose(): void;
  loading?: boolean;
  preferredCurrency: CurrencyType;
};

const WishlistModal: React.FC<WishlistProps> = ({
  wishlist,
  isOpen,
  onClose,
  loading,
  preferredCurrency,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="subtle"
      colorScheme="purple"
    >
      <ModalOverlay />
      <ModalContent w={{ base: '98%', md: 'full' }} pos="relative">
        <ModalHeader fontSize="xl" color="gray.500">
          My Wishlist
        </ModalHeader>
        <CustomModalCloseButton />
        <ModalBody pb={5}>
          <Stack spacing={loading ? 2 : 0}>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <WishlistItemSkeleton key={i} />)
              : wishlist.map(item => (
                  <WishlistItem
                    key={item.id}
                    wishlistItem={item}
                    preferredCurrency={preferredCurrency}
                  />
                ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <CustomButton
            leftIcon={<CiCirclePlus size={30} />}
            as="a"
            textDecoration="none"
            cursor="pointer"
            colorScheme="purple"
            variant="outline"
            size="md"
            w="full"
          >
            Add Item{' '}
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

type ModalManagerProps = {
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
  wishlist: WishlistType[];
  preferredCurrency: CurrencyType;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  triggerFunc,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <WishlistModal isOpen={isOpen} onClose={onToggle} {...props} />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};

type WishlistItemProps = {
  wishlistItem: WishlistType;
  preferredCurrency: CurrencyType;
};
const WishlistItem: React.FC<WishlistItemProps> = ({
  wishlistItem,
  preferredCurrency,
}) => {
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
        columnGap={3}
        px={1}
        _hover={{
          bg: showExtra ? undefined : 'gray.50',
        }}
        mt={0}
      >
        <Checkbox colorScheme="purple" />
        <Box
          w="40px"
          h="35px"
          border="0.5px solid"
          borderColor="gray.300"
          p="1px"
        >
          {wishlistItem.imageUrl ? (
            <Image
              w="full"
              h="full"
              src={wishlistItem.imageUrl}
              alt="wishlist-item"
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
        <Flex flex={1} flexDir="column">
          <Flex w="full" justify="space-between" columnGap={4}>
            <Text fontSize="sm" noOfLines={1}>
              {wishlistItem.name}
            </Text>
            <Text fontSize="sm">{nf.format(wishlistItem.amount)}</Text>
          </Flex>
        </Flex>
        <Icon
          as={GoKebabVertical}
          cursor="pointer"
          onClick={() => setShowExtra(visibility => !visibility)}
        />
      </Flex>
      {showExtra && (
        <Flex flexDir="column" w="full" flexWrap="wrap" px={1} rowGap={2}>
          {wishlistItem.externalUrl && (
            <Stack spacing={0}>
              <Text fontSize="xs" noOfLines={1} fontWeight={600}>
                Link to item
              </Text>
              <ChakraLink
                fontSize="xs"
                href={wishlistItem.externalUrl}
                isExternal
                color="blue.500"
              >
                <Text fontSize="xs" noOfLines={1}>
                  {wishlistItem.externalUrl}
                </Text>
              </ChakraLink>
            </Stack>
          )}
          <Text fontSize="xs">{wishlistItem.description}</Text>
        </Flex>
      )}
    </Stack>
  );
};

const WishlistItemSkeleton = () => (
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
);
