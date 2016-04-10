'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('region endpoints', function() {
  describe('list', function() {
    var data = {
      "regions": [
        {
          "slug": "nyc1",
          "name": "New York",
          "sizes": [],
          "available": false,
          "features": [
            "virtio",
            "private_networking",
            "backups",
            "ipv6"
          ]
        },
        {
          "slug": "sfo1",
          "name": "San Francisco",
          "sizes": [
            "1gb",
            "512mb"
          ],
          "available": true,
          "features": [
            "virtio",
            "backups"
          ]
        },
        {
          "slug": "ams1",
          "name": "Amsterdam",
          "sizes": [
            "1gb",
            "512mb"
          ],
          "available": true,
          "features": [
            "virtio",
            "backups"
          ]
        }
      ],
      "meta": {
        "total": 3
      }
    };

    it('returns regions', function() {
      testUtils.api.get('/v2/regions').reply(200, JSON.stringify(data));

      client.regions.list(function(err, regions, headers) {
        expect(regions).to.shallowDeepEqual(data.regions);
      });
    });

    it('returns regions at page', function() {
      testUtils.api.get('/v2/regions?page=2').reply(200, JSON.stringify(data));

      client.regions.list(2, function(err, regions, headers) {
        expect(regions).to.shallowDeepEqual(data.regions);
      });
    });

    it('returns regions at page with length', function() {
      testUtils.api.get('/v2/regions?page=2&per_page=2').reply(200, JSON.stringify(data));

      client.regions.list(2, 2, function(err, regions, headers) {
        expect(regions).to.shallowDeepEqual(data.regions);
      });
    });

    it('returns regions with a query object', function() {
      testUtils.api.get('/v2/regions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.regions.list({
        page: 1,
        per_page: 2
      }, function(err, regions, headers) {
        expect(regions).to.shallowDeepEqual(data.regions);
      });
    });
  });

});