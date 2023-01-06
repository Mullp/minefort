export enum ServerWakeupResponseStatus {
  OK = 'OK',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  INVALID_STATE = 'INVALID_STATE',
}

export type ServerWakeupResponse = {
  time: number;
} & (
  | {
      status: ServerWakeupResponseStatus.OK;
      result: {};
    }
  | {
      status: ServerWakeupResponseStatus.NOT_AUTHENTICATED;
    }
  | {
      status: ServerWakeupResponseStatus.INVALID_STATE;
    }
);

export enum ServerStartResponseStatus {
  OK = 'OK',
  INVALID_STATE= "INVALID_STATE"
}

export type ServerStartResponse = {
  time: number;
} & ({
  status: ServerStartResponseStatus.OK;
  result: {};
} | {
  status: ServerStartResponseStatus.INVALID_STATE;
});
