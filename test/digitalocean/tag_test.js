'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('tag endpoints', function() {
  describe('list', function() {
    var data = {
      "tags": [
        {
          "name": "extra-awesome",
          "resources": {
            "droplets": {
              "count": 0,
              "last_tagged": null
            }
          }
        },
        {
          "name": "foo",
          "resources": {
            "droplets": {
              "count": 0,
              "last_tagged": null
            }
          }
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('returns tags', function() {
      testUtils.api.get('/v2/tags').reply(200, JSON.stringify(data));

      client.tags.list(function(err, tags, headers) {
        expect(tags).to.shallowDeepEqual(data.tags);
      });
    });

    it('returns tags at page', function() {
      testUtils.api.get('/v2/tags?page=2').reply(200, JSON.stringify(data));

      client.tags.list(2, function(err, tags, headers) {
        expect(tags).to.shallowDeepEqual(data.tags);
      });
    });

    it('returns tags at page with length', function() {
      testUtils.api.get('/v2/tags?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.tags.list(2, 1, function(err, tags, headers) {
        expect(tags).to.shallowDeepEqual(data.tags);
      });
    });
  });

  describe('create', function() {
    var data = {
      "tag": {
        "name": "foo",
        "resources": {
          "droplets": {
            "count": 0,
            "last_tagged": null
          }
        }
      }
    };

    it('creates the tag', function() {
      var attributes = {
        "name": "foo"
      };

      testUtils.api.post('/v2/tags', attributes).reply(201, data);

      client.tags.create(attributes, function(err, tag, headers) {
        expect(tag).to.shallowDeepEqual(data.tag);
      });
    });
  });

  describe('get', function() {
    var data = {
      "tag": {
        "name": "foo",
        "resources": {
          "droplets": {
            "count": 0,
            "last_tagged": null
          }
        }
      }
    };

    it('returns the tag', function() {
      testUtils.api.get('/v2/tags/foo').reply(200, JSON.stringify(data));

      client.tags.get('foo', function(err, tag, headers) {
        expect(tag).to.shallowDeepEqual(data.tag);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/tags/foo%2Fbar').reply(200, JSON.stringify(data));

      client.tags.get('foo/bar', function(err, tag, headers) {
        expect(tag).to.shallowDeepEqual(data.tag);
      });
    });
  });

  describe('update', function() {
    var data = {
      "tag": {
        "name": "awesome",
        "resources": {
          "droplets": {
            "count": 0,
            "last_tagged": null
          }
        }
      }
    };

    it('returns the tag', function() {
      var attributes = {
        "name": "awesome"
      };

      testUtils.api.put('/v2/tags/foo', attributes).reply(200, JSON.stringify(data));

      client.tags.update('foo', attributes, function(err, tag, headers) {
        expect(tag).to.shallowDeepEqual(data.tag);
      });
    });

    it('escapes the name', function() {
      var attributes = {
        "name": "awesome"
      };

      testUtils.api.put('/v2/tags/foo%2Fbar', attributes).reply(200, JSON.stringify(data));

      client.tags.update('foo/bar', attributes, function(err, tag, headers) {
        expect(tag).to.shallowDeepEqual(data.tag);
      });
    });
  });

  describe('tag', function() {
    var resources = [
      {
        "resource_id": "9569411",
        "resource_type": "droplet"
      }
    ];

    it('tags the resources', function() {
      testUtils.api.post('/v2/tags/foo/resources', { resources: resources }).reply(204, '');

      client.tags.tag('foo', resources, function(err, tag, headers) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/tags/foo%2Fbar/resources', { resources: resources }).reply(204, '');

      client.tags.tag('foo/bar', resources, function(err, tag, headers) {
        expect(err).to.be.null;
      });
    });
  });

  describe('untag', function() {
    var resources = [
      {
        "resource_id": "9569411",
        "resource_type": "droplet"
      }
    ];

    it('untags the resources', function() {
      testUtils.api.delete('/v2/tags/foo/resources', { resources: resources }).reply(204, '');

      client.tags.untag('foo', resources, function(err, tag, headers) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/tags/foo%2Fbar/resources', { resources: resources }).reply(204, '');

      client.tags.untag('foo/bar', resources, function(err, tag, headers) {
        expect(err).to.be.null;
      });
    });
  });

  describe('delete', function() {
    it('deletes the tag', function() {
      testUtils.api.delete('/v2/tags/foo').reply(204, '');

      client.tags.delete('foo', function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/tags/foo%2Fbar').reply(204, '');

      client.tags.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });
  });
});