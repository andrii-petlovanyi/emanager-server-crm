import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { NotAuthorizedError } from '../helpers/index.js';
import { User } from '../models/mongoose/user.model.js';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

const checkJWT = async (req, _, next) => {
  const [bearer, token] = req.headers.authorization?.split(' ') ?? [];
  try {
    if (bearer !== 'Bearer') {
      throw new NotAuthorizedError('Wrong params bearer! Not authorized');
    }
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token) {
      throw new NotAuthorizedError('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError(error.message));
  }
};

export { checkJWT };
