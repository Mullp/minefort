export type GetMeReturn = {
  userId: string;
  emailAddress: string;
  credits: number;
  verified: boolean;
  status: {twoFactor: boolean};
};
