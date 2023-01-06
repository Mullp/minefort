import {BaseManager} from './BaseManager';
import {Client} from '../lib';
import fetch from 'cross-fetch';
import {AuthResponse, AuthStatus} from '../typings';

export class AuthManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
  }

  public async authenticate(email: string, password: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + '/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        emailAddress: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => {
        return Promise.all([
          res.json() as Promise<AuthResponse>,
          res.headers
            .get('set-cookie')
            ?.split('; ')[0]
            .replace('minefort-session=', ''),
        ]);
      })
      .then(value => {
        if (value[0].status === AuthStatus.OK) {
          if (value[1]) {
            this.client.cookie = value[1];
          }
          return true;
        } else if (value[0].status === AuthStatus.INVALID_CREDENTIALS) {
          throw new Error('Invalid credentials');
        } else if (value[0].status === AuthStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value[0].error.body[0].message);
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }
}
