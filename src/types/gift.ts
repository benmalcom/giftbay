export type GiftType = {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  giftType: string;
  imageUrl?: string;
  externalUrl?: string;
  amount: number;
  quantity: number;
  allowPartialPayments?: boolean;
};

// Values from wishlist form
export type GiftFormValues = Omit<GiftType, 'eventId' | 'id'>;

// Values to wishlist form
export type GiftFormPayload = Omit<GiftType, 'eventId' | 'id'>;
