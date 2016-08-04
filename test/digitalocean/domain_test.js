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
        expect(domains).to.shallowDeepEqual(data.domains);
      });
    });

    it('returns domains at page', function() {
      testUtils.api.get('/v2/domains?page=2').reply(200, JSON.stringify(data));

      client.domains.list(2, function(err, domains, headers) {
        expect(domains).to.shallowDeepEqual(data.domains);
      });
    });

    it('returns domains at page with length', function() {
      testUtils.api.get('/v2/domains?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.domains.list(2, 1, function(err, domains, headers) {
        expect(domains).to.shallowDeepEqual(data.domains);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/domains').reply(200, JSON.stringify(data));

      client.domains.list().then(function(domains) {
        expect(domains).to.shallowDeepEqual(data.domains);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('returns a promisable with a query object', function(done) {
      testUtils.api.get('/v2/domains?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.domains.list({ page: 2, per_page: 1 }).then(function(domains) {
        expect(domains).to.shallowDeepEqual(data.domains);
        done();
      }).catch(function(err) {
        done(err);
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
    var attributes = {
      name: 'example.com',
      ip_address: '1.1.1.1'
    };

    it('creates the domain', function() {
      testUtils.api.post('/v2/domains', attributes).reply(201, data);

      client.domains.create(attributes, function(err, domain, headers) {
        expect(domain).to.shallowDeepEqual(data.domain);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.post('/v2/domains', attributes).reply(201, data);

      client.domains.create(attributes).then(function(domain) {
        expect(domain).to.shallowDeepEqual(data.domain);
        done();
      }).catch(function(err) {
        done(err);
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
        expect(domain).to.shallowDeepEqual(data.domain);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/domains/foo%2Fbar').reply(200, JSON.stringify(data));

      client.domains.get('foo/bar', function(err, domain, headers) {
        expect(domain).to.shallowDeepEqual(data.domain);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/domains/3').reply(200, JSON.stringify(data));

      client.domains.get(3).then(function(domain) {
        expect(domain).to.shallowDeepEqual(data.domain);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('delete', function() {
    it('deletes the domain', function() {
      testUtils.api.delete('/v2/domains/123').reply(204, '');

      client.domains.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/domains/foo%2Fbar').reply(204, '');

      client.domains.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.delete('/v2/domains/123').reply(204, '');

      client.domains.delete(123).then(function(domain) {
        expect(domain.name).to.be.undefined;
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('list domain records', function() {
    var data = {
      "domain_records": [
        {
          "id": 3352892,
          "type": "NS",
          "name": "@",
          "data": "ns1.digitalocean.com",
          "priority": null,
          "port": null,
          "weight": null
        }
      ],
      "links": {
      },
      "meta": {
        "total": 1
      }
    };

    it('returns domain records', function() {
      testUtils.api.get('/v2/domains/example.com/records').reply(200, JSON.stringify(data));

      client.domains.listRecords('example.com', function(err, domainRecords, headers) {
        expect(domainRecords).to.shallowDeepEqual(data.domain_records);
      });
    });

    it('returns domain records at page', function() {
      testUtils.api.get('/v2/domains/example.com/records?page=2').reply(200, JSON.stringify(data));

      client.domains.listRecords('example.com', 2, function(err, domainRecords, headers) {
        expect(domainRecords).to.shallowDeepEqual(data.domain_records);
      });
    });

    it('returns domain records at page with length', function() {
      testUtils.api.get('/v2/domains/example.com/records?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.domains.listRecords('example.com', 2, 1, function(err, domainRecords, headers) {
        expect(domainRecords).to.shallowDeepEqual(data.domain_records);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/domains/foo%2Fbar.com/records').reply(200, JSON.stringify(data));

      client.domains.listRecords('foo/bar.com', function(err, domainRecords, headers) {
        expect(domainRecords).to.shallowDeepEqual(data.domain_records);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/domains/example.com/records').reply(200, JSON.stringify(data));

      client.domains.listRecords('example.com').then(function(domainRecords) {
        expect(domainRecords).to.shallowDeepEqual(data.domain_records);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('returns a promisable with a query object', function(done) {
      testUtils.api.get('/v2/domains/example.com/records?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.domains.listRecords('example.com', { page: 2, per_page: 1 }).then(function(domainRecords) {
        expect(domainRecords).to.shallowDeepEqual(data.domain_records);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('create domain record', function() {
    var data = {
      "domain_record": {
        "id": 123,
        "type": "A",
        "name": "www",
        "data": "162.10.66.0",
        "priority": null,
        "port": null,
        "weight": null
      }
    };
    var attributes = {
      "type": "A",
      "name": "www",
      "data": "162.10.66.0"
    };

    it('creates the domain record', function() {
      testUtils.api.post('/v2/domains/example.com/records', attributes).reply(201, data);

      client.domains.createRecord('example.com', attributes, function(err, domainRecord, headers) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/domains/foo%2Fbar.com/records', attributes).reply(201, data);

      client.domains.createRecord('foo/bar.com', attributes, function(err, domainRecord, headers) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.post('/v2/domains/example.com/records', attributes).reply(201, data);

      client.domains.createRecord('example.com', attributes).then(function(domainRecord) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('get domain record', function() {
    var data = {
      "domain_record": {
        "id": 123,
        "type": "A",
        "name": "www",
        "data": "162.10.66.0",
        "priority": null,
        "port": null,
        "weight": null
      }
    };

    it('returns the domain record', function() {
      testUtils.api.get('/v2/domains/example.com/records/123').reply(200, JSON.stringify(data));

      client.domains.getRecord('example.com', 123, function(err, domainRecord, headers) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/domains/foo%2Fbar.com/records/123').reply(200, JSON.stringify(data));

      client.domains.getRecord('foo/bar.com', 123, function(err, domainRecord, headers) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/domains/example.com/records/123').reply(200, JSON.stringify(data));

      client.domains.getRecord('example.com', 123).then(function(domainRecord) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('update domain record', function() {
    var data = {
      "domain_record": {
        "id": 123,
        "type": "A",
        "name": "blog",
        "data": "162.10.66.0",
        "priority": null,
        "port": null,
        "weight": null
      }
    };

    var attributes = {
      "name": "blog",
    };

    it('returns the domain record', function() {
      testUtils.api.put('/v2/domains/example.com/records/123', attributes).reply(200, JSON.stringify(data));

      client.domains.updateRecord('example.com', 123, attributes, function(err, domainRecord, headers) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
      });
    });

    it('escapes the name', function() {
      testUtils.api.put('/v2/domains/foo%2Fbar.com/records/foo%2Fbar', attributes).reply(200, JSON.stringify(data));

      client.domains.updateRecord('foo/bar.com', 'foo/bar', attributes, function(err, domainRecord, headers) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.put('/v2/domains/example.com/records/123', attributes).reply(200, JSON.stringify(data));

      client.domains.updateRecord('example.com', 123, attributes).then(function(domainRecord) {
        expect(domainRecord).to.shallowDeepEqual(data.domain_record);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('delete domain record', function() {
    it('deletes the domain record', function() {
      testUtils.api.delete('/v2/domains/example.com/records/123').reply(204, '');

      client.domains.deleteRecord('example.com', 123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/domains/foo%2Fbar.com/records/foo%2Fbar').reply(204, '');

      client.domains.deleteRecord('foo/bar.com', 'foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.delete('/v2/domains/example.com/records/123').reply(204, '');

      client.domains.deleteRecord('example.com', 123).then(function(domainRecord) {
        expect(domainRecord.id).to.be.undefined;
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});