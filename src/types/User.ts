export type User = {
  id: string;
  email: string;
  accountVerified: boolean;
  avatar?: string;
  passwordReset: boolean;
  displayName: string;
  username: string;
};

export type BasicUser = {
  id: string;
  email: string;
  accountVerified: boolean;
};
