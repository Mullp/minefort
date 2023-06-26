import {AbstractReply} from '../AbstractReply';

export type UserMeReply = AbstractReply<{
  userId: string;
  emailAddress: string;
  credits: number;
  verified: boolean;
  affiliate: string;
  ftp: {password: string};
  status: {
    twoFactor: boolean;
  };
}>;

export type UserAffiliateStatsReply = AbstractReply<{
  totalUsers: {
    today: number;
    total: number;
  };
  totalRevenue: {
    today: number;
    total: number;
  };
}>;
