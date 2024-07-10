const http = require('http');
const url = require('url');
const routes = require('./routes');

const PORT = 8000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  routes(req, res, path, method);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});