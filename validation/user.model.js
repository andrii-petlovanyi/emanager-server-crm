import Joi from 'joi';
import { emailRegExp } from '../helpers/index.js';

const signInJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': `Please enter a valid email address`,
  }),
  password: Joi.string().min(6).max(12).required().messages({
    'string.min': `Password length must be at least {{#limit}} characters long`,
    'string.max': `Password length must be at most {{#limit}} characters long`,
  }),
});

const signUpJoiSchema = Joi.object({
  name: Joi.string().min(2).max(20).messages({
    'string.min': `Name length must be at least {{#limit}} characters long`,
    'string.max': `Name length must be at most {{#limit}} characters long`,
  }),
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': `Please enter a valid email address`,
  }),
  password: Joi.string().min(6).max(12).required().messages({
    'string.min': `Password length must be at least {{#limit}} characters long`,
    'string.max': `Password length must be at most {{#limit}} characters long`,
  }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': `Please enter a valid email address`,
  }),
});

const changePasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': `Please enter a valid email address`,
  }),
  password: Joi.string().min(6).max(12).required().messages({
    'string.min': `New password length must be at least {{#limit}} characters long`,
    'string.max': `New password length must be at most {{#limit}} characters long`,
  }),
});

export {
  signInJoiSchema,
  signUpJoiSchema,
  forgotPasswordSchema,
  changePasswordSchema,
};
