import {ResponseStatus} from './ResponseStatus';

export type IconsResponse = {
  time: number;
} & {
  status: ResponseStatus.OK;
  result: IconResponse[];
};

export type IconResponse = BaseIcon & {
  credits: number;
};

export type BaseIcon = {
  iconId: string;
  item: string;
  name: string;
  image: string;
};
