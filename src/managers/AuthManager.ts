import {BaseManager} from './BaseManager';
import {Client} from '../lib';
import fetch from 'cross-fetch';
import {AuthResponse, AuthStatus} from '../typings';

export class AuthManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
  }

  public async auth(email: string, password: string): Promise<void> {
    await fetch(this.client.BASE_URL + '/auth/login', {
      method: 'POST',
      body: `{"emailAddress":"${email}","password":"${password}"}`,
    })
      .then(res => res.json() as Promise<AuthResponse>)
      .then(value => {});
  }
}
