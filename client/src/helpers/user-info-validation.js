export const validateUserName = (username) => {
  if (!username || username.length < 3) {
    return false;
  }
  return true;
};

export const validateEmail = (email) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!email || !emailRegexp.test(email)) {
    return false;
  }
  return true;
};

export const validateAge = (age) => {
  if (!age || age > 100 || age < 0) {
    return false;
  }
  return true;
};
