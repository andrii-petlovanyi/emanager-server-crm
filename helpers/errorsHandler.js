import { CustomError } from './index.js';

// eslint-disable-next-line no-unused-vars
const errorsHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

export { errorsHandler };
