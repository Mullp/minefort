import {Client} from '../client';
import fetch from 'cross-fetch';
import {Icon} from './Icon';
import {AbstractReply, IconReply} from '../reply';
import {IIconManager} from './IIconManager';
import {BaseManager} from '../base';

/**
 * Manages API methods for icons.
 * @extends {BaseManager}
 */
export class IconManager extends BaseManager implements IIconManager {
  public constructor(client: Client) {
    super(client);
  }

  public async getIcons(): Promise<Icon[]> {
    return await fetch(this.client.BASE_URL + '/server/icons', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<AbstractReply<IconReply[]>>)
      .then(this.client.checkResponse)
      .then(value => value.result.map(icon => new Icon(this.client, icon)))
      .catch(error => {
        throw error;
      });
  }
}
