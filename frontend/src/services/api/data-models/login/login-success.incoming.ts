import { IncomingSuccessDM } from '../data-model-success.incoming';
import type { IIncomingSuccessFields } from '../data-model.type';
import type {
  IAccessLoginIncomingSuccessDM,
  IAccessLoginIncomingSuccessFields,
} from './login.type';

export class AccessLoginIncomingSuccessDM
  extends IncomingSuccessDM
  implements IAccessLoginIncomingSuccessDM
{
  protected readonly isAuthenticated: IAccessLoginIncomingSuccessFields['data']['isAuthenticated'];

  protected readonly username: IAccessLoginIncomingSuccessFields['data']['username'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
    this.username = typeof this.data.username === 'string' ? this.data.username : 'username';
  }

  public getFields(): IAccessLoginIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
        username: this.username,
      },
    };
  }
}
