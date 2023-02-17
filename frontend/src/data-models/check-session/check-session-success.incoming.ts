import { IncomingSuccessDM } from '../data-model-success.incoming';
import type { IIncomingSuccessFields } from '../data-model.type';
import type {
  IAccessCheckSessionIncomingSuccessDM,
  IAccessCheckSessionIncomingSuccessFields,
} from './check-session.type';

export class AccessCheckSessionIncomingSuccessDM
  extends IncomingSuccessDM
  implements IAccessCheckSessionIncomingSuccessDM
{
  protected readonly isAuthenticated: IAccessCheckSessionIncomingSuccessFields['data']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
  }

  public getFields(): IAccessCheckSessionIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
      },
    };
  }
}
