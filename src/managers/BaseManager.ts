import {Client} from '../lib';
import {AuthManager} from './AuthManager';

export class BaseManager {
  public readonly client!: Client;

  public constructor(client: Client) {
    Object.defineProperty(this, 'client', {value: client, enumerable: false});
  }
}
