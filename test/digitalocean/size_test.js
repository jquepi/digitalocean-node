'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('size endpoints', function() {
  describe('list', function() {
    var data = {
      "sizes": [
        {
          "slug": "512mb",
          "memory": 512,
          "vcpus": 1,
          "disk": 20,
          "transfer": 1,
          "price_monthly": 5.0,
          "price_hourly": 0.00744,
          "regions": [
            "nyc1",
            "ams1",
            "sfo1"
          ],
          "available": true
        },
        {
          "slug": "1gb",
          "memory": 1024,
          "vcpus": 2,
          "disk": 30,
          "transfer": 2,
          "price_monthly": 10.0,
          "price_hourly": 0.01488,
          "regions": [
            "nyc1",
            "ams1",
            "sfo1"
          ],
          "available": true
        }
      ],
      "meta": {
        "total": 2
      }
    };

    it('returns sizes', function() {
      testUtils.api.get('/v2/sizes').reply(200, JSON.stringify(data));

      client.sizes.list(function(err, sizes, headers) {
        expect(sizes).to.shallowDeepEqual(data.sizes);
      });
    });

    it('returns sizes at page', function() {
      testUtils.api.get('/v2/sizes?page=2').reply(200, JSON.stringify(data));

      client.sizes.list(2, function(err, sizes, headers) {
        expect(sizes).to.shallowDeepEqual(data.sizes);
      });
    });

    it('returns sizes at page with length', function() {
      testUtils.api.get('/v2/sizes?page=2&per_page=2').reply(200, JSON.stringify(data));

      client.sizes.list(2, 2, function(err, sizes, headers) {
        expect(sizes).to.shallowDeepEqual(data.sizes);
      });
    });

    it('returns sizes with a query object', function() {
      testUtils.api.get('/v2/sizes?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.sizes.list({
        page: 1,
        per_page: 2
      }, function(err, sizes, headers) {
        expect(sizes).to.shallowDeepEqual(data.sizes);
      });
    });
  });

});