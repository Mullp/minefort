import {ResponseStatus} from './ResponseStatus';

export type IconsResponse = {
  time: number;
} & {
  status: ResponseStatus.OK;
  result: IconResponse[];
};

export type IconResponse = Icon & {
  credits: number;
};

export type Icon = {
  iconId: string;
  item: string;
  name: string;
  image: string;
};
