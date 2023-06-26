import {UserAffiliateStatsReply, UserMeReply} from '../reply';
import {ResponseStatus} from '../typings';

export interface IUserManager {
  /**
   * Gets information on the current authenticated user.
   * @return - Information on the current authenticated user.
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
  getMe(): Promise<Extract<UserMeReply, {status: ResponseStatus.OK}>['result']>;

  /**
   * Gets affiliate stats for the current authenticated user.
   * @return - Affiliate stats for the current authenticated user.
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
    Extract<UserAffiliateStatsReply, {status: ResponseStatus.OK}>['result']
  >;

  /**
   * Gets the amount of unpaid affiliate earnings for the current authenticated user.
   * @return - The amount of unpaid affiliate earnings for the current authenticated user.
   */
  getAffiliateUnpaid(): Promise<number>;
}
