export const TICKET_COLORS = [
  '#BE108D',
  '#7B68ED',
  '#CA99BC',
  '#07A092',
  '#9BA5B4',
  '#EB0039',
  '#FFFFFF',
  '#000000',
];

export const DEFAULT_TICKET_COLORS = {
  foregroundColor: '#FFFFFF',
  backgroundColor: '#5A11EE',
};

export const EVENT_CATEGORIES = [
  { value: 'party_lifestyle', label: 'Party/Lifestyle' },
  { value: 'conference', label: 'Conference' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'wedding_reception', label: 'Wedding/Reception' },
  { value: 'seminar_webinar', label: 'Seminar/Webinar' },
  { value: 'hangouts_meetups', label: 'Hangouts/Meetups' },
  { value: 'concert', label: 'Concert' },
  { value: 'recreation', label: 'Recreation' },
  { value: 'others', label: 'Others' },
];

// capitalize the values
export const eventAddonTypeValues = {
  SINGLE_PAYMENT: 'SinglePayment',
  PAYMENT_LIST: 'PaymentList',
};

export const eventAddonTypeLabels = {
  [eventAddonTypeValues.SINGLE_PAYMENT]: 'SinglePayment',
  [eventAddonTypeValues.PAYMENT_LIST]: 'List',
};

export const EVENT_ADDON_TYPES = [
  { value: eventAddonTypeValues.SINGLE_PAYMENT, label: 'One-time Payment' },
  {
    value: eventAddonTypeValues.PAYMENT_LIST,
    label: 'List of items (e.g whishlist)',
  },
];

// capitalize the values
export const admissionTypeValues = {
  INVITE: 'invite',
  TICKET: 'ticket',
};

export const admissionTypeLabels = {
  [admissionTypeValues.INVITE]: 'Invite',
  [admissionTypeValues.TICKET]: 'Ticket',
};

export const EVENT_ADMISSION_TYPES = [
  { value: admissionTypeValues.TICKET, label: 'Ticket' },
  { value: admissionTypeValues.INVITE, label: 'Invite' },
];

export const EVENT_LOCATION_TYPES = [
  { value: 'physical', label: 'Physical' },
  { value: 'virtual', label: 'Virtual' },
];

export const DEFAULT_TICKET = {
  label: 'Regular',
  price: 5000,
  quantity: 30,
  unlimited: false,
};

// capitalize the values
export const genderFieldValues = {
  MALE: 'male',
  FEMALE: 'female',
};

export const genderFieldLabels = {
  [genderFieldValues.MALE]: 'Male',
  [genderFieldValues.FEMALE]: 'Female',
};

export const GENDER_FIELDS = [
  { value: genderFieldValues.MALE, label: 'Male' },
  { value: genderFieldValues.FEMALE, label: 'Female' },
];

export const EVENT_CHECKOUT_FIELDS = {
  fullName: {
    label: 'Full name',
    name: 'fullName',
  },
  email: {
    required: true,
    label: 'Email address',
    name: 'email',
  },
  mobile: {
    label: 'Phone number',
    name: 'mobile',
  },
  age: {
    label: 'Age',
    name: 'age',
  },
  gender: {
    label: 'Gender',
    name: 'gender',
  },
};
