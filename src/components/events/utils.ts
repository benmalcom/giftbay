import { omit } from 'lodash';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { EventFormPayload, EventFormValues, EventType } from 'types/event';
import { EVENT_CATEGORIES } from 'utils/constants';

const getSchemaByStep = (step: number) => {
  switch (step) {
    case 1:
    default:
      return yup.object().shape({
        name: yup.string().required('Event name is required'),
        category: yup.object().required('Event category is required'),
        date: yup.date().required('Event start date is required'),
      });
    case 2:
      return yup.object().shape({
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
    setSchema(getSchemaByStep(step));
  }, [step]);
  return schema;
};

export const parseEventFormValues = (values: EventFormValues) => {
  const payload = { ...omit(values, ['category', 'date']) } as EventFormPayload;
  if (values.category) payload.category = values.category.value;
  if (values.date) payload.date = values.date.toISOString();
  return payload;
};

export const transformEventToFormValues = (event: EventType) => {
  const payload = {
    ...omit(event, ['category', 'date']),
  } as Partial<EventFormValues>;
  if (event.category)
    payload.category = EVENT_CATEGORIES.find(
      item => item.value === event.category
    );
  if (event.date) payload.date = new Date(event.date);
  return payload;
};
