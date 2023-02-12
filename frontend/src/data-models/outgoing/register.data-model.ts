import type { IAccessRegisterDM, IAccessRegisterFields } from './outgoing.type';

export class RegisterOutgoingDM implements IAccessRegisterDM {
  private readonly email: IAccessRegisterFields['email'];

  private readonly username: IAccessRegisterFields['username'];

  private readonly password: IAccessRegisterFields['password'];

  constructor({ email, username, password }: IAccessRegisterFields) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  public getFields() {
    // return { ...this };
    return {
      email: this.email,
      username: this.username,
      password: this.password,
    };
  }
}
