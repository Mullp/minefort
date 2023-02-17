import {BaseManager} from './BaseManager';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {IconsResponse, ResponseStatus} from '../typings';
import {Icon, Server} from '../classes';

/**
 * Manages API methods for icons.
 * @extends {BaseManager}
 */
export class IconManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
  }

  /**
   * Gets all icons.
   * @returns A promise that resolves to an array of {@link Icon} objects.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get all icons.
   * const iconManager = client.iconManager;
   * const icons = await iconManager.getIcons();
   */
  public async getIcons(): Promise<Icon[]> {
    return await fetch(this.client.BASE_URL + '/server/icons', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<IconsResponse>)
      .then(value => {
        if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.OK) {
          return value.result.map(icon => new Icon(this.client, icon));
        }

        throw new Error('An unexpected error has occurred');
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Gets an icon by its ID or name.
   * @param iconIdOrName - The ID or name of the icon to get.
   * @param options - Options to the method.
   * @param options.byName - Whether to get the icon by its name or not.
   * @returns An {@link Icon} instance.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get an icon by its ID.
   * const iconManager = client.iconManager;
   * const icon = await iconManager.getIcon('iconId');
   * @example
   * // Get an icon by its name.
   * const iconManager = client.iconManager;
   * const icon = await iconManager.getIcon('iconName', { byName: true });
   */
  public async getIcon(
    iconIdOrName: string,
    options: {byName?: boolean} = {byName: false}
  ): Promise<Icon | null> {
    return await this.getIcons()
      .then(icons => {
        if (options.byName) {
          return icons.find(icon => icon.name === iconIdOrName) ?? null;
        } else {
          return icons.find(icon => icon.id === iconIdOrName) ?? null;
        }
      })
      .catch(error => {
        throw error;
      });
  }
}
