function sendResponse(res, statusCode, data, error = null, publicCache = false, privateCache = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (publicCache) {
      headers['Cache-Control'] = 'public, max-age=3600';
    } else if (privateCache) {
      headers['Cache-Control'] = 'private, max-age=3600';
    }
    res.writeHead(statusCode, headers);
    res.end(JSON.stringify({ data, error }));
  }
  
  function ok(res, data, publicCache = false, privateCache = false) {
    sendResponse(res, 200, data, null, publicCache, privateCache);
  }
  
  function created(res, data) {
    sendResponse(res, 201, data);
  }
  
  function notFound(res, message) {
    sendResponse(res, 404, null, message);
  }
  
  module.exports = {
    ok,
    created,
    notFound
  };