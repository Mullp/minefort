import {ResponseStatus, ServerCategory, ServerState} from '../../typings';
import {AbstractReply} from '../AbstractReply';
import {SubUserReply} from '../user';
import {IconReply} from '../icon';

export type ServersReply =
  | AbstractReply<ServerReply[]>
  | {
      status: ResponseStatus.OK;
      result: ServerReply[];
      pagination: {
        more: boolean;
        total: number;
      };
    };

export type ServerReply = {
  serverId: string;
  serverName: string;
  serverIcon: IconReply;
  userId: string;
  version: string;
  state: ServerState;
  messageOfTheDay: string;
  players: {
    online: number;
    list?: Pick<PlayerResponse, 'uuid'>[];
    max: number;
  };
};

export type MyServerReply = {
  serverId: string;
  serverName: string;
  serverIcon: IconReply;
  userId: string;
  version: string;
  category: ServerCategory;
  subUsers: SubUserReply[];
  state: ServerState;
  support: {
    offline: boolean;
    bedrock: boolean;
  };
  usage: {
    ram: number;
    disk: number;
  };
  backups: {
    backupId: string;
    date: string;
  }[];
  subscription: {
    currentPackageId: number;
    nextPackageId?: number;
  };
  unlockedIcons: IconReply[];
  settings: {lobbyVisible: boolean; startupCommand: number; cosmetics: boolean};
  messageOfTheDay: string;
  players: {online: number; list: PlayerResponse[]; max: number};
};

export type PlayerResponse = {
  name: string;
  uuid: string;
};
