import type { IAccessLoginOutgoingDM, TAccessLoginOutgoingFields } from './login.type';

export class LoginOutgoingDM implements IAccessLoginOutgoingDM {
  private readonly username: TAccessLoginOutgoingFields['username'];

  private readonly password: TAccessLoginOutgoingFields['password'];

  constructor({ username, password }: TAccessLoginOutgoingFields) {
    this.username = username;
    this.password = password;
  }

  public getFields() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
