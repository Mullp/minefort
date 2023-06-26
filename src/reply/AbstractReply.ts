import {MinefortApiError, ResponseStatus} from '../typings';

export type AbstractReply<K> = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: K;
      time?: number;
    }
  | {
      status: Exclude<ResponseStatus, ResponseStatus.OK>;
      error?: MinefortApiError;
    }
);
