export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
};

export type BasicUser = {
  id: string;
  email: string;
  isEmailVerified: boolean;
  role: string;
};
