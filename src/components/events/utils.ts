import { omit } from 'lodash';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { EventFormPayload, EventFormValues, EventType } from 'types/event';
import { GiftFormPayload, GiftFormValues, GiftType } from 'types/gift';
import { CURRENCIES, EVENT_CATEGORIES } from 'utils/constants';

const getEventSchemaByStep = (step: number) => {
  switch (step) {
    case 1:
    default:
      return yup.object().shape({
        name: yup
          .string()
          .required('This is required')
          .max(40, 'Maximum of 40 characters.'),
        category: yup.object().required('This is required'),
        date: yup.date().required('Event start date is required'),
      });
    case 2:
      return yup.object().shape({
        currency: yup.object().required('Choose preferred currency'),
        description: yup.string(),
        isPublic: yup.boolean(),
      });
    case 3:
      return yup.object().shape({
        coverPhotoUrl: yup.string(),
        thankYouNote: yup.string(),
      });
  }
};
export const useEventFormSchema = ({ step }: { step: number }) => {
  const [schema, setSchema] = useState(yup.object().shape({}));
  useEffect(() => {
    setSchema(getEventSchemaByStep(step));
  }, [step]);
  return schema;
};

export const getGiftFormSchema = () => {
  return yup.object().shape({
    amount: yup.number().typeError('Valid amount required').required(),
    quantity: yup.number().required(),
    giftType: yup.string().required(),
    name: yup.string().required('This is required'),
    imageUrl: yup.string(),
    externalUrl: yup.string(),
    description: yup.string(),
    allowPartialPayments: yup.boolean(),
  });
};

export const parseEventFormValues = (values: EventFormValues) => {
  const payload = {
    ...omit(values, ['category', 'date', 'currency']),
  } as EventFormPayload;
  if (values.category) payload.category = values.category.value;
  if (values.currency) payload.currency = values.currency.value;
  if (values.date) payload.date = values.date.toISOString();
  return payload;
};

export const transformEventToFormValues = (event: EventType) => {
  const payload = {
    ...omit(event, ['category', 'date', 'currency']),
  } as Partial<EventFormValues>;
  if (event.category)
    payload.category = EVENT_CATEGORIES.find(
      item => item.value === event.category
    );
  if (event.currency)
    payload.currency = CURRENCIES.find(item => item.value === event.currency);
  if (event.date) payload.date = new Date(event.date);
  return payload;
};

export const parseGiftFormValues = (values: GiftFormValues) =>
  values as GiftFormPayload;

export const transformGiftToFormValues = (gift: GiftType) =>
  gift as Partial<GiftFormValues>;
