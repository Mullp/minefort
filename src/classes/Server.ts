import {BaseClass} from "./Base";

export class Server extends BaseClass {
  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
