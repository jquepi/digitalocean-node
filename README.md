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

var doAccount      = client.account();
var doDroplets     = client.droplets();
var doDroplet      = client.droplet(123);
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

## Authentication

#TODO

## Rate Limiting

You can also check your rate limit status by calling the following.

```js
client.limit(function (err, left, max) {
  console.log(left); // 4999
  console.log(max);  // 5000
});
```

## API Callback Structure

__All the callbacks for the following will take first an error argument, then a data argument, like this:__

```js
doAccount.get(function(err, data, headers) {
  console.log("error: " + err);
  console.log("data: " + data);
  console.log("headers: " + headers);
});
```

## Pagination

If a function is said to be supporting pagination, then that function can be used in many ways as shown below. Results from the function are arranged in [pages](https://developers.digitalocean.com/documentation/v2/#links).

The `page` argument is optional and is used to specify which page of objects to retrieve.
The `perPage` argument is also optional and is used to specify how many objects per page.

```js
// Normal usage of function
client.droplets(callback); // Callback recevies an array of first 30 issues

// Using pagination parameters
client.droplets(2, 100, callback); // Callback recevies an array of second 100 issues
client.droplets(10, callback); // Callback recevies an array of 30 issues from page 10

// Pagination parameters can be set with query object too
client.droplets({
  page: 2,
  perPage: 100,
}, callback); //array of second 100 issues which are closed
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
