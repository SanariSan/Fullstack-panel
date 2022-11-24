import Joi from 'joi';

export const SCHEME_AUTHENTICATION = {
  login: Joi.object().keys({
    username: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  register: Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  }),
  changePassword: Joi.object().keys({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  }),
};
