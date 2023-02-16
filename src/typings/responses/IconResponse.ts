import {ResponseStatus} from './ResponseStatus';

export type IconsResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: IconResponse[];
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
);

export type IconResponse = {
  iconId: string;
  item: string;
  name: string;
  image: string;
  credits?: number;
};
