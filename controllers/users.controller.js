import {
  changeNote,
  changePass,
  logOut,
  passReset,
  signIn,
  signUp,
} from '../services/users.service.js';

const signInCtrl = async (req, res) => {
  const body = req.body;

  const { token, user } = await signIn(body);

  res.status(200).json({
    status: 'success',
    code: 200,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      notes: user.notes,
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

const getCurrentUserCtrl = async (req, res) => {
  const { _id: id, name, email, notes } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      id,
      name,
      email,
      notes,
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

export {
  signInCtrl,
  signUpCtrl,
  passResetCtrl,
  logOutCtrl,
  changePassCtrl,
  getCurrentUserCtrl,
  changeNoteCtrl,
};
