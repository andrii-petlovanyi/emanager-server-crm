import { passReset, signIn, signUp } from '../services/users.service.js';

const signInCtrl = async (req, res) => {
  const body = req.body;

  const { token, user } = await signIn(body);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
        notes: user.notes,
      },
    },
  });
};

const signUpCtrl = async (req, res) => {
  const body = req.body;

  const user = await signUp(body);

  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
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
  });
};

export { signInCtrl, signUpCtrl, passResetCtrl };
