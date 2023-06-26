import {Client} from '../client';
import {IBaseClass} from './IBaseClass';

/**
 * Represents an abstract class that provides a base constructor for derived classes to use.
 * @abstract
 */
export abstract class BaseClass implements IBaseClass {
  /**
   * The client that instantiated this.
   */
  public readonly client: Client;

  protected constructor(client: Client) {
    this.client = client;
  }
}
