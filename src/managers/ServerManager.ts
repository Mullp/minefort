import {BaseManager} from './BaseManager';
import {Client} from '../lib';
import fetch from 'cross-fetch';
import {
  ServerStartResponse,
  ServerStartResponseStatus,
  ServerWakeupResponse,
  ServerWakeupResponseStatus
} from '../typings';

export class ServerManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
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
        if (value.status === ServerWakeupResponseStatus.OK) {
          return true;
        } else if (
          value.status === ServerWakeupResponseStatus.NOT_AUTHENTICATED
        ) {
          throw new Error('Not authenticated');
        } else if (value.status === ServerWakeupResponseStatus.INVALID_STATE) {
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
        if (value.status === ServerStartResponseStatus.OK) {
          return true;
        } else if (value.status === ServerStartResponseStatus.INVALID_STATE) {
          throw new Error("Invalid state. Server may already be running or asleep.")
        }

        return false;
      })
      .catch(error => {
        throw error;
      })
  }
}
