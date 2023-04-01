export type GetMeReturn = {
  userId: string;
  emailAddress: string;
  credits: number;
  verified: boolean;
  affiliate: string;
  ftp: {password: string};
  status: {twoFactor: boolean};
};
