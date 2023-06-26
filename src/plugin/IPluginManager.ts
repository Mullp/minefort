import {Plugin} from './Plugin';

export interface IPluginManager {
  /**
   * Gets plugins.
   * @param options - Options to the method.
   * @param options.search - The search query.
   * @param options.paginationSkip - The amount of plugins to skip.
   * @param options.limit - The amount of plugins to get.
   * @param options.sortOrder - The order to sort the plugins by.
   * @returns - A list of plugins.
   * @example
   * // Get 5 plugins related to "skript".
   * const plugins = await client.plugin.getPlugins({ search: 'skript', limit: 5 });
   * console.log(plugins);
   */
  getPlugins(options: {
    search?: string;
    paginationSkip?: number;
    limit?: number;
    sortOrder?: 'desc' | 'asc';
  }): Promise<Plugin[]>;
}
