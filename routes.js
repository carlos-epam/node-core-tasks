const userController = require('./controller');
const responseHelper = require('./helpers');

function routes(req, res, path, method) {
  if (path === '/api/users' && method === 'POST') {
    userController.createUser(req, res);
  } else if (path === '/api/users' && method === 'GET') {
    userController.getUsers(req, res);
  } else if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'DELETE') {
    const userId = path.split('/')[3];
    userController.deleteUser(req, res, userId);
  } else if (path.match(/^\/api\/users\/([^\/]+)\/hobbies$/) && method === 'GET') {
    const userId = path.split('/')[3];
    userController.getHobbies(req, res, userId);
  } else if (path.match(/^\/api\/users\/([^\/]+)\/hobbies$/) && method === 'PATCH') {
    const userId = path.split('/')[3];
    userController.updateHobbies(req, res, userId);
  } else {
    responseHelper.notFound(res);
  }
}

module.exports = routes;