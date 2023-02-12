interface IAccessLoginFields {
  username: string;
  password: string;
}
interface IAccessLoginDM {
  getFields: () => IAccessLoginFields;
}

interface IAccessRegisterFields {
  email: string;
  username: string;
  password: string;
}
interface IAccessRegisterDM {
  getFields: () => IAccessRegisterFields;
}

interface IAccessChangePasswordFields {
  oldPassword: string;
  newPassword: string;
}
interface IAccessChangePasswordDM {
  getFields: () => IAccessRegisterFields;
}

export type {
  IAccessLoginFields,
  IAccessLoginDM,
  IAccessRegisterFields,
  IAccessRegisterDM,
  IAccessChangePasswordFields,
  IAccessChangePasswordDM,
};
