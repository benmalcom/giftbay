import { omit } from 'lodash';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { EventFormPayload, EventFormValues, EventType } from 'types/event';
import {
  WishlistFormPayload,
  WishlistFormValues,
  WishlistType,
} from 'types/wishlist';
import { CURRENCIES, EVENT_CATEGORIES } from 'utils/constants';

const getEventSchemaByStep = (step: number) => {
  switch (step) {
    case 1:
    default:
      return yup.object().shape({
        name: yup.string().required('This is required'),
        category: yup
          .object()
          .shape({
            label: yup.string(),
            value: yup.string(),
          })
          .required('This is required')
          .typeError('This is required'),
        date: yup.date().required('Event start date is required'),
      });
    case 2:
      return yup.object().shape({
        currency: yup
          .object()
          .shape({
            label: yup.string(),
            value: yup.string(),
          })
          .required('Choose preferred currency')
          .typeError('Choose preferred currency'),
        description: yup.string(),
        isPublic: yup.boolean(),
      });
    case 3:
      return yup.object().shape({
        coverPhoto: yup.string(),
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

export const getWishlistFormSchema = () => {
  return yup.object().shape({
    amount: yup.number().required(),
    quantity: yup.number().required(),
    giftFormat: yup.string().required(),
    name: yup.string().required(),
    imageUrl: yup.string(),
    externalUrl: yup.string(),
    allowPartialPayment: yup.boolean(),
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

export const parseWishlistFormValues = (values: WishlistFormValues) =>
  values as WishlistFormPayload;

export const transformWishlistToFormValues = (wishlist: WishlistType) =>
  wishlist as Partial<WishlistFormValues>;
