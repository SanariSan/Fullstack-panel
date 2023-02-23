import type {
  IAccessChangePasswordOutgoingDM,
  TAccessChangePasswordOutgoingFields,
} from './change-password.type';

export class ChangePasswordOutgoingDM implements IAccessChangePasswordOutgoingDM {
  private readonly oldPassword: TAccessChangePasswordOutgoingFields['oldPassword'];

  private readonly newPassword: TAccessChangePasswordOutgoingFields['newPassword'];

  constructor({ oldPassword, newPassword }: TAccessChangePasswordOutgoingFields) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

  public getFields() {
    return {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };
  }
}
