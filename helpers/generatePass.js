import { customAlphabet } from 'nanoid';

const generatePass = () => {
  const passExp = '0123456789aBcDeFgHjKlMnOpQrStUvWxYz';
  const password = customAlphabet(passExp, 10);
  return password();
};

export { generatePass };
