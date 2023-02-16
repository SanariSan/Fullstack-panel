import { IncomingSuccessDM } from '../data-model-success.incoming';
import type { IIncomingSuccessFields } from '../data-model.type';
import type {
  IAccessChangePasswordIncomingSuccessDM,
  IAccessChangePasswordIncomingSuccessFields,
} from './change-password.type';

export class AccessChangePasswordIncomingSuccessDM
  extends IncomingSuccessDM
  implements IAccessChangePasswordIncomingSuccessDM
{
  protected readonly isAuthenticated: IAccessChangePasswordIncomingSuccessFields['data']['isAuthenticated'];

  protected readonly username: IAccessChangePasswordIncomingSuccessFields['data']['username'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
    this.username = typeof this.data.username === 'string' ? this.data.username : 'username';
  }

  public getFields(): IAccessChangePasswordIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
        username: this.username,
      },
    };
  }
}
