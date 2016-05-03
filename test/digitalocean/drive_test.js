'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('drive endpoints', function() {
  describe('list', function() {
    var data = {
      "drives": [
        {
          "id": "506f78a4-e098-11e5-ad9f-000f53306ae1",
          "region": {
            "name": "New York 1",
            "slug": "nyc1",
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
            "features": [
              "private_networking",
              "backups",
              "ipv6",
              "metadata"
            ],
            "available": true
          },
          "droplet_ids": [],
          "name": "example",
          "description": "Block store for examples",
          "size_gigabytes": 10,
          "created_at": "2016-03-02T17:00:49Z"
        }
      ],
      "links": {
      },
      "meta": {
        "total": 1
      }
    };

    it('returns drive', function() {
      testUtils.api.get('/v2/drives').reply(200, JSON.stringify(data));

      client.drives.list(function(err, drives, headers) {
        expect(drives).to.shallowDeepEqual(data.drives);
      });
    });

    it('returns drive at page', function() {
      testUtils.api.get('/v2/drives?page=2').reply(200, JSON.stringify(data));

      client.drives.list(2, function(err, drives, headers) {
        expect(drives).to.shallowDeepEqual(data.drives);
      });
    });

    it('returns drive at page with length', function() {
      testUtils.api.get('/v2/drives?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.drives.list(2, 1, function(err, drives, headers) {
        expect(drives).to.shallowDeepEqual(data.drives);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/drives').reply(200, JSON.stringify(data));

      client.drives.list().then(function(drives) {
        expect(drives).to.shallowDeepEqual(data.drives);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('create', function() {
    var data = {
      "drive": {
        "id": "506f78a4-e098-11e5-ad9f-000f53306ae1",
        "region": {
          "name": "New York 1",
          "slug": "nyc1",
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
          "features": [
            "private_networking",
            "backups",
            "ipv6",
            "metadata"
          ],
          "available": true
        },
        "droplet_ids": [

        ],
        "name": "example",
        "description": "Block store for examples",
        "size_gigabytes": 10,
        "created_at": "2016-03-02T17:00:49Z"
      }
    };
    var attributes = {
      "size_gigabytes": 10,
      "name": "example",
      "description": "Block store for examples",
      "region": "nyc1"
    };

    it('creates the drive', function() {
      testUtils.api.post('/v2/drives', attributes).reply(202, data);

      client.drives.create(attributes, function(err, drive, headers) {
        expect(drive).to.shallowDeepEqual(data.drive);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.post('/v2/drives', attributes).reply(202, data);

      client.drives.create(attributes).then(function(drive) {
        expect(drive).to.shallowDeepEqual(data.drive);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('get', function() {
    var data = {
      "drive": {
        "id": "506f78a4-e098-11e5-ad9f-000f53306ae1",
        "region": {
          "name": "New York 1",
          "slug": "nyc1",
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
          "features": [
            "private_networking",
            "backups",
            "ipv6",
            "metadata"
          ],
          "available": true
        },
        "droplet_ids": [

        ],
        "name": "example",
        "description": "Block store for examples",
        "size_gigabytes": 10,
        "created_at": "2016-03-02T17:00:49Z"
      }
    };

    it('returns the drive', function() {
      testUtils.api.get('/v2/drives/123').reply(200, JSON.stringify(data));

      client.drives.get(123, function(err, drive, headers) {
        expect(drive).to.shallowDeepEqual(data.drive);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/drives/foo%2Fbar').reply(200, JSON.stringify(data));

      client.drives.get('foo/bar', function(err, drive, headers) {
        expect(drive).to.shallowDeepEqual(data.drive);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/drives/123').reply(200, JSON.stringify(data));

      client.drives.get(123).then(function(drive) {
        expect(drive).to.shallowDeepEqual(data.drive);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('delete', function() {
    it('deletes the droplet', function() {
      testUtils.api.delete('/v2/drives/123').reply(204, '');

      client.drives.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/drives/foo%2Fbar').reply(204, '');

      client.drives.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.delete('/v2/drives/123').reply(204, '');

      client.drives.delete(123).then(function(drive) {
        expect(drive.ip).to.be.undefined;
        done();
      }).catch(function(err) {
        done(err);
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

    it('lists drive actions', function() {
      testUtils.api.get('/v2/drives/123/actions').reply(200, JSON.stringify(data));

      client.drives.listActions(123, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists drive actions at page', function() {
      testUtils.api.get('/v2/drives/123/actions?page=2').reply(200, JSON.stringify(data));

      client.drives.listActions(123, 2, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists drive actions at page with length', function() {
      testUtils.api.get('/v2/drives/123/actions?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.drives.listActions(123, 2, 1, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('lists drive actions with a query object', function() {
      testUtils.api.get('/v2/drives/123/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.drives.listActions(123, {
        page: 1,
        per_page: 2
      }, function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/drives/foo%2Fbar/actions').reply(200, JSON.stringify(data));

      client.drives.listActions('foo/bar', function(err, actions, headers) {
        expect(actions).to.shallowDeepEqual(data.actions);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/drives/123/actions').reply(200, JSON.stringify(data));

      client.drives.listActions(123).then(function(actions) {
        expect(actions).to.shallowDeepEqual(data.actions);
        done();
      }).catch(function(err) {
        done(err);
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
      testUtils.api.get('/v2/drives/123/actions/456').reply(200, JSON.stringify(data));

      client.drives.getAction(123, 456, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/drives/foo%2Fbar/actions/bar%2Fbaz').reply(200, JSON.stringify(data));

      client.drives.getAction('foo/bar', 'bar/baz', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/drives/123/actions/456').reply(200, JSON.stringify(data));

      client.drives.getAction(123, 456).then(function(action) {
        expect(action).to.shallowDeepEqual(data.action);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('attach', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "attach_drive",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": null,
        "resource_type": "drive",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        droplet_id: 123
      };

      testUtils.api.post('/v2/drives/123/actions',
        { type: 'attach', droplet_id: 123 }
      ).reply(201, data);

      client.drives.attach(123, parameters, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('creates the action with a droplet id', function() {
      testUtils.api.post('/v2/drives/123/actions',
        { type: 'attach', droplet_id: 456 }
      ).reply(201, data);

      client.drives.attach(123, 456, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/drives/foo%2Fbar/actions',
        { type: 'attach', droplet_id: 456 }
      ).reply(201, data);

      client.drives.attach('foo/bar', 456, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.post('/v2/drives/123/actions',
        { type: 'attach', droplet_id: 456 }
      ).reply(201, data);

      client.drives.attach(123, 456).then(function(action) {
        expect(action).to.shallowDeepEqual(data.action);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('detach', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "detach_drive",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": null,
        "resource_type": "drive",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/drives/123/actions', { type: 'detach' }).reply(201, data);

      client.drives.detach(123, function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/drives/foo%2Fbar/actions', { type: 'detach' }).reply(201, data);

      client.drives.detach('foo/bar', function(err, action, headers) {
        expect(action).to.shallowDeepEqual(data.action);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.post('/v2/drives/123/actions', { type: 'detach' }).reply(201, data);

      client.drives.detach(123).then(function(action) {
        expect(action).to.shallowDeepEqual(data.action);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});