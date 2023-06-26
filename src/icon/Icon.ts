import {Client} from '../client';
import {BaseClass} from '../base';
import {IIcon} from './IIcon';
import {IconReply} from '../reply';

/**
 * Represents an {@link Icon}
 * @extends {BaseClass}
 */
export class Icon extends BaseClass implements IIcon {
  public readonly id: string;
  public readonly item: string;
  public readonly name: string;
  public readonly imageUrl: string;
  public readonly price?: number;

  public constructor(client: Client, data: IconReply) {
    super(client);

    this.id = data.iconId;
    this.item = data.item;
    this.name = data.name;
    this.imageUrl = data.image;
    this.price = data.credits;
  }
}
