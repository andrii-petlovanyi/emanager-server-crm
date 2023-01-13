import {
  ConflictError,
  CustomError,
  emailSender,
  generatePass,
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

  if (!user) throw new CustomError(`User with email: ${email} not found`);

  const newPass = generatePass();
  const msg = {
    to: email,
    subject: 'EManager | Password Recovery',
    text: `Hi! Your new password: ${newPass} \n Please sign in with new password!`,
    html: `Hi! Your new password: <b>${newPass}</b> \n Please sign in with new password!`,
  };

  await emailSender(msg);

  user.setPassword(newPass);
  user.save();

  return;
};

const logOut = async id => {
  const user = await User.findByIdAndUpdate(id, { token: null });

  if (!user) throw new NotAuthorizedError('Not authorized');

  return;
};

const changePass = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new NotAuthorizedError('Not authorized');

  const msg = {
    to: email,
    subject: 'EManager | Change password',
    text: `Hi! You have successfully changed your account password. Your new password: ${password}`,
    html: `Hi! You have successfully changed your account password. Your new password: <b>${password}</b> `,
  };

  await emailSender(msg);

  user.setPassword(password);
  user.save();

  return;
};

export { signIn, signUp, passReset, logOut, changePass };
