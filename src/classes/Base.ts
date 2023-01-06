import { Client } from "../lib";

export class BaseClass {
  public client: Client;
  public constructor(client: Client) {
    this.client = client;
  }
}
