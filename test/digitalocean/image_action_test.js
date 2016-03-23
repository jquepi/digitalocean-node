'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('image action endpoints', function() {
  describe('list', function() {
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

      client.imageActions.list(123, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists image actions at page', function() {
      testUtils.api.get('/v2/images/123/actions?page=2').reply(200, JSON.stringify(data));

      client.imageActions.list(123, 2, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists image actions at page with length', function() {
      testUtils.api.get('/v2/images/123/actions?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.imageActions.list(123, 2, 1, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists image actions with a query object', function() {
      testUtils.api.get('/v2/images/123/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.imageActions.list(123, {
        page: 1,
        per_page: 2
      }, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/images/foo%2Fbar/actions').reply(200, JSON.stringify(data));

      client.imageActions.list('foo/bar', function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });
  });

  describe('get', function() {
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

      client.imageActions.get(123, 456, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/images/foo%2Fbar/actions/bar%2Fbaz').reply(200, JSON.stringify(data));

      client.imageActions.get('foo/bar', 'bar/baz', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
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

      client.imageActions.convert(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/images/foo%2Fbar/actions', { type: 'convert' }).reply(201, data);

      client.imageActions.convert('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
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

      client.imageActions.transfer(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a region slug', function() {
      testUtils.api.post('/v2/images/123/actions',
        { type: 'transfer', region: 'ams3' }
      ).reply(201, data);

      client.imageActions.transfer(123, 'ams3', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/images/foo%2Fbar/actions',
        { type: 'transfer', region: 'ams3' }
      ).reply(201, data);

      client.imageActions.transfer('foo/bar', 'ams3', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });
});