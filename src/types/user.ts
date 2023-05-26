export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  accountVerified: boolean;
  avatarUrl?: string;
};

export type Payout = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};
