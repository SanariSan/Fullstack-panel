import { IncomingFailureDM } from '../data-model-failure.incoming';
import type { IIncomingFailureFields } from '../data-model.type';
import type {
  IAccessRegisterIncomingFailureDM,
  IAccessRegisterIncomingFailureFields,
} from './register.type';

export class AccessRegisterIncomingFailureDM
  extends IncomingFailureDM
  implements IAccessRegisterIncomingFailureDM
{
  protected readonly isAuthenticated: IAccessRegisterIncomingFailureFields['miscellaneous']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.miscellaneous.isAuthenticated === 'boolean'
        ? this.miscellaneous.isAuthenticated
        : false;
  }

  public getFields(): IAccessRegisterIncomingFailureFields {
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
