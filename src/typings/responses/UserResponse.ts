import {ResponseStatus} from './ResponseStatus';

export type UserMeResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {
        userId: string;
        emailAddress: string;
        credits: number;
        verified: boolean;
        affiliate: string;
        ftp: {password: string};
        status: {
          twoFactor: boolean;
        };
      };
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
);

export type UserAffiliateStatsResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {
        totalUsers: {
          today: number;
          total: number;
        };
        totalRevenue: {
          today: number;
          total: number;
        };
      };
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
);

export type UserAffiliateUnpaidResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: number;
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
);
