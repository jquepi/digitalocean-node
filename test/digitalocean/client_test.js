'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('digitalocean client', function() {
  describe('request options', function() {
    it('should include a user-agent header by default', function() {
      testUtils.apiWithHeaders()
        .matchHeader('User-Agent', /digitalocean-node\/.*/i)
        .get('/v2/foo')
        .reply(200, '');

      client.get('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('merges request options from initializer', function() {
      var client = digitalocean.client(token, { requestOptions: { headers: { 'User-Agent': 'FooBar' } }});

      testUtils.apiWithHeaders()
        .matchHeader('User-Agent', /FooBar/i)
        .get('/v2/foo')
        .reply(200, '');

      client.get('/foo', {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
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

    it('calls a callback if successful', function(done) {
      testUtils.api.get('/v2/foo').reply(200, "");

      client.get('/foo', {}, 200, [], function() {
        done();
      });
    });

    it('exposes HTTP response', function() {
      var data = { 'i_am_json': true };
      testUtils.api.get('/v2/foo').reply(200, JSON.stringify(data));

      client.get('/foo', {}, 200, [], function(err, object, headers, raw) {
        expect(raw).to.be.eql(data)
      });
    });

    it('returns a promisable', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.get('/v2/foo').reply(200, JSON.stringify(data));

      client.get('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resolves promise with resource', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.get('/v2/foo').reply(200, JSON.stringify(data));

      client.get('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        expect(foo).to.shallowDeepEqual(data.i_am_json);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resolves promise with special properties', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.get('/v2/foo').reply(200, JSON.stringify(data), {
        'X-My-Headers': 'My Header value'
      });

      client.get('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        expect(foo._digitalOcean.body).to.shallowDeepEqual(data);
        expect(foo._digitalOcean.statusCode).to.eq(200);
        expect(foo._digitalOcean.headers).to.include({ 'x-my-headers': 'My Header value' });
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('transforms keys of camel cased parameters', function() {
      testUtils.api.get('/v2/foo?foo_bar=baz&foo_baz=fooBar').reply(200, '');

      var queryParams = { fooBar: 'baz', foo_baz: 'fooBar' };
      client.get('/foo', {}, queryParams, 200, [], function(err) {
        expect(err).to.be.null;
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

    it('calls a callback if successful', function(done) {
      testUtils.api.post('/v2/foo').reply(200, "");

      client.post('/foo', {}, 200, [], function() {
        done();
      });
    });

    it('exposes HTTP response', function() {
      var data = { 'i_am_json': true };
      testUtils.api.post('/v2/foo').reply(200, JSON.stringify(data));

      client.post('/foo', {}, 200, [], function(err, object, headers, raw) {
        expect(raw).to.be.eql(data)
      });
    });

    it('returns a promisable', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.post('/v2/foo').reply(200, JSON.stringify(data));

      client.post('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resolves promise with resource', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.post('/v2/foo').reply(200, JSON.stringify(data));

      client.post('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        expect(foo).to.shallowDeepEqual(data.i_am_json);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resolves promise with special properties', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.post('/v2/foo').reply(200, JSON.stringify(data), {
        'X-My-Headers': 'My Header value'
      });

      client.post('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        expect(foo._digitalOcean.body).to.shallowDeepEqual(data);
        expect(foo._digitalOcean.statusCode).to.eq(200);
        expect(foo._digitalOcean.headers).to.include({ 'x-my-headers': 'My Header value' });
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('transforms keys of camel cased parameters', function() {
      testUtils.api.post('/v2/foo?foo_bar=baz&foo_baz=fooBar').reply(200, '');

      var queryParams = { fooBar: 'baz', foo_baz: 'fooBar' };
      client.post('/foo', {}, { query: queryParams }, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('transforms keys of content', function() {
      testUtils.api.post('/v2/foo', { foo_bar: 'baz', foo_baz: 'fooBar' }).reply(200, '');

      var body = { fooBar: 'baz', foo_baz: 'fooBar' };
      client.post('/foo', body, {}, 200, [], function(err) {
        expect(err).to.be.null;
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

    it('calls a callback if successful', function(done) {
      testUtils.api.put('/v2/foo').reply(200, "");

      client.put('/foo', {}, 200, [], function() {
        done();
      });
    });

    it('exposes HTTP response', function() {
      var data = { 'i_am_json': true };
      testUtils.api.put('/v2/foo').reply(200, JSON.stringify(data));

      client.put('/foo', {}, 200, [], function(err, object, headers, raw) {
        expect(raw).to.be.eql(data)
      });
    });

    it('returns a promisable', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.put('/v2/foo').reply(200, JSON.stringify(data));

      client.put('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resolves promise with resource', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.put('/v2/foo').reply(200, JSON.stringify(data));

      client.put('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        expect(foo).to.shallowDeepEqual(data.i_am_json);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resolves promise with special properties', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.put('/v2/foo').reply(200, JSON.stringify(data), {
        'X-My-Headers': 'My Header value'
      });

      client.put('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        expect(foo._digitalOcean.body).to.shallowDeepEqual(data);
        expect(foo._digitalOcean.statusCode).to.eq(200);
        expect(foo._digitalOcean.headers).to.include({ 'x-my-headers': 'My Header value' });
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('transforms keys of camel cased parameters', function() {
      testUtils.api.put('/v2/foo?foo_bar=baz&foo_baz=fooBar').reply(200, '');

      var queryParams = { fooBar: 'baz', foo_baz: 'fooBar' };
      client.put('/foo', {}, { query: queryParams }, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('transforms keys of content', function() {
      testUtils.api.put('/v2/foo', { foo_bar: 'baz', foo_baz: 'fooBar' }).reply(200, '');

      var body = { fooBar: 'baz', foo_baz: 'fooBar' };
      client.put('/foo', body, {}, 200, [], function(err) {
        expect(err).to.be.null;
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

    it('calls a callback if successful', function(done) {
      testUtils.api.delete('/v2/foo').reply(200, "");

      client.delete('/foo', {}, 200, [], function() {
        done();
      });
    });

    it('exposes HTTP response', function() {
      var data = { 'i_am_json': true };
      testUtils.api.delete('/v2/foo').reply(200, JSON.stringify(data));

      client.delete('/foo', {}, 200, [], function(err, object, headers, raw) {
        expect(raw).to.be.eql(data)
      });
    });

    it('returns a promisable', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.delete('/v2/foo').reply(200, JSON.stringify(data));

      client.delete('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resolves promise with resource', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.delete('/v2/foo').reply(200, JSON.stringify(data));

      client.delete('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        expect(foo).to.shallowDeepEqual(data.i_am_json);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resolves promise with special properties', function(done) {
      var data = { 'i_am_json': { 'foo': true } };
      testUtils.api.delete('/v2/foo').reply(200, JSON.stringify(data), {
        'X-My-Headers': 'My Header value'
      });

      client.delete('/foo', {}, 200, 'i_am_json', null).then(function(foo) {
        expect(foo._digitalOcean.body).to.shallowDeepEqual(data);
        expect(foo._digitalOcean.statusCode).to.eq(200);
        expect(foo._digitalOcean.headers).to.include({ 'x-my-headers': 'My Header value' });
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('transforms keys of camel cased parameters', function() {
      testUtils.api.delete('/v2/foo?foo_bar=baz&foo_baz=fooBar').reply(200, '');

      var queryParams = { fooBar: 'baz', foo_baz: 'fooBar' };
      client.delete('/foo', {}, { query: queryParams }, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });

    it('transforms keys of content', function() {
      testUtils.api.delete('/v2/foo', { foo_bar: 'baz', foo_baz: 'fooBar' }).reply(200, '');

      var body = { fooBar: 'baz', foo_baz: 'fooBar' };
      client.delete('/foo', body, {}, 200, [], function(err) {
        expect(err).to.be.null;
      });
    });
  });
});
