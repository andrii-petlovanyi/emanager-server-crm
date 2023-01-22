import Joi from 'joi';

const postJoiSchema = Joi.object({
  model: Joi.string().required().min(4).max(16).messages({
    'string.min': `Model length must be at least {{#limit}} characters long`,
    'string.max': `Model length must be at most {{#limit}} characters long`,
  }),
  info: Joi.string().min(20).required().messages({
    'string.min': `Info length must be at least {{#limit}} characters long`,
  }),
  urlOffSite: Joi.string().required().min(6).uri().messages({
    'string.min': `URI official site length must be at least {{#limit}} characters long`,
    'string.uri': 'URI official site must be a valid dataUri string',
  }),
  urlBook: Joi.string().required().min(6).uri().messages({
    'string.min': `URI book site length must be at least {{#limit}} characters long`,
    'string.dui': 'URI book site must be a valid dataUri string',
  }),
  urlImg: Joi.string().required().min(6).uri().messages({
    'string.min': `URI img length must be at least {{#limit}} characters long`,
    'string.uri': 'URI img must be a valid dataUri string',
  }),
});

export { postJoiSchema };
