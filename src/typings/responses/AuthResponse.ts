export enum AuthResponseStatus {
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  OK = 'OK',
}

export type AuthResponse = {
  time: number;
} & (
  | {
      status: AuthResponseStatus.INVALID_INPUT;
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
      status: AuthResponseStatus.INVALID_CREDENTIALS;
    }
  | {
      status: AuthResponseStatus.OK;
      result: {};
    }
);
