import {BaseClass} from './Base';
import {Client} from '../lib';
import {
  Player,
  ResponseStatus,
  ServerResponse,
  ServerStartResponse,
  ServerWakeupResponse,
} from '../typings';
import fetch from 'cross-fetch';
import {Icon} from './Icon';

export class Server extends BaseClass {
  public readonly id: string;
  public readonly name: string;
  public readonly icon: Icon;
  public readonly userId: string;
  public readonly version: string;
  public readonly state: number;
  public readonly subscription: {currentPackageId: number};
  public readonly unlockedIcons: Icon[];
  public readonly settings: {lobbyVisible: boolean; startupCommand: number};
  public readonly motd: string;
  public readonly playerData: {
    playerCount: number;
    online: Player[];
    maxPlayers: number;
  };
  public readonly ftp: {password: string};

  public constructor(client: Client, data: ServerResponse) {
    super(client);

    this.id = data.serverId;
    this.name = data.serverName;
    this.icon = new Icon(client, data.serverIcon);
    this.userId = data.userId;
    this.version = data.version;
    this.state = data.state;
    this.subscription = {
      currentPackageId: data.subscription.currentPackageId,
    };
    this.unlockedIcons = data.unlockedIcons.map(icon => new Icon(client, icon));
    this.settings = {
      lobbyVisible: data.settings.lobbyVisible,
      startupCommand: data.settings.startupCommand,
    };
    this.motd = data.messageOfTheDay;
    this.playerData = {
      playerCount: data.players.online,
      online: data.players.list,
      maxPlayers: data.players.max,
    };
    this.ftp = {password: data.ftp.password};
  }

  public async wakeup(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/wakeup`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(value => value.json() as Promise<ServerWakeupResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may already be running.');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async start(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/start`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerStartResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error(
            'Invalid state. Server may already be running or asleep.'
          );
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async stop(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/stop`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerStartResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error(
            'Invalid state. Server may already be stopped or asleep.'
          );
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }
}
