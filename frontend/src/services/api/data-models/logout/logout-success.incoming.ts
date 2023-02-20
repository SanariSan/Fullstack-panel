import { IncomingSuccessDM } from '../data-model-success.incoming';
import type { IIncomingSuccessFields } from '../data-model.type';
import type {
  IAccessLogoutIncomingSuccessDM,
  IAccessLogoutIncomingSuccessFields,
} from './logout.type';

export class AccessLogoutIncomingSuccessDM
  extends IncomingSuccessDM
  implements IAccessLogoutIncomingSuccessDM
{
  protected readonly isAuthenticated: IAccessLogoutIncomingSuccessFields['data']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
  }

  public getFields(): IAccessLogoutIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
      },
    };
  }
}
