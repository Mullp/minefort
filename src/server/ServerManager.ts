import {BaseManager} from '../base';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {MyServerReply, ServersReply} from '../reply';
import {AbstractReply} from '../reply';
import {Server} from './Server';
import {MyServer} from './MyServer';
import {IServerManager} from './IServerManager';

/**
 * Manages API methods for servers.
 * @extends {BaseManager}
 */
export class ServerManager extends BaseManager implements IServerManager {
  public constructor(client: Client) {
    super(client);
  }

  public async isNameAvailable(serverName: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + '/server/availability', {
      method: 'POST',
      body: JSON.stringify({
        serverName: serverName,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<AbstractReply<boolean>>)
      .then(this.client.checkResponse)
      .then(value => {
        return value.result;
      })
      .catch(error => {
        throw error;
      });
  }

  public async getOnlineServers(options?: {
    paginationSkip?: number;
    limit?: number;
    sortOrder?: 'desc' | 'asc';
  }): Promise<Server[]> {
    return await fetch(this.client.BASE_URL + '/servers/list', {
      method: 'POST',
      body: JSON.stringify({
        pagination: {
          skip: options?.paginationSkip ?? 0,
          limit: options?.limit ?? 500,
        },
        sort: {
          field: 'players.online',
          order: options?.sortOrder ?? 'desc',
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServersReply>)
      .then(this.client.checkResponse)
      .then(value => {
        return value.result.map(server => new Server(this.client, server));
      })
      .catch(error => {
        throw error;
      });
  }

  public async getMyServers(): Promise<MyServer[]> {
    return await fetch(this.client.BASE_URL + '/user/servers', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<AbstractReply<MyServerReply[]>>)
      .then(this.client.checkResponse)
      .then(value => {
        return value.result.map(server => new MyServer(this.client, server));
      })
      .catch(error => {
        throw error;
      });
  }

  public async createServer(
    serverName: string,
    template = 'default'
  ): Promise<boolean> {
    return await fetch(this.client.BASE_URL + '/server/create', {
      method: 'POST',
      body: JSON.stringify({
        serverName: serverName,
        template: template,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<AbstractReply<{serverId: string}>>)
      .then(this.client.checkResponse)
      .then(() => {
        return true;
      })
      .catch(error => {
        throw error;
      });
  }
}
