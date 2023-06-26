import {Icon} from './Icon';

export interface IIconManager {
  /**
   * Gets all icons.
   * @returns A list of all icons.
   * @example
   * // Get all icons.
   * const icons = await client.icons.getIcons();
   */
  getIcons(): Promise<Icon[]>;
}
