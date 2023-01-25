import {Client} from '../lib';

/**
 * Represents an abstract class that provides a base constructor for derived classes to use.
 * @abstract
 */
export abstract class BaseManager {
  /**
   * The client that instantiated this.
   */
  public readonly client!: Client;

  public constructor(client: Client) {
    Object.defineProperty(this, 'client', {value: client, enumerable: false});
  }
}
