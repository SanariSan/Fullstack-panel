import Joi from 'joi';

export const SCHEME_AUTHENTICATION = {
  login: Joi.object().keys({
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
  }),
  register: Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
  }),
  changePassword: Joi.object().keys({
    oldPassword: Joi.string().min(6).max(30).required(),
    newPassword: Joi.string()
      .min(6)
      .max(30)
      .invalid(Joi.ref('oldPassword'))
      .required()
      .messages({ 'any.invalid': 'New password must be different from old one' }),
  }),
};
