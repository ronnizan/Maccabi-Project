function validateUsername(username) {
  if (!username || username.length < 3) {
    return false;
  }
  return true;
}
function validateEmail(email) {
  //email validation with regex;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!email || !emailRegexp.test(email)) {
    return false;
  }
  return true;
}
function validateAge(age) {
  if (!age || age > 100 || age < 0) {
    return false;
  }
  return true;
}

module.exports = {
  validateUsername,
  validateEmail,
  validateAge,
};
