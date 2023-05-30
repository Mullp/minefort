import {MinefortApiError, ResponseStatus} from './ResponseStatus';
import {IconResponse} from './IconResponse';

export enum ServerState {
  SERVICE_OFFLINE = 0,
  UPLOADING = 1,
  DOWNLOADING = 2,
  STARTING = 3,
  ONLINE = 4,
  OFFLINE = 5,
  CREATING_BACKUP = 6,
  RESTORING_BACKUP = 7,
  STOPPING = 8,
}

export enum ServerCategory {
  DEFAULT = 'DEFAULT',
  SKYBLOCK = 'SKYBLOCK',
  SURVIVAL = 'SURVIVAL',
  CREATIVE = 'CREATIVE',
  GENS = 'GENS',
  PRISON = 'PRISON',
  PVP = 'PVP',
  ADVENTURE = 'ADVENTURE',
}

export enum SubUserRole {
  VIEWER = 0,
  MODERATOR = 1,
  ADMIN = 2,
}

export type SubUserResponse = {
  userId: string;
  email?: string;
  role: SubUserRole;
  accepted: boolean;
};

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
    list?: Pick<PlayerResponse, 'uuid'>[];
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
  category: ServerCategory;
  subUsers: SubUserResponse[];
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
  unlockedIcons: IconResponse[];
  settings: {lobbyVisible: boolean; startupCommand: number; cosmetics: boolean};
  messageOfTheDay: string;
  players: {online: number; list: PlayerResponse[]; max: number};
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

export type PlayerResponse = {
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
      status: ResponseStatus.ITEM_NOT_FOUND;
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
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
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
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
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
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
);

export type ServerSleepResponse = {
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
      status: ResponseStatus.ITEM_NOT_FOUND;
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
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
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
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
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
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
);

export type ServerIconChangeResponse = {
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
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
  | {
      status: ResponseStatus.INSUFFICIENT_BALANCE;
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
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
);

export type ServerPropertiesResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {
        [key: string]: string | number | boolean | null;
      };
    }
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
);

export type ServerCreateResponse = {
  time: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {
        serverId: string;
      };
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
  | {
      status: ResponseStatus.SERVER_NAME_ALREADY_IN_USE;
    }
  | {
      status: ResponseStatus.SERVER_ACCOUNT_LIMIT;
    }
);
