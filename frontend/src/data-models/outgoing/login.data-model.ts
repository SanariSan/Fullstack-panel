import type { IAccessLoginFields } from './outgoing.type';

export class LoginOutgoingDM implements IAccessLoginFields {
  public readonly username: IAccessLoginFields['username'];

  public readonly password: IAccessLoginFields['password'];

  constructor({ username, password }: IAccessLoginFields) {
    this.username = username;
    this.password = password;
  }

  public getFields() {
    return { ...this };
  }
}
