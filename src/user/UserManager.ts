import {BaseManager} from '../base';
import {ResponseStatus} from '../typings';
import fetch from 'cross-fetch';
import {Client} from '../client';
import {AbstractReply, UserAffiliateStatsReply, UserMeReply} from '../reply';
import {IUserManager} from './IUserManager';

/**
 * Manages API methods relating to the current authenticated user.
 * @extends {BaseManager}
 */
export class UserManager extends BaseManager implements IUserManager {
  public constructor(client: Client) {
    super(client);
  }

  public async getMe(): Promise<
    Extract<UserMeReply, {status: ResponseStatus.OK}>['result']
  > {
    return await fetch(this.client.BASE_URL + '/user/me', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<UserMeReply>)
      .then(this.client.checkResponse)
      .then(value => value.result)
      .catch(error => {
        throw error;
      });
  }

  public async getAffiliateStats(): Promise<
    Extract<UserAffiliateStatsReply, {status: ResponseStatus.OK}>['result']
  > {
    return await fetch(this.client.BASE_URL + '/affiliate/stats', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<UserAffiliateStatsReply>)
      .then(this.client.checkResponse)
      .then(value => value.result)
      .catch(error => {
        throw error;
      });
  }

  public async getAffiliateUnpaid(): Promise<number> {
    return await fetch(this.client.BASE_URL + '/affiliate/unpaid', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<AbstractReply<number>>)
      .then(this.client.checkResponse)
      .then(value => value.result)
      .catch(error => {
        throw error;
      });
  }
}
