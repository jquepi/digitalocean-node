# digitalocean-node [![Build Status](https://travis-ci.org/phillbaker/digitalocean-node.svg?branch=master)](https://travis-ci.org/phillbaker/digitalocean-node)

digitalocean-node is a library for nodejs to access the [DigitalOcean v2 api](https://developers.digitalocean.com/documentation/v2/)

## Installation
```
npm install digitalocean
```

## Usage

```js
var digitalocean = require('digitalocean');

var client = digitalocean.client('TOKEN');

client.account.get(callback);
client.droplets.list(callback);
client.droplets.create(options, callback);
client.droplets.get(123, callback);
client.droplets.delete(123, callback);
client.droplet_actions.powerOff(123, callback);
```

#### Build a client from an access token

```js
var client = digitalocean.client('TOKEN');

client.get('/account', {}, function (err, status, body, headers) {
  console.log(body); //json object
});
```

## Request Options

Request options can be set by setting defaults on the client.

## API Callback Structure

__All the callbacks for the following will take first an error argument, then a data argument, then the raw response. For example:__

```js
client.account.get(function(err, account, headers, response) {
  console.log("error: " + err);
  console.log("account: " + account);
  console.log("headers: " + headers);
  console.log("response: " + response);
});
```

## Pagination

If a function is said to be supporting pagination, then that function can be used in many ways as shown below. Results from the function are arranged in [pages](https://developers.digitalocean.com/documentation/v2/#links).

The `page` argument is optional and is used to specify which page of objects to retrieve.
The `perPage` argument is also optional and is used to specify how many objects per page.

```js
// Normal usage of function
client.droplets.list(callback); // Callback receives an array of first 30 issues

// Using pagination parameters
client.droplets.list(2, 100, callback); // Callback receives an array of second 100 issues
client.droplets.list(10, callback); // Callback receives an array of 30 issues from page 10

// Pagination parameters can be set with query object too
client.droplets.list({
  page: 2,
  per_page: 100
}, callback); //array of second 100 issues which are closed
```

## Rate Limiting

You can also check your rate limit status by calling the following.

```js
client.droplets.list(function (err, account, headers, response) {
  console.log(headers['ratelimit-remaining']); // 4999
  console.log(headers['ratelimit-limit']);  // 5000
  console.log(headers['ratelimit-reset']);  // Time in Unix Epoch, e.g. 1415984218
});
```

## Contributions

TODO

## Testing

```
npm test
```

## License

MIT

## Inspiration

Based on the work of @pksunkara in [octonode](https://github.com/pksunkara/octonode).
