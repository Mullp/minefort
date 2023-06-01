import {
  ResponseStatus,
  UserAffiliateStatsResponse,
  UserMeResponse,
} from '../../responses';

export interface UserManagerInterface {
  /**
   * Gets information on the current authenticated user.
   * @return A promise that resolves to an object with user information.
   * @throws {Error} - Throws an error if not authenticated.
   * @example
   * const me = await client.user.getMe();
   * // me = {
   * //   userId: string;
   * //   emailAddress: string;
   * //   credits: number;
   * //   verified: boolean;
   * //   affiliate: string;
   * //   ftp: {password: string};
   * //   status: {twoFactor: boolean};
   * // }
   */
  getMe(): Promise<
    Extract<UserMeResponse, {status: ResponseStatus.OK}>['result']
  >;

  /**
   * Gets affiliate stats for the current authenticated user.
   * @return A promise that resolves to an object with affiliate stats.
   * @throws {Error} - Throws an error if not authenticated.
   * @example
   * const affiliateStats = await client.user.getAffiliateStats();
   * // affiliateStats = {
   * //   totalUsers: {
   * //     today: number;
   * //     total: number;
   * //   };
   * //   totalRevenue: {
   * //     today: number;
   * //     total: number;
   * //   };
   */
  getAffiliateStats(): Promise<
    Extract<UserAffiliateStatsResponse, {status: ResponseStatus.OK}>['result']
  >;

  /**
   * Gets the amount of unpaid affiliate earnings for the current authenticated user.
   * @return A promise that resolves to the amount of unpaid affiliate earnings.
   * @throws {Error} - Throws an error if not authenticated.
   */
  getAffiliateUnpaid(): Promise<number>;
}
