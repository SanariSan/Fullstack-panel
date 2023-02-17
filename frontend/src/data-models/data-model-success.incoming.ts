import type { IIncomingDM, IIncomingSuccessFields } from './data-model.type';

export class IncomingSuccessDM implements IIncomingDM {
  protected data: IIncomingSuccessFields['data'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    const { data } = parsedJsonObject;
    this.data = typeof data === 'object' ? data : {};
  }

  public getFields() {
    return {
      data: this.data,
    };
  }
}
