import {ResponseStatus} from './ResponseStatus';

export type AuthResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: {
        body: {
          message: string;
          path: string[];
          type: string;
          context: {
            limit: number;
            value: string;
            label: string;
            key: string;
          };
        }[];
      };
    }
  | {
      status: ResponseStatus.INVALID_CREDENTIALS;
    }
  | {
      status: ResponseStatus.OK;
      result: {};
    }
);

export type MeResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
  | {
      status: ResponseStatus.OK;
      result: {
        userId: string;
        emailAddress: string;
        credits: number;
        verified: boolean;
        status: {
          twoFactor: boolean;
        };
      };
    }
);
