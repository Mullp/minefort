import {ResponseStatus} from './ResponseStatus';
import {BaseIcon} from './Icon';

export type ServerResponse = {
  serverId: string;
  serverName: string;
  serverIcon: BaseIcon;
  userId: string;
  version: string;
  state: number;
  subscription: {
    currentPackageId: number;
  };
  unlockedIcons: BaseIcon[];
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
      error: {
        body: {
          message: string;
          path: string[];
          type: string;
          context: {
            limit: number;
            value: string;
            label: string;
            key: string;
          };
        }[];
      };
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
      error: {
        body: {
          message: string;
          path: string[];
          type: string;
          context: {
            limit: number;
            value: string;
            label: string;
            key: string;
          };
        }[];
      };
    }
);
