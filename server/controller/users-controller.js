const express = require('express');
const router = express.Router();
const userLogic = require('../business-logic/user-logic');
const validateUserInfoMiddleware = require('../middleware/validate-user-info-middleware');

router.post('/register-user', validateUserInfoMiddleware, async (req, res) => {
  try {
    const { username, email, age } = req.body;

    //if there is no error, user was successfully added to the json file.
    const error = await userLogic.registerUser(username, email, age);
    if (error) {
      return res.json({ errorMessage: error });
    }

    res.json({ successMessage: 'User has been successfully registered' });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

router.get('/get-users', async (req, res) => {
  try {
    //pageNumber is used for pagination.
    const pageNumber = +req.query.page || 1;
    const sortBy = req.query.sortBy || 'creationDate';

    //check the sort field and return the users accordingly
    if (sortBy === 'creationDate') {
      const { users, error } = await userLogic.getUsersSortedByCreationDate(
        pageNumber
      );
      if (error) {
        return res.status(400).json({ users: null, error });
      }
      res.json({ users, error: null });
    }

    if (sortBy === 'username') {
      const { users, error } = await userLogic.getUsersSortedByUsername(
        pageNumber
      );
      if (error) {
        return res.status(400).json({ users: null, error });
      }
      res.json({ users, error: null });
    }

    if (sortBy === 'email') {
      const { users, error } = await userLogic.getUsersSortedByEmail(
        pageNumber
      );
      if (error) {
        return res.status(400).json({ users: null, error });
      }
      res.json({ users, error: null });
    }

    if (sortBy === 'age') {
      const { users, error } = await userLogic.getUsersSortedByAge(pageNumber);
      if (error) {
        return res.status(400).json({ users: null, error });
      }
      res.json({ users, error: null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

//get the total number of users, necessary in order to display how many pages there is in the client side.
router.get('/get-total-users', async (req, res) => {
  try {
    const { totalUsers, error } = await userLogic.getTotalNumberUsers();
    if (error) {
      return res.status(400).json({ error });
    }
    res.json({ totalNumberOfUsers: totalUsers });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

module.exports = router;
