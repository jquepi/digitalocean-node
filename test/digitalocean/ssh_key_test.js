'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('ssh key endpoints', function() {
  describe('list', function() {
    var data = {
      "ssh_keys": [
        {
          "id": 1,
          "fingerprint": "f5:d1:78:ed:28:72:5f:e1:ac:94:fd:1f:e0:a3:48:6d",
          "public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAQQDGk5V68BJ4P3Ereh779Vi/Ft2qs/rbXrcjKLGo6zsyeyFUE0svJUpRDEJvFSf8RlezKx1/1ulJu9+kZsxRiUKn example",
          "name": "Example Key"
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('returns ssh keys', function() {
      testUtils.api.get('/v2/account/keys').reply(200, JSON.stringify(data));

      client.sshKeys.list(function(err, sshKeys, headers) {
        expect(sshKeys).to.be.eql(data.ssh_keys);
      });
    });

    it('returns ssh keys at page', function() {
      testUtils.api.get('/v2/account/keys?page=2').reply(200, JSON.stringify(data));

      client.sshKeys.list(2, function(err, sshKeys, headers) {
        expect(sshKeys).to.be.eql(data.ssh_keys);
      });
    });

    it('returns ssh keys at page with length', function() {
      testUtils.api.get('/v2/account/keys?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.sshKeys.list(2, 1, function(err, sshKeys, headers) {
        expect(sshKeys).to.be.eql(data.ssh_keys);
      });
    });
  });

  describe('create', function() {
    var data = {
      "ssh_key": {
        "id": 3,
        "fingerprint": "32:af:23:06:21:fb:e6:5b:d3:cc:7f:b7:00:0f:79:aa",
        "public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAQQDZEgsAbWmQF+f8TU3F4fCg4yjVzdKudQbbhGb+qRKP5ju4Yo0Zzneia+oFm4bfzG+ydxUlOlbzq+Tpoj+INFv5 example",
        "name": "Example Key"
      }
    };

    it('creates the ssh key', function() {
      var attributes = {
        "public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAQQDZEgsAbWmQF+f8TU3F4fCg4yjVzdKudQbbhGb+qRKP5ju4Yo0Zzneia+oFm4bfzG+ydxUlOlbzq+Tpoj+INFv5 example",
        "name": "Example Key"
      };

      testUtils.api.post('/v2/account/keys', attributes).reply(201, data);

      client.sshKeys.create(attributes, function(err, sshKey, headers) {
        expect(sshKey).to.be.eql(data.ssh_key);
      });
    });
  });

  describe('get', function() {
    var data = {
      "ssh_key": {
        "id": 3,
        "fingerprint": "32:af:23:06:21:fb:e6:5b:d3:cc:7f:b7:00:0f:79:aa",
        "public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAQQDZEgsAbWmQF+f8TU3F4fCg4yjVzdKudQbbhGb+qRKP5ju4Yo0Zzneia+oFm4bfzG+ydxUlOlbzq+Tpoj+INFv5 example",
        "name": "Example Key"
      }
    };

    it('returns the ssh key', function() {
      testUtils.api.get('/v2/account/keys/3').reply(200, JSON.stringify(data));

      client.sshKeys.get(3, function(err, sshKey, headers) {
        expect(sshKey).to.be.eql(data.ssh_key);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/account/keys/foo%2Fbar').reply(200, JSON.stringify(data));

      client.sshKeys.get('foo/bar', function(err, sshKey, headers) {
        expect(sshKey).to.be.eql(data.ssh_key);
      });
    });
  });

  describe('update', function() {
    var data = {
      "ssh_key": {
        "id": 3,
        "fingerprint": "32:af:23:06:21:fb:e6:5b:d3:cc:7f:b7:00:0f:79:aa",
        "public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAQQDZEgsAbWmQF+f8TU3F4fCg4yjVzdKudQbbhGb+qRKP5ju4Yo0Zzneia+oFm4bfzG+ydxUlOlbzq+Tpoj+INFv5 example",
        "name": "Key Example"
      }
    };

    var attributes = {
      "name": "Key Example"
    };

    it('returns the ssh key', function() {
      testUtils.api.put('/v2/account/keys/3', attributes).reply(200, JSON.stringify(data));

      client.sshKeys.update(3, attributes, function(err, sshKey, headers) {
        expect(sshKey).to.be.eql(data.ssh_key);
      });
    });

    it('escapes the name', function() {
      testUtils.api.put('/v2/account/keys/foo%2Fbar', attributes).reply(200, JSON.stringify(data));

      client.sshKeys.update('foo/bar', attributes, function(err, sshKey, headers) {
        expect(sshKey).to.be.eql(data.ssh_key);
      });
    });
  });

  describe('delete', function() {
    it('deletes the ssh key', function() {
      testUtils.api.delete('/v2/account/keys/123').reply(204, '');

      client.sshKeys.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/account/keys/foo%2Fbar').reply(204, '');

      client.sshKeys.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });
  });
});