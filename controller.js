const userModel = require('./model');
const responseHelper = require('./helpers');

function createUser(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const { name, email } = JSON.parse(body);
    const newUser = userModel.createUser(name, email);
    responseHelper.created(res, {
      user: newUser,
      links: {
        self: `/api/users/${newUser.id}`,
        hobbies: `/api/users/${newUser.id}/hobbies`
      }
    });
  });
}

function getUsers(req, res) {
  const users = userModel.getUsers();
  const usersWithLinks = users.map(user => ({
    user,
    links: {
      self: `/api/users/${user.id}`,
      hobbies: `/api/users/${user.id}/hobbies`
    }
  }));
  responseHelper.ok(res, usersWithLinks, true);
}

function deleteUser(req, res, userId) {
  const result = userModel.deleteUser(userId);
  if (result) {
    responseHelper.ok(res, { success: true });
  } else {
    responseHelper.notFound(res, `User with id ${userId} doesn't exist`);
  }
}

function getHobbies(req, res, userId) {
  const user = userModel.getUser(userId);
  if (user) {
    responseHelper.ok(res, {
      hobbies: user.hobbies,
      links: {
        self: `/api/users/${userId}/hobbies`,
        user: `/api/users/${userId}`
      }
    }, true, true);
  } else {
    responseHelper.notFound(res, `User with id ${userId} doesn't exist`);
  }
}

function updateHobbies(req, res, userId) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const { hobbies } = JSON.parse(body);
    const updatedUser = userModel.updateHobbies(userId, hobbies);
    if (updatedUser) {
      responseHelper.ok(res, {
        user: updatedUser,
        links: {
          self: `/api/users/${userId}`,
          hobbies: `/api/users/${userId}/hobbies`
        }
      });
    } else {
      responseHelper.notFound(res, `User with id ${userId} doesn't exist`);
    }
  });
}

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  getHobbies,
  updateHobbies
};