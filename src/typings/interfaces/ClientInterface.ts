import {
  IconManager,
  NetworkManager,
  ServerManager,
  UserManager,
} from '../../managers';

export interface ClientInterface {
  /**
   * The base url for the Minefort api.
   * @constant
   */
  readonly BASE_URL: string;
  /**
   * The session token. Used to authenticate users.
   */
  sessionToken: string;

  /**
   * The {@link ServerManager} used to access server related methods.
   */
  readonly servers: ServerManager;
  /**
   * The {@link IconManager} used to access icon related methods.
   */
  readonly icons: IconManager;
  /**
   * The {@link NetworkManager} used to access network related methods.
   */
  readonly network: NetworkManager;
  /**
   * The {@link UserManager} used to access user related methods.
   */
  readonly user: UserManager;

  /**
   * The session token with "minefort-session=" appended in front.
   */
  cookie: string;

  /**
   * Authenticate a user.
   * @param email - Email address of the user.
   * @param password - Password of the user.
   * @return A promise that resolves to the session token.
   * @throws {Error} - Throws an error if the input or credentials are invalid.
   * @example
   * const token = await client.auth('email', 'password');
   */
  auth(email: string, password: string): Promise<string>;
}
