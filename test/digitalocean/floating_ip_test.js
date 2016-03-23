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

      client.floatingIps.list(function(err, floatingIp, headers) {
        expect(floatingIp).to.be.eql(data.floating_ips);
      });
    });

    it('returns floating ip at page', function() {
      testUtils.api.get('/v2/floating_ips?page=2').reply(200, JSON.stringify(data));

      client.floatingIps.list(2, function(err, floatingIp, headers) {
        expect(floatingIp).to.be.eql(data.floating_ips);
      });
    });

    it('returns floating ip at page with length', function() {
      testUtils.api.get('/v2/floating_ips?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.floatingIps.list(2, 1, function(err, floatingIp, headers) {
        expect(floatingIp).to.be.eql(data.floating_ips);
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
        expect(floatingIp).to.be.eql(data.floating_ip);
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
        expect(floatingIp).to.be.eql(data.floating_ip);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/floating_ips/foo%2Fbar').reply(200, JSON.stringify(data));

      client.floatingIps.get('foo/bar', function(err, floatingIp, headers) {
        expect(floatingIp).to.be.eql(data.floating_ip);
      });
    });
  });

  describe('delete', function() {
    it('deletes the droplet', function(done) {
      testUtils.api.delete('/v2/floating_ips/123').reply(204, '');

      client.floatingIps.delete(123, function() {
        done();
      });
    });

    it('escapes the name', function(done) {
      testUtils.api.delete('/v2/floating_ips/foo%2Fbar').reply(204, '');

      client.floatingIps.delete('foo/bar', function() {
        done();
      });
    });
  });
});