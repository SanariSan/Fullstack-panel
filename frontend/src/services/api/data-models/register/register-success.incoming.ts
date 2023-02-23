import { IncomingSuccessDM } from '../data-model-success.incoming';
import type { IIncomingSuccessFields } from '../data-model.type';
import type {
  IAccessRegisterIncomingSuccessDM,
  IAccessRegisterIncomingSuccessFields,
} from './register.type';

export class AccessRegisterIncomingSuccessDM
  extends IncomingSuccessDM
  implements IAccessRegisterIncomingSuccessDM
{
  protected readonly isAuthenticated: IAccessRegisterIncomingSuccessFields['data']['isAuthenticated'];

  protected readonly username: IAccessRegisterIncomingSuccessFields['data']['username'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
    this.username = typeof this.data.username === 'string' ? this.data.username : 'username';
  }

  public getFields(): IAccessRegisterIncomingSuccessFields {
    console.log({
      ...super.getFields().data,
    });

    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
        username: this.username,
      },
    };
  }
}
