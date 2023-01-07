import {ResponseStatus} from './ResponseStatus';
import {Icon} from './Icon';

export type ServerResponse = {
  serverId: string;
  serverName: string;
  serverIcon: Icon;
  userId: string;
  version: string;
  state: number;
  subscription: {
    currentPackageId: number;
  };
  unlockedIcons: Icon[];
  settings: {lobbyVisible: boolean; startupCommand: number};
  messageOfTheDay: string;
  players: {online: number; list: Player[]; max: number};
  ftp: {password: string};
};

export type ServersResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: ServerResponse[];
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
);

export type Player = {
  name: string;
  uuid: string;
};

export type ServerWakeupResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {};
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
);

export type ServerStartResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {};
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
);
