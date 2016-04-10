'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('action endpoints', function() {
  describe('list', function() {
    var data = {
      "actions": [
        {
          "id": 2,
          "status": "done",
        },
        {
          "id": 3,
          "status": "in-progress",
        },
      ]
    };

    it('returns actions', function() {
      testUtils.api.get('/v2/actions').reply(200, JSON.stringify(data));

      client.actions.list(function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('returns actions at page', function() {
      testUtils.api.get('/v2/actions?page=2').reply(200, JSON.stringify(data));

      client.actions.list(2, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('returns actions at page with length', function() {
      testUtils.api.get('/v2/actions?page=2&per_page=2').reply(200, JSON.stringify(data));

      client.actions.list(2, 2, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('returns actions with a query object', function() {
      testUtils.api.get('/v2/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.actions.list({
        page: 1,
        per_page: 2
      }, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });
  });

  describe('get', function() {
    var data = {
      "action": {
        "id": 2,
        "status": "in-progress",
        "type": "test",
        "started_at": "2014-07-29T14:35:27Z",
        "completed_at": null,
        "resource_id": null,
        "resource_type": "backend",
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
      testUtils.api.get('/v2/action/123').reply(200, JSON.stringify(data));

      client.actions.get(123, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/action/foo%2Fbar').reply(200, JSON.stringify(data));

      client.actions.get('foo/bar', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });
  });
});