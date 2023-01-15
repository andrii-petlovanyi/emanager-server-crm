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
  console.log(user);

  if (user) throw new ConflictError(`User with email ${email} is registered`);

  //TODO: added friendly mess template
  const msg = {
    to: email,
    subject: 'EManager | Registration',
    text: `Hi! Welcome to small CRM for ELXHelper bot! Your credentials: email: ${email} password: ${password} `,
    html: `Hi! Welcome to small CRM for ELXHelper bot! <br><br> Your credentials: <br> email: ${email} <br> password: ${password} <br><br> Please sign in with this credentials!`,
  };

  await emailSender(msg);

  const newUser = new User({ name, email });
  newUser.setPassword(password);

  await newUser.save();
  return newUser;
};

const passReset = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) throw new CustomError(`User with email: ${email} not found`);

  const newPass = generatePass();

  //TODO: added friendly mess template
  const msg = {
    to: email,
    subject: 'EManager | Password Recovery',
    text: `Hi! Your new password: ${newPass} \n Please sign in with new password!`,
    html: `Hi! <br> Your new password: <br> <b>${newPass}</b> <br><br> Please sign in with new password!`,
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

  //TODO: added friendly mess template
  const msg = {
    to: email,
    subject: 'EManager | Change password',
    text: `Hi! You have successfully changed your account password. Your new password: ${password}`,
    html: `Hi! <br> You have successfully changed your account password. <br> Your new password: <br> <b>${password}</b> `,
  };

  await emailSender(msg);

  user.setPassword(password);
  user.save();

  return;
};

export { signIn, signUp, passReset, logOut, changePass };
