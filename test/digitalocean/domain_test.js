'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('domain endpoints', function() {
  describe('list', function() {
    var data = {
      "domains": [
        {
          "name": "example.com",
          "ttl": 1800,
          "zone_file": "Example zone file text..."
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('returns domains', function() {
      testUtils.api.get('/v2/domains').reply(200, JSON.stringify(data));

      client.domains.list(function(err, domains, headers) {
        expect(domains).to.be.eql(data.domains);
      });
    });

    it('returns domains at page', function() {
      testUtils.api.get('/v2/domains?page=2').reply(200, JSON.stringify(data));

      client.domains.list(2, function(err, domains, headers) {
        expect(domains).to.be.eql(data.domains);
      });
    });

    it('returns domains at page with length', function() {
      testUtils.api.get('/v2/domains?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.domains.list(2, 1, function(err, domains, headers) {
        expect(domains).to.be.eql(data.domains);
      });
    });
  });

  describe('create', function() {
    var data = {
      "domain": {
        "name": "example.com",
        "ttl": 1800,
        "zone_file": null
      }
    };

    it('creates the domain', function() {
      var attributes = {
        name: 'example.com',
        ip_address: '1.1.1.1'
      };

      testUtils.api.post('/v2/domains', attributes).reply(201, data);

      client.domains.create(attributes, function(err, domain, headers) {
        expect(domain).to.be.eql(data.domain);
      });
    });
  });

  describe('get', function() {
    var data = {
      "domain": {
        "name": "example.com",
        "ttl": 1800,
        "zone_file": "Example zone file text..."
      }
    };

    it('returns the domain', function() {
      testUtils.api.get('/v2/domains/3').reply(200, JSON.stringify(data));

      client.domains.get(3, function(err, domain, headers) {
        expect(domain).to.be.eql(data.domain);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/domains/foo%2Fbar').reply(200, JSON.stringify(data));

      client.domains.get('foo/bar', function(err, domain, headers) {
        expect(domain).to.be.eql(data.domain);
      });
    });
  });

  describe('delete', function() {
    it('deletes the domain', function(done) {
      testUtils.api.delete('/v2/domains/123').reply(204, '');

      client.domains.delete(123, function() {
        done();
      });
    });

    it('escapes the name', function(done) {
      testUtils.api.delete('/v2/domains/foo%2Fbar').reply(204, '');

      client.domains.delete('foo/bar', function() {
        done();
      });
    });
  });
});