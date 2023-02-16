interface IIncomingSuccessFields {
  data: {
    [key: string]: unknown;
  };
}

interface IIncomingFailureFields {
  type: number;
  title: string;
  detail: string;
  miscellaneous: {
    // stack?: string;
    [key: string]: unknown;
  };
}

interface IIncomingDM {
  getFields: () => IIncomingSuccessFields | IIncomingFailureFields;
}

interface IOutgoingDM {
  getFields: () => { [key: string]: unknown } | void;
}

export type { IIncomingDM, IOutgoingDM, IIncomingFailureFields, IIncomingSuccessFields };
