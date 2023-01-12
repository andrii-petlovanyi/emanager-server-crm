import {
  ConflictError,
  generateToken,
  NotAuthorizedError,
} from '../helpers/index.js';
import { User } from '../models/mongoose/user.model.js';

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password))
    throw new NotAuthorizedError('Email or password is wrong');

  const token = generateToken(user);

  await User.findByIdAndUpdate(user._id, { token });
  return { user, token };
};

const signUp = async ({ name, email, password }) => {
  const user = await User.findOne({ email });

  if (user) throw new ConflictError(`User with email ${email} is registered`);

  const newUser = new User({ name, email });
  newUser.setPassword(password);

  await newUser.save();
  return newUser;
};

const passReset = async ({ email }) => {
  const user = await User.findOne({ email });

  //TODO: function for generate new password
  const password = '123321';
  //TODO: function for send new password on user email

  user.setPassword(password);
  user.save();

  return user;
};

export { signIn, signUp, passReset };
