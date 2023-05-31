import {Client} from '../client';
import {BaseClassInterface} from '../typings';

/**
 * Represents an abstract class that provides a base constructor for derived classes to use.
 * @abstract
 */
export abstract class BaseClass implements BaseClassInterface {
  /**
   * The client that instantiated this.
   */
  public readonly client: Client;

  protected constructor(client: Client) {
    this.client = client;
  }
}
