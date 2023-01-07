import {BaseManager} from './BaseManager';
import {Client} from '../lib';
import fetch from 'cross-fetch';
import {ResponseStatus, ServersResponse} from '../typings';
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

  public async get(serverId: string): Promise<Server | void> {
    return await this.getAll()
      .then(servers =>
        servers.find(server => server.id === serverId))
      .catch(error => {
        throw error;
      })
  }
}
