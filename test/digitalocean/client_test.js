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

  describe('get', function() {
    it('includes authorization header', function() {
      testUtils.apiWithHeaders({ 'Authorization': 'Bearer ' + token })
        .get('/v2/foo')
        .reply(200, '');

      client.get('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('has a GET method', function() {
      testUtils.api.get('/v2/foo').reply(200, '');

      client.get('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('handles a 500', function() {
      testUtils.api.get('/v2/foo').reply(500, '');

      client.get('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles a 400', function() {
      testUtils.api.get('/v2/foo').reply(400, '{ "message": "don\'t do that" }');

      client.get('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles bad json', function() {
      testUtils.api.get('/v2/foo').reply(200, '{ ]');

      client.get('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles an unexpected error code', function() {
      testUtils.api.get('/v2/foo').reply(201, '');

      client.get('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });
  });

  describe('post', function() {
    it('includes authorization header', function() {
      testUtils.apiWithHeaders({ 'Authorization': 'Bearer ' + token })
        .post('/v2/foo')
        .reply(200, '');

      client.post('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('has a POST method', function() {
      testUtils.api.post('/v2/foo').reply(200, '');

      client.post('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('handles a 500', function() {
      testUtils.api.post('/v2/foo').reply(500, '');

      client.post('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles a 400', function() {
      testUtils.api.post('/v2/foo').reply(400, '{ "message": "don\'t do that" }');

      client.post('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles bad json', function() {
      testUtils.api.post('/v2/foo').reply(200, '{ ]');

      client.post('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles an unexpected error code', function() {
      testUtils.api.post('/v2/foo').reply(201, '');

      client.post('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });
  });

  describe('put', function() {
    it('includes authorization header', function() {
      testUtils.apiWithHeaders({ 'Authorization': 'Bearer ' + token })
        .put('/v2/foo')
        .reply(200, '');

      client.put('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('has a PUT method', function() {
      testUtils.api.put('/v2/foo').reply(200, '');

      client.put('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('handles a 500', function() {
      testUtils.api.put('/v2/foo').reply(500, '');

      client.put('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles a 400', function() {
      testUtils.api.put('/v2/foo').reply(400, '{ "message": "don\'t do that" }');

      client.put('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles bad json', function() {
      testUtils.api.put('/v2/foo').reply(200, '{ ]');

      client.put('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles an unexpected error code', function() {
      testUtils.api.put('/v2/foo').reply(201, '');

      client.put('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });
  });

  describe('delete', function() {
    it('includes authorization header', function() {
      testUtils.apiWithHeaders({ 'Authorization': 'Bearer ' + token })
        .delete('/v2/foo')
        .reply(200, '');

      client.delete('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('has a DELETE method', function() {
      testUtils.api.delete('/v2/foo').reply(200, '');

      client.delete('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('handles a 500', function() {
      testUtils.api.delete('/v2/foo').reply(500, '');

      client.delete('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles a 400', function() {
      testUtils.api.delete('/v2/foo').reply(400, '{ "message": "don\'t do that" }');

      client.delete('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles bad json', function() {
      testUtils.api.delete('/v2/foo').reply(200, '{ ]');

      client.delete('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('handles an unexpected error code', function() {
      testUtils.api.delete('/v2/foo').reply(201, '');

      client.delete('/foo', {}, 200, [], function(err) {
        expect(err).to.not.be.null;
      });
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
