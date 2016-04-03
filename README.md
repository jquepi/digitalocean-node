# digitalocean-node [![Build Status](https://travis-ci.org/phillbaker/digitalocean-node.svg?branch=master)](https://travis-ci.org/phillbaker/digitalocean-node)

digitalocean-node is a library for nodejs to access the [DigitalOcean v2 API](https://developers.digitalocean.com/documentation/v2/).

## Installation
```
npm install digitalocean --save
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
client.dropletActions.powerOff(123, callback);
client.dropletActions.get(123, 456, callback);
```

See below for [all resources and actions](#all-resources-and-actions)

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
client.droplets.list(callback); // Callback receives an array of first 25 issues

// Using pagination parameters
client.droplets.list(2, 100, callback); // Callback receives an array of second 100 issues
client.droplets.list(10, callback); // Callback receives an array of 25 issues from page 10

// Pagination parameters can be set with query object too
client.droplets.list({
  page: 2,
  per_page: 100
}, callback); //array of second 100 issues which are closed
```

To fetch all the pages of a resource, the pages must be traversed. For example, to fetch all Droplets:
```js
listPagesUntilDone(1, function(allDroplets) {
  console.log(allDroplets.length);
});

function listPagesUntilDone(page, callback, array) {
  client.droplets.list(page, function(err, droplets, _, response) {
    if (err) {
      return console.error('Error fetching pages', err);
    }

    if (array === undefined) {
      array = [];
    }
    array = array.concat(droplets);

    // has no pages or has pages and has no last page
    var isLastPage = response['links'] && (
      !response['links']['pages'] ||
        (response['links']['pages'] && response['links']['pages']['last'] === undefined)
    );
    if (!err && isLastPage) {
      callback.call(this, array);
    } else if (!err && !isLastPage) {
      listPagesUntilDone(page + 1, callback, array);
    } else {
      // whoops, try again
      listPagesUntilDone(page, callback, array);
    }
  })
};
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

## All Resources and Actions

### Droplet resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.droplets
```

Actions supported:

* `client.droplets.list(callback)`
* `client.droplets.get(droplet.id, callback)`
* `client.droplets.create(attributes, callback)`
* `client.droplets.delete(droplet.id, callback)`
* `client.droplets.kernels(droplet.id, callback)`
* `client.droplets.snapshots(droplet.id, callback)`
* `client.droplets.backups(droplet.id, callback)`
* `client.droplets.neighbors(droplet.id, callback)`

For the latest valid attributes, (see the official docs)[https://developers.digitalocean.com/documentation/v2/#droplets].

### Droplet Action resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.dropletActions
```

Actions supported:

* `client.dropletActions.list(droplet.id, callback)`
* `client.dropletActions.get(droplet.id, action.id, callback)`
* `client.dropletActions.reboot(droplet.id, callback)`
* `client.dropletActions.powerCycle(droplet.id, callback)`
* `client.dropletActions.shutdown(droplet.id, callback)`
* `client.dropletActions.powerOff(droplet.id, callback)`
* `client.dropletActions.powerOn(droplet.id, callback)`
* `client.dropletActions.passwordReset(droplet.id, callback)`
* `client.dropletActions.enableIpv6(droplet.id, callback)`
* `client.dropletActions.enableBackups(droplet.id, callback)`
* `client.dropletActions.disableBackups(droplet.id, callback)`
* `client.dropletActions.enablePrivateNetworking(droplet.id, callback)`
* `client.dropletActions.snapshot(droplet.id, parametersOrName, callback)`
* `client.dropletActions.changeKernel(droplet.id, parametersOrKernelId, callback)`
* `client.dropletActions.rename(droplet.id, parametersOrHostname, callback)`
* `client.dropletActions.rebuild(droplet.id, parametersOrImage, callback)`
* `client.dropletActions.restore(droplet.id, parametersOrImageId, callback)`
* `client.dropletActions.resize(droplet.id, parametersOrSizeSlug, callback)`


### Domain resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.domains
```

Actions supported:

* `client.domains.list(callback)`
* `client.domains.create(attributes, callback)`
* `client.domains.get(domain.name, callback)`
* `client.domains.delete(domain.name, callback)`

For the latest valid attributes, (see the official docs)[https://developers.digitalocean.com/documentation/v2/#domains].

### Domain record resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.domainRecords
```

Actions supported:

* `client.domainRecords.list(domain.name, callback)`
* `client.domainRecords.create(domain.name, attributes, callback)`
* `client.domainRecords.get(domain.name, domainRecord.id, callback)`
* `client.domainRecords.delete(domain.name, domainRecord.id, callback)`
* `client.domainRecords.update(domain.name, domainRecord.id,, attributes, callback)`

For the latest valid attributes, (see the official docs)[https://developers.digitalocean.com/documentation/v2/#domain-records].

### Image resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.images
```

Actions supported:

* `client.images.list(callback)`
* `client.images.get(image.id, callback)`
* `client.images.delete(image.id, callback)`
* `client.images.update(image.id, attributes, callback)`


### Image Action Resource

```
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.imageActions
```

Image Actions Supported:

* `client.imageActions.list(image.id, callback)`
* `client.imageActions.get(image.id, action.id, callback)`
* `client.imageActions.transfer(image.id, parametersOrRegionSlug, callback)`
* `client.imageActions.convert(image.id, callback)`


### Region resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.regions
```

Actions supported:

* `client.regions.list(callback)`


### Size resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.sizes
```

Actions supported:

* `client.sizes.list(callback)`


### SSH key resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.sshKeys
```

For the latest valid attributes, (see the official docs)[https://developers.digitalocean.com/documentation/v2/#ssh-keys].

Actions supported:

* `client.sshKeys.list(callback)`
* `client.sshKeys.create(attributes, callback)`
* `client.sshKeys.get(sshKey.id, callback)`
* `client.sshKeys.delete(sshKey.id, callback)`
* `client.sshKeys.update(sshKey.id, attributes, callback)`

### Account resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.account
```

Actions supported:

* `client.account.get(callback)`


### Floating IP resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.floatingIps
```

Actions supported:

* `client.floatingIps.list(callback)`
* `client.floatingIps.get(floatingIp.ip, callback)`
* `client.floatingIps.create(attributes, callback)`
* `client.floatingIps.delete(floatingIp.ip, callback)`

For the latest valid attributes, (see the official docs)[https://developers.digitalocean.com/documentation/v2/#floating-ips].

### Floating IP Action resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.floatingIpActions
```

Actions supported:

* `client.floatingIpActions.assign(floatingIp.ip, parametersOrDropletId, callback)`
* `client.floatingIpActions.unassign(floatingIp.ip, callback)`

### Tag resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.tags
```

Actions supported:

* `client.tags.list(callback)`
* `client.tags.get(tag.name, callback)`
* `client.tags.create(attributes, callback)`
* `client.tags.update(tag.name, attributes, callback)`
* `client.tags.delete(tag.name, callback)`

For the latest valid attributes, [see the official docs](https://developers.digitalocean.com/documentation/v2/#tags).

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

## Releasing

Run:

```sh
npm run release:patch # or release:minor or release:major depending on the type of version bump
```

## License

MIT

## Inspiration

Based on the work of @pksunkara in [octonode](https://github.com/pksunkara/octonode).
