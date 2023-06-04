import { EventFormPayload, EventType } from 'types/event';
import { createRequest } from './http';
export const updateEvent = async (
  eventId: string,
  payload: Partial<EventType>
) => {
  return await createRequest({
    url: `/events/${eventId}`,
    method: 'put',
    payload,
  });
};

export const deleteEvent = async (eventId: string) => {
  return await createRequest({
    url: `/events/${eventId}`,
    method: 'delete',
  });
};

export const createEvent = async (payload: EventFormPayload) => {
  return await createRequest({
    url: '/events',
    method: 'post',
    payload,
  });
};

export const getEventById = async (
  eventId: string,
  params: Record<string, string | boolean> | null,
  signal: AbortSignal
) => {
  return await createRequest({
    url: `/events/${eventId}`,
    method: 'get',
    params,
    signal,
  });
};

export const getEvents = async (signal: AbortSignal) => {
  return await createRequest({
    url: '/events',
    method: 'get',
    signal,
  });
};
