import {BaseClass} from './Base';
import {Client} from '../client';
import {IconResponse} from '../typings';

/**
 * Represents a server {@link Icon}
 * @extends {BaseClass}
 */
export class Icon extends BaseClass {
  /**
   * The ID of the icon.
   */
  public readonly id: string;
  /**
   * The Minecraft item associated with the icon.
   */
  public readonly item: string;
  /**
   * The name of the icon.
   */
  public readonly name: string;
  /**
   * The image URL of the icon.
   */
  public readonly image: string;
  /**
   * The cost of the icon in Minefort credits.
   */
  public readonly credits?: number;

  public constructor(client: Client, data: IconResponse) {
    super(client);

    this.id = data.iconId;
    this.item = data.item;
    this.name = data.name;
    this.image = data.image;

    this.credits = data.credits;
  }
}
