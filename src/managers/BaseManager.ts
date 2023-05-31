import {Client} from '../client';
import {BaseManagerInterface} from '../typings';

/**
 * Represents an abstract class that provides a base constructor for derived classes to use.
 * @abstract
 */
export abstract class BaseManager implements BaseManagerInterface {
  /**
   * The client that instantiated this.
   */
  public readonly client: Client;

  protected constructor(client: Client) {
    this.client = client;
  }
}
