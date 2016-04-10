'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('floating ip endpoints', function() {
  describe('list', function() {
    var data = {
      "floating_ips": [
        {
          "ip": "188.166.132.3",
          "region": {
            "available": true,
            "features": [
              "private_networking",
              "backups",
              "ipv6",
              "metadata"
            ],
            "sizes": [
              "512mb",
              "1gb",
              "2gb",
              "4gb",
              "8gb",
              "16gb",
              "32gb",
              "48gb",
              "64gb"
            ],
            "slug": "ams3",
            "name": "Amsterdam 3"
          },
          "droplet": null
        },
        {
          "ip": "45.55.96.3",
          "region": {
            "available": true,
            "features": [
              "private_networking",
              "backups",
              "ipv6",
              "metadata"
            ],
            "sizes": [
              "512mb",
              "1gb",
              "2gb",
              "4gb",
              "8gb",
              "16gb",
              "32gb",
              "48gb",
              "64gb"
            ],
            "slug": "nyc3",
            "name": "New York 3"
          },
          "droplet": null
        }
      ],
      "meta": {
        "total": 3
      },
      "links": {}
    };

    it('returns floating ip', function() {
      testUtils.api.get('/v2/floating_ips').reply(200, JSON.stringify(data));

      client.floatingIps.list(function(err, floatingIps, headers) {
        expect(floatingIps).to.shallowDeepEqual(data.floating_ips);
      });
    });

    it('returns floating ip at page', function() {
      testUtils.api.get('/v2/floating_ips?page=2').reply(200, JSON.stringify(data));

      client.floatingIps.list(2, function(err, floatingIps, headers) {
        expect(floatingIps).to.shallowDeepEqual(data.floating_ips);
      });
    });

    it('returns floating ip at page with length', function() {
      testUtils.api.get('/v2/floating_ips?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.floatingIps.list(2, 1, function(err, floatingIps, headers) {
        expect(floatingIps).to.shallowDeepEqual(data.floating_ips);
      });
    });
  });

  describe('create', function() {
    var data = {
      "floating_ip": {
        "ip": "45.55.96.32",
        "region": {
          "available": true,
          "features": [
            "private_networking",
            "backups",
            "ipv6",
            "metadata"
          ],
          "sizes": [
            "512mb",
            "1gb",
            "2gb",
            "4gb",
            "8gb",
            "16gb",
            "32gb",
            "48gb",
            "64gb"
          ],
          "slug": "nyc3",
          "name": "New York 3"
        },
        "droplet": null,
        "links": {}
      }
    };

    it('creates the floating ip', function() {
      var attributes = {
        region: 'nyc1',
      };

      testUtils.api.post('/v2/floating_ips', attributes).reply(202, data);

      client.floatingIps.create(attributes, function(err, floatingIp, headers) {
        expect(floatingIp).to.shallowDeepEqual(data.floating_ip);
      });
    });
  });

  describe('get', function() {
    var data = {
      "floating_ip": {
        "ip": "45.55.96.32",
        "region": {
          "available": true,
          "features": [
            "private_networking",
            "backups",
            "ipv6",
            "metadata"
          ],
          "sizes": [
            "512mb",
            "1gb",
            "2gb",
            "4gb",
            "8gb",
            "16gb",
            "32gb",
            "48gb",
            "64gb"
          ],
          "slug": "nyc3",
          "name": "New York 3"
        },
        "droplet": null
      }
    };

    it('returns the floating ip', function() {
      testUtils.api.get('/v2/floating_ips/123').reply(200, JSON.stringify(data));

      client.floatingIps.get(123, function(err, floatingIp, headers) {
        expect(floatingIp).to.shallowDeepEqual(data.floating_ip);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/floating_ips/foo%2Fbar').reply(200, JSON.stringify(data));

      client.floatingIps.get('foo/bar', function(err, floatingIp, headers) {
        expect(floatingIp).to.shallowDeepEqual(data.floating_ip);
      });
    });
  });

  describe('delete', function() {
    it('deletes the droplet', function() {
      testUtils.api.delete('/v2/floating_ips/123').reply(204, '');

      client.floatingIps.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/floating_ips/foo%2Fbar').reply(204, '');

      client.floatingIps.delete('foo/bar', function(err) {
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

    it('lists floating ip actions', function() {
      testUtils.api.get('/v2/floating_ips/123/actions').reply(200, JSON.stringify(data));

      client.floatingIps.listActions(123, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists floating ip actions at page', function() {
      testUtils.api.get('/v2/floating_ips/123/actions?page=2').reply(200, JSON.stringify(data));

      client.floatingIps.listActions(123, 2, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists floating ip actions at page with length', function() {
      testUtils.api.get('/v2/floating_ips/123/actions?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.floatingIps.listActions(123, 2, 1, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists floating ip actions with a query object', function() {
      testUtils.api.get('/v2/floating_ips/123/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.floatingIps.listActions(123, {
        page: 1,
        per_page: 2
      }, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/floating_ips/foo%2Fbar/actions').reply(200, JSON.stringify(data));

      client.floatingIps.listActions('foo/bar', function(err, actions, headers) {
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
      testUtils.api.get('/v2/floating_ips/123/actions/456').reply(200, JSON.stringify(data));

      client.floatingIps.getAction(123, 456, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/floating_ips/foo%2Fbar/actions/bar%2Fbaz').reply(200, JSON.stringify(data));

      client.floatingIps.getAction('foo/bar', 'bar/baz', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
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

      client.floatingIps.assign(123, parameters, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('creates the action with a droplet id', function() {
      testUtils.api.post('/v2/floating_ips/123/actions',
        { type: 'assign', droplet_id: 456 }
      ).reply(201, data);

      client.floatingIps.assign(123, 456, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/floating_ips/foo%2Fbar/actions',
        { type: 'assign', droplet_id: 456 }
      ).reply(201, data);

      client.floatingIps.assign('foo/bar', 456, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
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

      client.floatingIps.unassign(123, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/floating_ips/foo%2Fbar/actions', { type: 'unassign' }).reply(201, data);

      client.floatingIps.unassign('foo/bar', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });
  });
});