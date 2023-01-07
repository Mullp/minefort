import {BaseManager} from './BaseManager';
import {Client} from '../lib';
import fetch from 'cross-fetch';
import {
  ResponseStatus,
  ServersResponse,
  ServerStartResponse,
  ServerWakeupResponse,
} from '../typings';
import {Server} from '../classes';

export class ServerManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
  }

  public async getAll(): Promise<Server[]> {
    return await fetch(this.client.BASE_URL + '/user/servers', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<ServersResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.map(server => new Server(this.client, server));
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        }

        return [] as Server[];
      })
      .catch(error => {
        throw error;
      });
  }

  public async wakeup(serverId: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${serverId}/wakeup`, {
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

  public async start(serverId: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${serverId}/start`, {
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
}
