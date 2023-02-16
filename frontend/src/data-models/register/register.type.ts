import type {
  IIncomingDM,
  IIncomingFailureFields,
  IIncomingSuccessFields,
  IOutgoingDM,
} from '../data-model.type';

type TAccessRegisterOutgoingFields = {
  email: string;
  username: string;
  password: string;
};

interface IAccessRegisterOutgoingDM extends IOutgoingDM {
  getFields: () => TAccessRegisterOutgoingFields;
}

interface IAccessRegisterIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    username: string;
    isAuthenticated: boolean;
  };
}

interface IAccessRegisterIncomingSuccessDM extends IIncomingDM {
  getFields: () => IAccessRegisterIncomingSuccessFields;
}

interface IAccessRegisterIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
  };
}

interface IAccessRegisterIncomingFailureDM extends IIncomingDM {
  getFields: () => IAccessRegisterIncomingFailureFields;
}

export type {
  IAccessRegisterOutgoingDM,
  TAccessRegisterOutgoingFields,
  IAccessRegisterIncomingSuccessDM,
  IAccessRegisterIncomingFailureDM,
  IAccessRegisterIncomingSuccessFields,
  IAccessRegisterIncomingFailureFields,
};
