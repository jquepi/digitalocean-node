'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('floating ip action endpoints', function() {
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

    it('lists floating ip actions', function() {
      testUtils.api.get('/v2/floating_ips/123/actions').reply(200, JSON.stringify(data));

      client.floatingIpActions.list(123, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists floating ip actions at page', function() {
      testUtils.api.get('/v2/floating_ips/123/actions?page=2').reply(200, JSON.stringify(data));

      client.floatingIpActions.list(123, 2, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists floating ip actions at page with length', function() {
      testUtils.api.get('/v2/floating_ips/123/actions?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.floatingIpActions.list(123, 2, 1, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists floating ip actions with a query object', function() {
      testUtils.api.get('/v2/floating_ips/123/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.floatingIpActions.list(123, {
        page: 1,
        per_page: 2
      }, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });
  });

  describe('get', function() {
    it('returns the action', function() {
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
      testUtils.api.get('/v2/floating_ips/123/actions/456').reply(200, JSON.stringify(data));

      client.floatingIpActions.get(123, 456, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('assign', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "assign",
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
        droplet_id: 123
      };

      testUtils.api.post('/v2/floating_ips/123/actions',
        { type: 'assign', droplet_id: 123 }
      ).reply(201, data);

      client.floatingIpActions.assign(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a droplet id', function() {
      testUtils.api.post('/v2/floating_ips/123/actions',
        { type: 'assign', droplet_id: 456 }
      ).reply(201, data);

      client.floatingIpActions.assign(123, 456, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('unassign', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "unassign",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "image",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/floating_ips/123/actions', { type: 'unassign' }).reply(201, data);

      client.floatingIpActions.unassign(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });
});