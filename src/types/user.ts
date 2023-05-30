export type User = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isVerified: boolean;
  avatarUrl?: string;
};

export type Payout = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};
