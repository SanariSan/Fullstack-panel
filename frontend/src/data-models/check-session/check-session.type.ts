import type {
  IIncomingDM,
  IIncomingFailureFields,
  IIncomingSuccessFields,
} from '../data-model.type';

interface IAccessCheckSessionIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    isAuthenticated: boolean;
  };
}

interface IAccessCheckSessionIncomingSuccessDM extends IIncomingDM {
  getFields: () => IAccessCheckSessionIncomingSuccessFields;
}

interface IAccessCheckSessionIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
  };
}

interface IAccessCheckSessionIncomingFailureDM extends IIncomingDM {
  getFields: () => IAccessCheckSessionIncomingFailureFields;
}

export type {
  IAccessCheckSessionIncomingFailureDM,
  IAccessCheckSessionIncomingSuccessDM,
  IAccessCheckSessionIncomingFailureFields,
  IAccessCheckSessionIncomingSuccessFields,
};
