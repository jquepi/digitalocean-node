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
 * @param {object} error - An error or null if no error occurred.
 * @param {object} resource - The resource or null if error.
 * @param {object} headers - An object containing the response headers.
 * @param {string} body - The raw response body.
 */