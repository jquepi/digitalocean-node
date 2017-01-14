'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('snapshot endpoints', function() {
  describe('list', function() {
    var data = {
      "snapshots": [
        {
          "id": "119192817",
          "name": "Ubuntu 13.04",
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "snapshot"
        },
        {
          "id": "449676376",
          "name": "Ubuntu 13.04",
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

    it('returns snapshots', function() {
      testUtils.api.get('/v2/snapshots').reply(200, JSON.stringify(data));

      client.snapshots.list(function(err, snapshots, headers) {
        expect(snapshots).to.shallowDeepEqual(data.snapshots);
      });
    });

    it('returns snapshots at page', function() {
      testUtils.api.get('/v2/snapshots?page=2').reply(200, JSON.stringify(data));

      client.snapshots.list(2, function(err, snapshots, headers) {
        expect(snapshots).to.shallowDeepEqual(data.snapshots);
      });
    });

    it('returns snapshots at page with length', function() {
      testUtils.api.get('/v2/snapshots?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.snapshots.list(2, 1, function(err, snapshots, headers) {
        expect(snapshots).to.shallowDeepEqual(data.snapshots);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/snapshots').reply(200, JSON.stringify(data));

      client.snapshots.list().then(function(snapshots) {
        expect(snapshots).to.shallowDeepEqual(data.snapshots);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('returns a promisable with a query object', function(done) {
      testUtils.api.get('/v2/snapshots?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.snapshots.list({ page: 2, per_page: 1 }).then(function(snapshots) {
        expect(snapshots).to.shallowDeepEqual(data.snapshots);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('get', function() {
    var data = {
      "snapshot": {
        "id": "146",
        "name": "Ubuntu 13.04",
        "regions": [
          "region--1"
        ],
        "created_at": "2014-07-29T14:35:41Z",
        "type": "snapshot"
      }
    };

    it('returns the snapshot', function() {
      testUtils.api.get('/v2/snapshots/146').reply(200, JSON.stringify(data));

      client.snapshots.get(146, function(err, snapshot, headers) {
        expect(snapshot).to.shallowDeepEqual(data.snapshot);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/snapshots/foo%2Fbar').reply(200, JSON.stringify(data));

      client.snapshots.get('foo/bar', function(err, snapshot, headers) {
        expect(snapshot).to.shallowDeepEqual(data.snapshot);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/snapshots/146').reply(200, JSON.stringify(data));

      client.snapshots.get(146).then(function(snapshot) {
        expect(snapshot).to.shallowDeepEqual(data.snapshot);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('delete', function() {
    it('deletes the snapshot', function() {
      testUtils.api.delete('/v2/snapshots/123').reply(204, '');

      client.snapshots.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/snapshots/foo%2Fbar').reply(204, '');

      client.snapshots.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.delete('/v2/snapshots/123').reply(204, '');

      client.snapshots.delete(123).then(function(snapshot) {
        expect(snapshot.id).to.be.undefined;
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});