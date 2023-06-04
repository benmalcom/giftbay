import { GiftFormPayload, GiftType } from 'types/gift';
import { createRequest } from './http';
export const updateGift = async (
  giftId: string,
  payload: Partial<GiftType>
) => {
  return await createRequest({
    url: `/gifts/${giftId}`,
    method: 'put',
    payload,
  });
};

export const deleteGift = async (giftId: string) => {
  return await createRequest({
    url: `/gifts/${giftId}`,
    method: 'delete',
  });
};

export const createGift = async (payload: GiftFormPayload) => {
  return await createRequest({
    url: '/gifts',
    method: 'post',
    payload,
  });
};

export const getGiftById = async (
  giftId: string,
  params: Record<string, string | boolean> | null,
  signal: AbortSignal
) => {
  return await createRequest({
    url: `/gifts/${giftId}`,
    method: 'get',
    params,
    signal,
  });
};

export const getGifts = async (signal: AbortSignal) => {
  return await createRequest({
    url: '/gifts',
    method: 'get',
    signal,
  });
};
