export type EventType = {
  lastGiftImageUrl: string | undefined;
  id: string;
  user: string;
  name: string;
  description?: string;
  category: string;
  isPublic: boolean;
  date: string;
  thankYouNote?: string;
  slug: string;
  coverPhoto?: string;
  backgroundColor: string;
  foregroundColor: string;
};

// Values from event form
export type EventFormValues = Pick<
  EventType,
  | 'name'
  | 'description'
  | 'isPublic'
  | 'thankYouNote'
  | 'coverPhoto'
  | 'backgroundColor'
  | 'foregroundColor'
> & {
  date: Date;
  category: { label: string; value: string };
};

// Values to event form
export type EventFormPayload = Pick<
  EventType,
  | 'name'
  | 'description'
  | 'isPublic'
  | 'thankYouNote'
  | 'coverPhoto'
  | 'backgroundColor'
  | 'foregroundColor'
> & {
  date: string;
  category: string;
};

export type EventCardColor = {
  backgroundColor: string;
  foregroundColor: string;
};
