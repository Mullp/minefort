import {Client} from '../lib';
import {AuthManager} from './AuthManager';

export class BaseManager {
  private _client!: Client;

  public constructor(client: Client) {
    Object.defineProperty(this, 'client', {value: client, enumerable: false});
  }

  get client(): Client {
    return this._client;
  }
}
