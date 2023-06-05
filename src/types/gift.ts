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
export type GiftFormValues = Omit<GiftType, 'eventId' | 'id'> & { id?: string };

// Values to wishlist form
export type GiftFormPayload = Omit<GiftType, 'eventId' | 'id'> & {
  id?: string;
  eventId: string;
};

export type GiftComponentProps = {
  onCreateGift(values: Record<string, unknown>, cb?: () => void): void;
  onUpdateGift(
    id: string,
    values: Record<string, unknown>,
    cb?: () => void
  ): void;
  onDeleteGift(id: string, cb?: () => void): void;
  gifts: GiftType[];
  loading: { create: boolean; update: boolean } & Record<string, boolean>;
};
