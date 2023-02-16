import { IncomingFailureDM } from '../data-model-failure.incoming';
import type { IIncomingFailureFields } from '../data-model.type';
import type {
  IAccessLogoutIncomingFailureDM,
  IAccessLogoutIncomingFailureFields,
} from './logout.type';

export class AccessLogoutIncomingFailureDM
  extends IncomingFailureDM
  implements IAccessLogoutIncomingFailureDM
{
  protected readonly isAuthenticated: IAccessLogoutIncomingFailureFields['miscellaneous']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.miscellaneous.isAuthenticated === 'boolean'
        ? this.miscellaneous.isAuthenticated
        : false;
  }

  public getFields(): IAccessLogoutIncomingFailureFields {
    const fields = super.getFields();
    return {
      ...fields,
      miscellaneous: {
        ...fields.miscellaneous,
        isAuthenticated: this.isAuthenticated,
      },
    };
  }
}
