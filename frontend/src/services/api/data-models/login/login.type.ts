import type {
  IIncomingDM,
  IIncomingFailureFields,
  IIncomingSuccessFields,
  IOutgoingDM,
} from '../data-model.type';

type TAccessLoginOutgoingFields = {
  username: string;
  password: string;
};

interface IAccessLoginOutgoingDM extends IOutgoingDM {
  getFields: () => TAccessLoginOutgoingFields;
}

interface IAccessLoginIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    username: string;
    isAuthenticated: boolean;
  };
}

interface IAccessLoginIncomingSuccessDM extends IIncomingDM {
  getFields: () => IAccessLoginIncomingSuccessFields;
}

interface IAccessLoginIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
  };
}

interface IAccessLoginIncomingFailureDM extends IIncomingDM {
  getFields: () => IAccessLoginIncomingFailureFields;
}

export type {
  TAccessLoginOutgoingFields,
  IAccessLoginOutgoingDM,
  IAccessLoginIncomingFailureDM,
  IAccessLoginIncomingFailureFields,
  IAccessLoginIncomingSuccessDM,
  IAccessLoginIncomingSuccessFields,
};
