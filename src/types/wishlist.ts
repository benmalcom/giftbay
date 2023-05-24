export type WishlistType = {
  id: string;
  event: string;
  name: string;
  description?: string;
  giftFormat: string;
  imageUrl?: string;
  externalUrl?: string;
  amount: number;
  quantity: number;
  allowPartialPayment?: boolean;
};

// Values from wishlist form
export type WishlistFormValues = Omit<WishlistType, 'event' | 'id'>;

// Values to wishlist form
export type WishlistFormPayload = Omit<WishlistType, 'event' | 'id'>;
