import { omit } from 'lodash';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { EventFormPayload, EventFormValues } from 'types/event';

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

export const parseEventFormPayload = (values: EventFormValues) => {
  const payload = { ...omit(values, ['category', 'date']) } as EventFormPayload;
  if (values.category) payload.category = values.category.value;
  if (values.date) payload.date = values.date.toISOString();
  return payload;
};
