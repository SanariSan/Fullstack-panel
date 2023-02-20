import { IncomingFailureDM } from '../data-model-failure.incoming';
import type { IIncomingFailureFields } from '../data-model.type';
import type {
  IAccessLoginIncomingFailureDM,
  IAccessLoginIncomingFailureFields,
} from './login.type';

export class AccessLoginIncomingFailureDM
  extends IncomingFailureDM
  implements IAccessLoginIncomingFailureDM
{
  protected readonly isAuthenticated: IAccessLoginIncomingFailureFields['miscellaneous']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.miscellaneous.isAuthenticated === 'boolean'
        ? this.miscellaneous.isAuthenticated
        : false;
  }

  public getFields(): IAccessLoginIncomingFailureFields {
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
