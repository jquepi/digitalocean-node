'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('digitalocean client', function() {
  describe('buildRequestOptions', function() {
    it('Should include a user-agent header by default', function() {
      expect(client._buildRequestOptions({}, {}).headers).to.include.keys('User-Agent');
    });

    it('merges request options from initializer', function() {
      var client = digitalocean.client(token, { requestOptions: { headers: { 'Foo': 'Bar' } }});
      expect(client._buildRequestOptions({}, {}).headers).to.include.keys('Foo');
    });
  });

  describe('Callback support', function() {
    describe('Any given endpoint', function() {
      it('Will call a callback if successful', function(done) {
        testUtils.api.get('/v2/account').reply(200, "");

        client.account.get(function() {
          done();
        });
      });

      it('Will expose HTTP response', function() {
        var data = { 'i_am_json': true };
        testUtils.api.get('/v2/account').reply(200, JSON.stringify(data));

        client.account.get(function(err, object, headers, raw) {
          expect(raw).to.be.eql(data)
        });
      });

      it('It receives an error', function(done) {
        testUtils.api.get('/v2/account').reply(401, "Error foo");

        client.account.get(function(err) {
          if (err) done();
        });
      });
    });
  });
});
