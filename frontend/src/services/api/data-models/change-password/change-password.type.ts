import type {
  IIncomingDM,
  IIncomingFailureFields,
  IIncomingSuccessFields,
  IOutgoingDM,
} from '../data-model.type';

type TAccessChangePasswordOutgoingFields = {
  oldPassword: string;
  newPassword: string;
};

interface IAccessChangePasswordOutgoingDM extends IOutgoingDM {
  getFields: () => TAccessChangePasswordOutgoingFields;
}

interface IAccessChangePasswordIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    username: string;
    isAuthenticated: boolean;
  };
}

interface IAccessChangePasswordIncomingSuccessDM extends IIncomingDM {
  getFields: () => IAccessChangePasswordIncomingSuccessFields;
}

interface IAccessChangePasswordIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
    invalidParams?: Array<{ name: string; reason: string }>;
  };
}

interface IAccessChangePasswordIncomingFailureDM extends IIncomingDM {
  getFields: () => IAccessChangePasswordIncomingFailureFields;
}

export type {
  IAccessChangePasswordOutgoingDM,
  TAccessChangePasswordOutgoingFields,
  IAccessChangePasswordIncomingFailureDM,
  IAccessChangePasswordIncomingFailureFields,
  IAccessChangePasswordIncomingSuccessDM,
  IAccessChangePasswordIncomingSuccessFields,
};
