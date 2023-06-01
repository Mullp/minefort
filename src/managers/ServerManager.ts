import {BaseManager} from './BaseManager';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {
  MyServersResponse,
  PluginsResponse,
  ResponseStatus,
  ServerCreateResponse,
  ServerManagerInterface,
  ServerNameAvailableResponse,
  ServersResponse,
} from '../typings';
import {MyServer, Server, Plugin} from '../classes';

/**
 * Manages API methods for servers.
 * @extends {BaseManager}
 */
export class ServerManager
  extends BaseManager
  implements ServerManagerInterface
{
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
      .then(res => res.json() as Promise<ServerNameAvailableResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async getOnlineServers(
    options: {
      paginationSkip?: number;
      limit?: number;
      sortOrder?: 'desc' | 'asc';
    } = {paginationSkip: 0, limit: 500, sortOrder: 'desc'}
  ): Promise<Server[]> {
    return await fetch(this.client.BASE_URL + '/servers/list', {
      method: 'POST',
      body: JSON.stringify({
        pagination: {
          skip: options.paginationSkip || 0,
          limit: options.limit || 500,
        },
        sort: {
          field: 'players.online',
          order: options.sortOrder || 'desc',
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServersResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.map(server => new Server(this.client, server));
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal server error');
        }

        return [];
      })
      .catch(error => {
        throw error;
      });
  }

  public async getOnlineServer(
    serverIdOrName: string,
    options: {byName?: boolean} = {byName: false}
  ): Promise<Server | null> {
    return await this.getOnlineServers()
      .then(servers => {
        if (options.byName) {
          return servers.find(server => server.name === serverIdOrName) ?? null;
        } else {
          return servers.find(server => server.id === serverIdOrName) ?? null;
        }
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
      .then(res => res.json() as Promise<MyServersResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.map(server => new MyServer(this.client, server));
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        }

        return [] as MyServer[];
      })
      .catch(error => {
        throw error;
      });
  }

  public async getMyServer(
    serverIdOrName: string,
    options: {byName?: boolean} = {byName: false}
  ): Promise<MyServer | null> {
    return await this.getMyServers()
      .then(servers => {
        if (options.byName) {
          return servers.find(server => server.name === serverIdOrName) ?? null;
        } else {
          return servers.find(server => server.id === serverIdOrName) ?? null;
        }
      })
      .catch(error => {
        throw error;
      });
  }

  public async getPlugins(
    options: {
      search?: string;
      paginationSkip?: number;
      limit?: number;
      sortOrder?: 'desc' | 'asc';
    } = {search: '', paginationSkip: 0, limit: 25, sortOrder: 'desc'}
  ): Promise<Plugin[]> {
    return await fetch(this.client.BASE_URL + '/plugins/browse', {
      method: 'POST',
      body: JSON.stringify({
        filters: {
          search: options.search || '',
        },
        sort: {
          field: 'downloads',
          order: options.sortOrder || 'desc',
        },
        pagination: {
          skip: options.paginationSkip || 0,
          limit: options.limit || 25,
        },
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<PluginsResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.map(plugin => new Plugin(this.client, plugin));
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        return [];
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
      .then(res => res.json() as Promise<ServerCreateResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        } else if (value.status === ResponseStatus.SERVER_NAME_ALREADY_IN_USE) {
          throw new Error('Server name already in use');
        } else if (value.status === ResponseStatus.SERVER_ACCOUNT_LIMIT) {
          throw new Error('Server limit reached');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }
}
