import {MinefortApiError, ResponseStatus} from './ResponseStatus';
import {IconResponse} from './IconResponse';

export enum ServerState {
  SLEEPING = 0,
  ARCHIVING = 1,
  DOWNLOADING = 2,
  STARTING = 3,
  ONLINE = 4,
  OFFLINE = 5,
  CREATING_BACKUP = 6,
  RESTORING_BACKUP = 7,
}

export type ServerResponse = {
  serverId: string;
  serverName: string;
  serverIcon: IconResponse;
  userId: string;
  version: string;
  state: ServerState;
  messageOfTheDay: string;
  players: {
    online: number;
    list?: Omit<Player, 'name'>[];
    max: number;
  };
};

export type ServersResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: ServerResponse[];
      pagination: {
        more: boolean;
        total: number;
      };
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
);

export type MyServerResponse = {
  serverId: string;
  serverName: string;
  serverIcon: IconResponse;
  userId: string;
  version: string;
  state: ServerState;
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
  unlockedIcons: IconResponse[];
  settings: {lobbyVisible: boolean; startupCommand: number};
  messageOfTheDay: string;
  players: {online: number; list: Player[]; max: number};
  ftp: {password: string};
};

export type MyServersResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: MyServerResponse[];
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
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
);

export type ServerStopResponse = {
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

export type ServerKillResponse = {
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

export type ServerDeleteResponse = {
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
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
  | {
      status: ResponseStatus.INVALID_CREDENTIALS;
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
);

export type ServerNameAvailableResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: boolean;
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
);

export type ServerNameChangeResponse = {
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
  | {
      status: ResponseStatus.SERVER_NAME_ALREADY_IN_USE;
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
);

export type ServerMotdChangeResponse = {
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
  | {
      status: ResponseStatus.INVALID_INPUT;
      error?: MinefortApiError;
    }
);

export type ServerPropertyChangeResponse = {
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
);

export type ServerConsoleResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: string;
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
);
