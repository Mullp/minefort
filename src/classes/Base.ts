import {Client} from '../lib';

export class BaseClass {
  public readonly client: Client;
  public constructor(client: Client) {
    this.client = client;
  }
}
