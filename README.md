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
client.droplet_actions.get(123, 456, callback);
```

#### Build a client from an access token

```js
var client = digitalocean.client('TOKEN');

client.get('/account', {}, function (err, status, body, headers) {
  console.log(body); //json object
});
```

## Client Options

The DigitalOcean client depends on [`request`](https://github.com/request/request), and [options can be passed through](https://github.com/request/request#requestoptions-callback) (e.g. a proxy or user agent).

```js
var client = digitalocean.client('TOKEN', {
  request: myInitializedRequestObject,
  requestOptions: {
    proxy: 'https://myproxy.com:1085',
    headers: {
      'User-Agent': 'foo'
    }
  }
});
```

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

## Contributing

1. Fork it ( https://github.com/phillbaker/digitalocean-node/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Testing

```
npm test
```

## Usage in the Browser

This library is also available as a single file built for usage in the browser at `dist/digitalocean.js`. It uses [browserify](http://browserify.org/) to package all dependencies and output the built file. This file is updated and released to [Bower](https://bower.io) for each release with the same version.


For example, using the built file at `dist/digitalocean.js`:
```html
<html>
  <head></head>
  <body>
    <script src="dist/digitalocean.js"></script>
    <script>
      var client = digitalocean.client('TOKEN');

      client.account.get(function(_, account) {
        console.log(account.uuid);
      });
    </script>
  </body>
</html>
```

## Releasing

Run:

```sh
npm run release:patch # or release:minor or release:major depending on the type of version bump
```

## License

MIT

## Inspiration

Based on the work of @pksunkara in [octonode](https://github.com/pksunkara/octonode).
