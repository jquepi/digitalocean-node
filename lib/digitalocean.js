module.exports = {
  client: require('./digitalocean/client'),
  account: require('./digitalocean/account'),
};

//
// Reused type documnentation
//

/**
 * Every resource method accepts an optional callback as the last argument.
 *
 * @callback requestCallback
 * @param {object} error, or null if no error occurred // TODO document the types of errors returned
 * @param {object} resource, null if error
 * @param {object} response headers
 * @param {string} raw response body
 */