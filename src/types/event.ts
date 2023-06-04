export type EventType = {
  lastGiftImageUrl: string | undefined;
  id: string;
  user: string;
  name: string;
  description?: string;
  category: string;
  currency: string;
  isPublic: boolean;
  date: string;
  thankYouNote?: string;
  slug: string;
  coverPhotoUrl?: string;
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
  | 'coverPhotoUrl'
  | 'backgroundColor'
  | 'foregroundColor'
> & {
  date: Date;
  category: { label: string; value: string };
  currency: { label: string; value: string };
  id?: string;
};

// Values to event form
export type EventFormPayload = Pick<
  EventType,
  | 'name'
  | 'description'
  | 'isPublic'
  | 'thankYouNote'
  | 'coverPhotoUrl'
  | 'backgroundColor'
  | 'foregroundColor'
> & {
  date: string;
  category: string;
  currency: string;
  id?: string;
};

export type EventCardColor = {
  backgroundColor: string;
  foregroundColor: string;
};

export type EventComponentProps = {
  onCreate(values: Record<string, unknown>, cb?: () => void): void;
  onUpdate(id: string, values: Record<string, unknown>, cb?: () => void): void;
  onDelete(id: string, cb?: () => void): void;
  events: EventType[];
  loading: { get: boolean; create: boolean } & Record<string, boolean>;
};
