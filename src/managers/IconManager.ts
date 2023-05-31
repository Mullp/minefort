import {BaseManager} from './BaseManager';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {IconManagerInterfeace, IconsResponse, ResponseStatus} from '../typings';
import {Icon} from '../classes';

/**
 * Manages API methods for icons.
 * @extends {BaseManager}
 */
export class IconManager extends BaseManager implements IconManagerInterfeace {
  public constructor(client: Client) {
    super(client);
  }

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
