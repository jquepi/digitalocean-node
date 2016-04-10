'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('image endpoints', function() {
  describe('list', function() {
    var data = {
      "images": [
        {
          "id": 119192817,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1304",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "snapshot"
        },
        {
          "id": 449676376,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1404",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "snapshot"
        }
      ],
      "meta": {
        "total": 2
      }
    };

    it('returns images', function() {
      testUtils.api.get('/v2/images').reply(200, JSON.stringify(data));

      client.images.list(function(err, images, headers) {
        expect(images).to.shallowDeepEqual(data.images);
      });
    });

    it('returns images at page', function() {
      testUtils.api.get('/v2/images?page=2').reply(200, JSON.stringify(data));

      client.images.list(2, function(err, images, headers) {
        expect(images).to.shallowDeepEqual(data.images);
      });
    });

    it('returns images at page with length', function() {
      testUtils.api.get('/v2/images?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.images.list(2, 1, function(err, images, headers) {
        expect(images).to.shallowDeepEqual(data.images);
      });
    });
  });

  describe('get', function() {
    var data = {
      "image": {
        "id": 146,
        "name": "Ubuntu 13.04",
        "distribution": null,
        "slug": null,
        "public": false,
        "regions": [
          "region--1"
        ],
        "created_at": "2014-07-29T14:35:41Z",
        "type": "snapshot"
      }
    };

    it('returns the image', function() {
      testUtils.api.get('/v2/images/146').reply(200, JSON.stringify(data));

      client.images.get(146, function(err, image, headers) {
        expect(image).to.shallowDeepEqual(data.image);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/images/foo%2Fbar').reply(200, JSON.stringify(data));

      client.images.get('foo/bar', function(err, image, headers) {
        expect(image).to.shallowDeepEqual(data.image);
      });
    });
  });

  describe('update', function() {
    var data = {
      "image": {
        "id": 146,
        "name": "New Name",
        "distribution": null,
        "slug": null,
        "public": false,
        "regions": [
          "region--1"
        ],
        "created_at": "2014-07-29T14:35:41Z",
        "type": "snapshot"
      }
    };

    var attributes = {
      "name": "New Name"
    };

    it('returns the image', function() {
      testUtils.api.put('/v2/images/146', attributes).reply(200, JSON.stringify(data));

      client.images.update(146, attributes, function(err, image, headers) {
        expect(image).to.shallowDeepEqual(data.image);
      });
    });

    it('escapes the name', function() {
      testUtils.api.put('/v2/images/foo%2Fbar', attributes).reply(200, JSON.stringify(data));

      client.images.update('foo/bar', attributes, function(err, image, headers) {
        expect(image).to.shallowDeepEqual(data.image);
      });
    });
  });

  describe('delete', function() {
    it('deletes the image', function() {
      testUtils.api.delete('/v2/images/123').reply(204, '');

      client.images.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/images/foo%2Fbar').reply(204, '');

      client.images.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });
  });

  describe('list actions', function() {
    var data = {
      "actions": [
        {
          "id": 19,
          "status": "in-progress",
          "type": "create",
          "started_at": "2014-07-29T14:35:39Z",
          "completed_at": null,
          "resource_id": 123,
          "resource_type": "image",
          "region_slug": "nyc1",
          "region": {
            "name": "New York",
            "slug": "nyc1",
            "available": true,
            "sizes": ["512mb"],
            "features": ["virtio", "private_networking", "backups", "ipv6", "metadata"]
          }
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('lists image actions', function() {
      testUtils.api.get('/v2/images/123/actions').reply(200, JSON.stringify(data));

      client.images.listActions(123, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists image actions at page', function() {
      testUtils.api.get('/v2/images/123/actions?page=2').reply(200, JSON.stringify(data));

      client.images.listActions(123, 2, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists image actions at page with length', function() {
      testUtils.api.get('/v2/images/123/actions?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.images.listActions(123, 2, 1, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists image actions with a query object', function() {
      testUtils.api.get('/v2/images/123/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.images.listActions(123, {
        page: 1,
        per_page: 2
      }, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/images/foo%2Fbar/actions').reply(200, JSON.stringify(data));

      client.images.listActions('foo/bar', function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });
  });

  describe('get action', function() {
    var data = {
      "action": {
        "id": 456,
        "status": "in-progress",
        "type": "transfer",
        "started_at": "2014-07-29T14:35:27Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "image",
        "region_slug": "nyc1",
        "region": {
          "name": "New York",
          "slug": "nyc1",
          "available": true,
          "sizes": ["512mb"],
          "features": ["virtio", "private_networking", "backups", "ipv6", "metadata"]
        }
      }
    };

    it('returns the action', function() {
      testUtils.api.get('/v2/images/123/actions/456').reply(200, JSON.stringify(data));

      client.images.getAction(123, 456, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/images/foo%2Fbar/actions/bar%2Fbaz').reply(200, JSON.stringify(data));

      client.images.getAction('foo/bar', 'bar/baz', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });
  });

  describe('convert', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "convert",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "image",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/images/123/actions', { type: 'convert' }).reply(201, data);

      client.images.convert(123, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/images/foo%2Fbar/actions', { type: 'convert' }).reply(201, data);

      client.images.convert('foo/bar', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });
  });

  describe('transfer', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "transfer",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "image",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        region: 'nyc3'
      };

      testUtils.api.post('/v2/images/123/actions',
        { type: 'transfer', region: 'nyc3' }
      ).reply(201, data);

      client.images.transfer(123, parameters, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('creates the action with a region slug', function() {
      testUtils.api.post('/v2/images/123/actions',
        { type: 'transfer', region: 'ams3' }
      ).reply(201, data);

      client.images.transfer(123, 'ams3', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/images/foo%2Fbar/actions',
        { type: 'transfer', region: 'ams3' }
      ).reply(201, data);

      client.images.transfer('foo/bar', 'ams3', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });
  });
});