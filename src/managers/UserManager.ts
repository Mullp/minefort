import {BaseManager} from './BaseManager';
import {
  ResponseStatus,
  UserManagerInterface,
  UserMeResponse,
  UserAffiliateStatsResponse,
  UserAffiliateUnpaidResponse,
} from '../typings';

import fetch from 'cross-fetch';
import {Client} from '../client';

/**
 * Manages API methods relating to the current authenticated user.
 * @extends {BaseManager}
 */
export class UserManager extends BaseManager implements UserManagerInterface {
  public constructor(client: Client) {
    super(client);
  }

  public async getMe(): Promise<
    Extract<UserMeResponse, {status: ResponseStatus.OK}>['result']
  > {
    return await fetch(this.client.BASE_URL + '/user/me', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<UserMeResponse>)
      .then(value => {
        if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.OK) {
          return value.result;
        }

        throw new Error('An unexpected error has occurred');
      })
      .catch(error => {
        throw error;
      });
  }

  public async getAffiliateStats(): Promise<
    Extract<UserAffiliateStatsResponse, {status: ResponseStatus.OK}>['result']
  > {
    return await fetch(this.client.BASE_URL + '/affiliate/stats', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<UserAffiliateStatsResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        }

        throw new Error('Unknown error');
      })
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
      .then(res => res.json() as Promise<UserAffiliateUnpaidResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        }

        throw new Error('Unknown error');
      })
      .catch(error => {
        throw error;
      });
  }
}
