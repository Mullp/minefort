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
