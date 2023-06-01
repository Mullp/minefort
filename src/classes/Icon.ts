import {BaseClass} from './Base';
import {Client} from '../client';
import {IconInterface, IconResponse} from '../typings';

/**
 * Represents an {@link Icon}
 * @extends {BaseClass}
 */
export class Icon extends BaseClass implements IconInterface {
  public readonly id: string;
  public readonly item: string;
  public readonly name: string;
  public readonly image: string;
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
