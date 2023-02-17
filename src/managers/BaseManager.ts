import {Client} from '../client';

/**
 * Represents an abstract class that provides a base constructor for derived classes to use.
 * @abstract
 */
export abstract class BaseManager {
  /**
   * The client that instantiated this.
   */
  public readonly client: Client;

  protected constructor(client: Client) {
    this.client = client;
  }
}
