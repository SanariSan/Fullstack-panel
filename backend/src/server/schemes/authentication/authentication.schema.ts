import Joi from 'joi';

export const SCHEME_AUTHENTICATION = {
  credentials: Joi.object().keys({
    // email: Joi.string().email().required(),
    login: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  }),
  credentialsChange: Joi.object().keys({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  }),
};
