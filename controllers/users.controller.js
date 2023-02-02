import {
  changeEmail,
  changeNote,
  changePass,
  clearNotifications,
  countNotifications,
  logOut,
  passReset,
  signIn,
  signUp,
} from '../services/users.service.js';

// import EventEmitter from 'events';

// function hello() {
//   let summary = 0;

//   for (let i = 0; i <= 500000000; i++) {
//     summary += i;
//   }

//   console.log(summary);
// }

// const myEmiter = new EventEmitter();

// myEmiter.addListener('hello', hello);

const signInCtrl = async (req, res) => {
  const body = req.body;

  // setTimeout(() => {
  //   myEmiter.emit('hello');
  // }, 2000);

  const { token, user } = await signIn(body);

  res.status(200).json({
    status: 'success',
    code: 200,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      note: user.note,
    },
  });
};

const signUpCtrl = async (req, res) => {
  const body = req.body;

  const user = await signUp(body);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'You are sign up successfully!',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const passResetCtrl = async (req, res) => {
  const body = req.body;

  await passReset(body);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Password reset successfully! Please, check your mail',
  });
};

const logOutCtrl = async (req, res) => {
  const { id } = req.user;

  await logOut(id);

  res.status(204).json({ message: 'You are log out successfully!' });
};

const currentUserCtrl = async (req, res) => {
  const { _id: id, name, email, note } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      id,
      name,
      email,
      note,
    },
  });
};

const changePassCtrl = async (req, res) => {
  const { password } = req.body;
  const { email } = req.user;

  await changePass({ email, password });

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Password changed successfully!',
  });
};

const changeNoteCtrl = async (req, res) => {
  const { note } = req.body;
  const { id } = req.user;

  await changeNote(id, note);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Note updated successfully!',
  });
};

const changeEmailCtrl = async (req, res) => {
  const { email: newEmail } = req.body;
  const { id, email } = req.user;

  await changeEmail(id, email, newEmail);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Email updated successfully!',
  });
};

const countNotificationsCtrl = async (req, res) => {
  const { id, notifi } = req.user;

  const { notifi: updatedNotifi } = await countNotifications(id, notifi);

  res.status(200).json({
    status: 'success',
    code: 200,
    notifi: updatedNotifi,
  });
};

const clearNotificationsCtrl = async (req, res) => {
  const { id } = req.user;

  await clearNotifications(id);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Notifications cleared!',
  });
};

export {
  signInCtrl,
  signUpCtrl,
  passResetCtrl,
  logOutCtrl,
  changePassCtrl,
  currentUserCtrl,
  changeNoteCtrl,
  changeEmailCtrl,
  countNotificationsCtrl,
  clearNotificationsCtrl,
};
