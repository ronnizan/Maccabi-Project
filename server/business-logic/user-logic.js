const User = require('../model/user-model');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function registerUser(username, email, age) {
  try {
    //error variable deceleration, if the variable remains falsy throughout the function the registration process was successful.
    let error;
    let user = new User(username, email, age, new Date().getTime());
    const dataFromDb = await readFile('./db/users.json');
    const usersFromDb = JSON.parse(dataFromDb);

    //check if user is already in DB
    let isUserAlreadyInDb = usersFromDb.findIndex(
      (user) => user.email === email
    );
    if (isUserAlreadyInDb !== -1) {
      //for the purposes of this test im sending a detailed error message back to the user, im aware that for security reasons, its better to send a vague message.
      error = 'User already exists';
      return error;
    }
    usersFromDb.push(user);
    let usersData = JSON.stringify(usersFromDb, null, 2);
    await writeFile('./db/users.json', usersData);
  } catch (error) {
    console.log(error);
    error = 'Server error';
    return error;
  }
}

//page and numberOfUserForOnePage are used for pagination
async function getUsersSortedByCreationDate(page, numberOfUserForOnePage = 5) {
  try {
    const dataFromDb = await readFile('./db/users.json');
    const usersFromDb = JSON.parse(dataFromDb);

    //sort users by creation date and and send back only 5 users by default (pagination)
    const sortedUsersByCreationDate = usersFromDb
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(
        (page - 1) * numberOfUserForOnePage,
        page * numberOfUserForOnePage
      );
    return { users: sortedUsersByCreationDate, error: null };
  } catch (error) {
    return { users: null, error: 'Server error' };
  }
}
async function getUsersSortedByUsername(page, numberOfUserForOnePage = 5) {
  try {
    const dataFromDb = await readFile('./db/users.json');
    const usersFromDb = JSON.parse(dataFromDb);

    //sort users by username
    const sortedUsersByUsername = usersFromDb
      .sort((a, b) => a.username.localeCompare(b.username))
      .slice(
        (page - 1) * numberOfUserForOnePage,
        page * numberOfUserForOnePage
      );
    return { users: sortedUsersByUsername, error: null };
  } catch (error) {
    return { users: null, error: 'Server error' };
  }
}
async function getUsersSortedByEmail(page, numberOfUserForOnePage = 5) {
  try {
    const dataFromDb = await readFile('./db/users.json');
    const usersFromDb = JSON.parse(dataFromDb);

    //sort users by email
    const sortedUsersByUserEmail = usersFromDb
      .sort((a, b) => a.email.localeCompare(b.email))
      .slice(
        (page - 1) * numberOfUserForOnePage,
        page * numberOfUserForOnePage
      );
    return { users: sortedUsersByUserEmail, error: null };
  } catch (error) {
    return { users: null, error: 'Server error' };
  }
}
async function getUsersSortedByAge(page, numberOfUserForOnePage = 5) {
  try {
    const dataFromDb = await readFile('./db/users.json');
    const usersFromDb = JSON.parse(dataFromDb);

    //sort users by age
    const sortedUsersByAge = usersFromDb
      .sort((a, b) => a.age - b.age)
      .slice(
        (page - 1) * numberOfUserForOnePage,
        page * numberOfUserForOnePage
      );
    return { users: sortedUsersByAge, error: null };
  } catch (error) {
    return { users: null, error: 'Server error' };
  }
}
async function getTotalNumberUsers() {
  try {
    const dataFromDb = await readFile('./db/users.json');
    const usersFromDb = JSON.parse(dataFromDb);
    return { totalUsers: usersFromDb.length, error: null };
  } catch (error) {
    return { totalUsers: null, error: 'Server error' };
  }
}

module.exports = {
  registerUser,
  getUsersSortedByCreationDate,
  getUsersSortedByUsername,
  getUsersSortedByEmail,
  getUsersSortedByAge,
  getTotalNumberUsers,
};
