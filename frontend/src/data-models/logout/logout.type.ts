import type {
  IIncomingDM,
  IIncomingFailureFields,
  IIncomingSuccessFields,
} from '../data-model.type';

interface IAccessLogoutIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    isAuthenticated: boolean;
  };
}

interface IAccessLogoutIncomingSuccessDM extends IIncomingDM {
  getFields: () => IAccessLogoutIncomingSuccessFields;
}

interface IAccessLogoutIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
  };
}

interface IAccessLogoutIncomingFailureDM extends IIncomingDM {
  getFields: () => IAccessLogoutIncomingFailureFields;
}

export type {
  IAccessLogoutIncomingFailureDM,
  IAccessLogoutIncomingSuccessDM,
  IAccessLogoutIncomingFailureFields,
  IAccessLogoutIncomingSuccessFields,
};
