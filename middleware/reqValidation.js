import { CustomError } from '../helpers/index.js';

const reqValidation = schema => {
  const func = async (req, res, next) => {
    const body = req.body;

    if (!Object.keys(body).length) {
      next(new CustomError('All fields is required'));
    }

    const { error } = await schema.validate(body);

    if (error) {
      next(new CustomError(error.message));
    }

    next();
  };

  return func;
};

export { reqValidation };
