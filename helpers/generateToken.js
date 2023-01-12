import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

const generateToken = ({ _id: id, email }) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '24h' });
};
export { generateToken };
