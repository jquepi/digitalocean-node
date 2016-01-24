'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('droplet action endpoints', function() {
  describe('list', function() {
    var data = {
      "actions": [
        {
          "id": 19,
          "status": "in-progress",
          "type": "create",
          "started_at": "2014-07-29T14:35:39Z",
          "completed_at": null,
          "resource_id": 24,
          "resource_type": "droplet",
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

    it('lists droplet actions', function() {
      testUtils.api.get('/v2/droplets/123/actions').reply(200, JSON.stringify(data));

      client.dropletActions.list(123, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions at page', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=2').reply(200, JSON.stringify(data));

      client.dropletActions.list(123, 2, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions at page with length', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.dropletActions.list(123, 2, 1, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions with a query object', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.dropletActions.list(123, {
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
          "id": 123,
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
      testUtils.api.get('/v2/droplets/123/actions/123').reply(200, JSON.stringify(data));

      client.dropletActions.get(123, 123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('shutdown', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "shutdown",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'shutdown' }).reply(201, data);

      client.dropletActions.shutdown(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('powerOff', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "power_off",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'power_off' }).reply(201, data);

      client.dropletActions.powerOff(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('powerOn', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "power_on",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'power_on' }).reply(201, data);

      client.dropletActions.powerOn(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('powerCycle', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "power_cycle",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'power_cycle' }).reply(201, data);

      client.dropletActions.powerCycle(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('reboot', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "reboot",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'reboot' }).reply(201, data);

      client.dropletActions.reboot(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('enableBackups', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "enable_backups",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'enable_backups' }).reply(201, data);

      client.dropletActions.enableBackups(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('disableBackups', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "disable_backups",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'disable_backups' }).reply(201, data);

      client.dropletActions.disableBackups(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('passwordReset', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "password_reset",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'password_reset' }).reply(201, data);

      client.dropletActions.passwordReset(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('enableIPv6', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "enable_ipv6",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'enable_ipv6' }).reply(201, data);

      client.dropletActions.enableIPv6(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('enablePrivateNetworking', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "enable_private_networking",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'enable_private_networking' }).reply(201, data);

      client.dropletActions.enablePrivateNetworking(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('resize', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "resize",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        size: '64gb'
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'resize', size: '64gb' }
      ).reply(201, data);

      client.dropletActions.resize(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a size name', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'resize', size: '64gb' }
      ).reply(201, data);

      client.dropletActions.resize(123, '64gb', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('rename', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "rename",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        name: 'foo'
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'rename', name: 'foo' }
      ).reply(201, data);

      client.dropletActions.rename(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a name', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'rename', name: 'foo' }
      ).reply(201, data);

      client.dropletActions.rename(123, 'foo', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('snapshot', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "snapshot",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        name: 'foo'
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'snapshot', name: 'foo' }
      ).reply(201, data);

      client.dropletActions.snapshot(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a name', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'snapshot', name: 'foo' }
      ).reply(201, data);

      client.dropletActions.snapshot(123, 'foo', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('restore', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "restore",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        image: 12345
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'restore', image: 12345 }
      ).reply(201, data);

      client.dropletActions.restore(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a image', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'restore', image: 12345 }
      ).reply(201, data);

      client.dropletActions.restore(123, 12345, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('rebuild', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "rebuild",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        image: 'ubuntu-14-04-x64'
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'rebuild', image: 'ubuntu-14-04-x64' }
      ).reply(201, data);

      client.dropletActions.rebuild(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a image', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'rebuild', image: 'ubuntu-14-04-x64' }
      ).reply(201, data);

      client.dropletActions.rebuild(123, 'ubuntu-14-04-x64', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('changeKernel', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "changeKernel",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        kernel: 12345
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'change_kernel', kernel: 12345 }
      ).reply(201, data);

      client.dropletActions.changeKernel(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a kernel', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'change_kernel', kernel: 12345 }
      ).reply(201, data);

      client.dropletActions.changeKernel(123, 12345, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });
});