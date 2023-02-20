import { IncomingFailureDM } from '../data-model-failure.incoming';
import type { IIncomingFailureFields } from '../data-model.type';
import type {
  IAccessCheckSessionIncomingFailureDM,
  IAccessCheckSessionIncomingFailureFields,
} from './check-session.type';

export class AccessCheckSessionIncomingFailureDM
  extends IncomingFailureDM
  implements IAccessCheckSessionIncomingFailureDM
{
  protected readonly isAuthenticated: IAccessCheckSessionIncomingFailureFields['miscellaneous']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.miscellaneous.isAuthenticated === 'boolean'
        ? this.miscellaneous.isAuthenticated
        : false;
  }

  public getFields(): IAccessCheckSessionIncomingFailureFields {
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
