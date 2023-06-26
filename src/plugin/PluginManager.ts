import {Client} from '../client';
import fetch from 'cross-fetch';
import {PluginsReply} from '../reply';
import {IPluginManager} from './IPluginManager';
import {Plugin} from './Plugin';
import {BaseManager} from '../base';

/**
 * Manages API methods for plugins.
 * @extends {BaseManager}
 */
export class PluginManager extends BaseManager implements IPluginManager {
  public constructor(client: Client) {
    super(client);
  }

  public async getPlugins(options?: {
    search?: string;
    paginationSkip?: number;
    limit?: number;
    sortOrder?: 'desc' | 'asc';
  }): Promise<Plugin[]> {
    return await fetch(this.client.BASE_URL + '/plugins/browse', {
      method: 'POST',
      body: JSON.stringify({
        filters: {
          search: options?.search ?? '',
        },
        sort: {
          field: 'downloads',
          order: options?.sortOrder ?? 'desc',
        },
        pagination: {
          skip: options?.paginationSkip ?? 0,
          limit: options?.limit ?? 25,
        },
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<PluginsReply>)
      .then(this.client.checkResponse)
      .then(value =>
        value.result.map(plugin => new Plugin(this.client, plugin))
      )
      .catch(error => {
        throw error;
      });
  }
}
