export enum ResponseStatus {
  OK = 'OK',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  INVALID_STATE = 'INVALID_STATE',
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  ITEM_NOT_FOUND = 'ITEM_NOT_FOUND',
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SERVER_NAME_ALREADY_IN_USE = 'SERVER_NAME_ALREADY_IN_USE',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVER_ACCOUNT_LIMIT = 'SERVER_ACCOUNT_LIMIT',
  NO_PERMISSION = 'NO_PERMISSION',
  ENDPOINT_NOT_FOUND = 'ENDPOINT_NOT_FOUND',
}

export type MinefortApiError = {
  body: {
    message: string;
    path: string[];
    type: string;
    context: {
      limit?: string | number;
      valids?: string[];
      value: string | number;
      label: string;
      key: string;
    };
  }[];
};
