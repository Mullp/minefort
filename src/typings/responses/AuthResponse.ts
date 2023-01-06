export enum AuthStatus {
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  OK = 'OK',
}

export type AuthResponse = {
  time: number;
} & (
  | {
      status: AuthStatus.INVALID_INPUT;
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
      status: AuthStatus.INVALID_CREDENTIALS;
    }
  | {
      status: AuthStatus.OK;
      result: {};
    }
);
