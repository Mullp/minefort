import {Icon} from '../../../classes';

export interface IconManagerInterfeace {
  /**
   * Gets all icons.
   * @returns A promise that resolves to an array of {@link Icon} objects.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get all icons.
   * const icons = await client.icons.getIcons();
   */
  getIcons(): Promise<Icon[]>;

  /**
   * Gets an icon by its ID or name.
   * @param iconIdOrName - The ID or name of the icon to get.
   * @param options - Options to the method.
   * @param options.byName - Whether to get the icon by its name or not.
   * @returns An {@link Icon} instance.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get an icon by its ID.
   * const icon = await client.icons.getIcon('iconId');
   * @example
   * // Get an icon by its name.
   * const icon = await client.icons.getIcon('iconName', { byName: true });
   */
  getIcon(
    iconIdOrName: string,
    options: {byName?: boolean}
  ): Promise<Icon | null>;
}
