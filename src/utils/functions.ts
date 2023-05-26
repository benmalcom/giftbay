import { User } from 'types/user';

export const getUserFullName = (user: User) =>
  `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
