# digitalocean-node

[![Build Status](https://travis-ci.org/phillbaker/digitalocean-node.svg?branch=master)](https://travis-ci.org/phillbaker/digitalocean-node)
[![Dependencies](https://david-dm.org/phillbaker/digitalocean-node.svg)](https://www.npmjs.com/package/digitalocean)
[![Downloads](https://img.shields.io/npm/dm/digitalocean.svg)](https://www.npmjs.com/package/digitalocean)

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
client.droplets.powerOff(123, callback);
client.droplets.getAction(123, 456, callback);
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

__All the callbacks for the following will take first an error argument, then a data argument, the headers, then the raw response. For example:__

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
getAllDroplets(function(allDroplets) {
  console.log(allDroplets.length);
});

function getAllDroplets(callback, page, array) {
  client.droplets.list(page, function(err, droplets, _, response) {
    if (err) {
      return console.error('Error fetching pages', err);
    }

    if (page == null) {
      page = 1;
    }
    if (array == null) {
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

// promise style

getAllDroplets().then(function(allDroplets) {

}).catch(function(err) {
  console.log(err);
});

function getAllDroplets(limit, offset, query) {
    var allTrades = [];

    function getTrades(limit, offset, query){
        return trader.getTradesAsync(limit, offset, query)
            .each(function(trade) {
                allTrades.push(trade)
                // or, doStuff(trade), etc.
            })
            .then(function(trades) {
                if (trades.length === limit) {
                    offset += limit;
                    return getTrades(limit, offset, query);
                } else {
                    return allTrades;
                }
            })
            .catch(function(e) {
                console.log(e.stack);
            })
    }

    return getTrades(limit, offset, query)
}
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

*Where you see `attributes` it is a plain JavaScript object, e.g. `{ email: 'foo@example.com' }`*

### Droplet resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.droplets
```

* `client.droplets.list([page, perPage,] callback)`
* `client.droplets.get(droplet.id, callback)`
* `client.droplets.create(attributes, callback)`
* `client.droplets.delete(droplet.id, callback)`
* `client.droplets.deleteByTagName(tag.name, callback)`
* `client.droplets.kernels([page, perPage,] droplet.id, callback)`
* `client.droplets.snapshots([page, perPage,] droplet.id, callback)`
* `client.droplets.backups([page, perPage,] droplet.id, callback)`
* `client.droplets.neighbors([page, perPage,] droplet.id, callback)`
* `client.droplets.listActions([page, perPage,] droplet.id, callback)`
* `client.droplets.getAction(droplet.id, action.id, callback)`

For the latest valid attributes, [see the official docs](https://developers.digitalocean.com/documentation/v2/#droplets).

Methods resulting in an `action`:

* `client.droplets.actionByTag(tag.name, actionType, callback)`
* `client.droplets.reboot(droplet.id, callback)`
* `client.droplets.powerCycle(droplet.id, callback)`
* `client.droplets.shutdown(droplet.id, callback)`
* `client.droplets.powerOff(droplet.id, callback)`
* `client.droplets.powerOn(droplet.id, callback)`
* `client.droplets.passwordReset(droplet.id, callback)`
* `client.droplets.enableIpv6(droplet.id, callback)`
* `client.droplets.enableBackups(droplet.id, callback)`
* `client.droplets.disableBackups(droplet.id, callback)`
* `client.droplets.enablePrivateNetworking(droplet.id, callback)`
* `client.droplets.snapshot(droplet.id, parametersOrName, callback)`
* `client.droplets.changeKernel(droplet.id, parametersOrKernelId, callback)`
* `client.droplets.rename(droplet.id, parametersOrHostname, callback)`
* `client.droplets.rebuild(droplet.id, parametersOrImage, callback)`
* `client.droplets.restore(droplet.id, parametersOrImageId, callback)`
* `client.droplets.resize(droplet.id, parametersOrSizeSlug, callback)`

### Domain resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.domains
```

* `client.domains.list([page, perPage,] callback)`
* `client.domains.create(attributes, callback)`
* `client.domains.get(domain.name, callback)`
* `client.domains.delete(domain.name, callback)`
* `client.domains.listRecords([page, perPage,] domain.name, callback)`
* `client.domains.createRecord(domain.name, attributes, callback)`
* `client.domains.getRecord(domain.name, domainRecord.id, callback)`
* `client.domains.deleteRecord(domain.name, domainRecord.id, callback)`
* `client.domains.updateRecord(domain.name, domainRecord.id,, attributes, callback)`

For the latest valid domain attributes, [see the official docs](https://developers.digitalocean.com/documentation/v2/#domains). For the latest valid domain record attributes, [see the official docs](https://developers.digitalocean.com/documentation/v2/#domain-records).


### Image resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.images
```

* `client.images.list([page, perPage,] callback)`
* `client.images.get(image.id, callback)`
* `client.images.delete(image.id, callback)`
* `client.images.update(image.id, attributes, callback)`
* `client.imageActions.list([page, perPage,] image.id, callback)`
* `client.imageActions.get([page, perPage,] image.id, action.id, callback)`

Methods resulting in an `action`:

* `client.imageActions.transfer(image.id, parametersOrRegionSlug, callback)`
* `client.imageActions.convert(image.id, callback)`


### Region resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.regions
```

* `client.regions.list(callback)`


### Size resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.sizes
```

* `client.sizes.list(callback)`


### Account resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.account
```

* `client.account.get(callback)`
* `client.account.listSshKey([page, perPage,] callback)`
* `client.account.createSshKey(attributes, callback)`
* `client.account.getSshKey(sshKey.id, callback)`
* `client.account.deleteSshKey(sshKey.id, callback)`
* `client.account.updateSshKey(sshKey.id, attributes, callback)`

For the latest ssh key valid attributes, [see the official docs](https://developers.digitalocean.com/documentation/v2/#ssh-keys).

### Floating IP resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.floatingIps
```

* `client.floatingIps.list([page, perPage,] callback)`
* `client.floatingIps.get(floatingIp.ip, callback)`
* `client.floatingIps.create(attributes, callback)`
* `client.floatingIps.delete(floatingIp.ip, callback)`
* `client.floatingIps.listActions([page, perPage,] callback)`
* `client.floatingIps.getAction(floatingIp.ip, callback)`

For the latest valid attributes, [see the official docs](https://developers.digitalocean.com/documentation/v2/#floating-ips).

Methods resulting in an `action`:

* `client.floatingIpActions.assign(floatingIp.ip, parametersOrDropletId, callback)`
* `client.floatingIpActions.unassign(floatingIp.ip, callback)`

### Tag resource

```js
var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');
client.tags
```

* `client.tags.list([page, perPage,] callback)`
* `client.tags.get(tag.name, callback)`
* `client.tags.create(attributes, callback)`
* `client.tags.update(tag.name, attributes, callback)`
* `client.tags.tag(tag.name, [{resource_id: , resource_type: }], callback)`
* `client.tags.untag(tag.name, [{resource_id: , resource_type: }], callback)`
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
