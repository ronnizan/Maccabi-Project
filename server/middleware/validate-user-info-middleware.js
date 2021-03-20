const {
  validateUsername,
  validateEmail,
  validateAge,
} = require('../validators/user-info-validator');
const validateUserInfoMiddleware = (req, res, next) => {
  const { username, email, age } = req.body;

  //if the user passed the client side validation, I will send a vague message back to him, in the client side validation i will show explicit error message.
  const isUsernameValid = validateUsername(username);
  if (!isUsernameValid) {
    return res.status(400).json({ message: 'server error' });
  }
  const isUserEmailValid = validateEmail(email);
  if (!isUserEmailValid) {
    return res.status(400).json({ message: 'server error' });
  }
  const isUserAgeValid = validateAge(age);
  if (!isUserAgeValid) {
    return res.status(400).json({ message: 'server error' });
  }
  next();
};
module.exports = validateUserInfoMiddleware;
