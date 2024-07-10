const { v4: uuidv4 } = require('uuid');

let users = [];

function createUser(name, email) {
  const id = uuidv4();
  const newUser = { id, name, email, hobbies: [] };
  users.push(newUser);
  return newUser;
}

function getUsers() {
  return users;
}

function getUser(userId) {
  return users.find(u => u.id === userId);
}

function deleteUser(userId) {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return false;
  users.splice(userIndex, 1);
  return true;
}

function updateHobbies(userId, newHobbies) {
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  user.hobbies = [...new Set([...user.hobbies, ...newHobbies])];
  return user;
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateHobbies
};