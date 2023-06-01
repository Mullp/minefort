import {MinefortApiError, ResponseStatus} from './ResponseStatus';
import {IconResponse} from './IconResponse';
import {ServerCategory, ServerState, SubUserRole} from '../ServerTypings';

export type SubUserResponse = {
  userId: string;
  email?: string;
  role: SubUserRole;
  accepted: boolean;
};

export type PluginTypeResponse = {
  pluginId: string;
  versionId: number;
  name: string;
  description: string;
  icon: string;
  installable: boolean;
};

export type PluginsResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: PluginTypeResponse[];
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
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
);

export type ServerPluginInstallResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {};
    }
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
);

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
  time?: number;
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
  time?: number;
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
  time?: number;
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
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerStartResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerStopResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerKillResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerSleepResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerDeleteResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerNameAvailableResponse = {
  time?: number;
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
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerMotdChangeResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerPropertyChangeResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerIconChangeResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerConsoleResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerPropertiesResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerCreateResponse = {
  time?: number;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
);

export type ServerSubUsersResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: SubUserResponse[];
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerSubUserUpdateResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {};
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerSubUserDeleteResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {};
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type ServerSubUserInviteResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: {};
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
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
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
);

export type FileResponse = {
  fileName: string;
  fileType: string;
};

export type ServerFilesListResponse = {
  time?: number;
} & (
  | {
      status: ResponseStatus.OK;
      result: FileResponse[];
    }
  | {
      status: ResponseStatus.NOT_AUTHENTICATED;
    }
  | {
      status: ResponseStatus.INVALID_STATE;
    }
  | {
      status: ResponseStatus.NO_PERMISSION;
    }
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
);

export type ServerFileCreateResponse = {
  time?: number;
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
      status: ResponseStatus.NO_PERMISSION;
    }
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
);

export type ServerFileDeleteResponse = {
  time?: number;
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
      status: ResponseStatus.NO_PERMISSION;
    }
  | {
      status: ResponseStatus.ITEM_NOT_FOUND;
    }
  | {
      status: ResponseStatus.INTERNAL_ERROR;
    }
  | {
      status: ResponseStatus.INVALID_INPUT;
      error: MinefortApiError;
    }
);
