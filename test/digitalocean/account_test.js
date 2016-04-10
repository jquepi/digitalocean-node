'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('account endpoints', function() {
  describe('get', function() {
    it('returns data', function() {
      var data = {
        "account": {
          "droplet_limit": 25,
          "floating_ip_limit": 25,
          "email": "sammy@digitalocean.com",
          "uuid": "b6fr89dbf6d9156cace5f3c78dc9851d957381ef",
          "email_verified": true
        }
      };
      testUtils.api.get('/v2/account').reply(200, JSON.stringify(data));

      client.account.get(function(err, account, headers) {
        expect(account).to.shallowDeepEqual(data.account);
      });
    });
  });

  describe('list ssh keys', function() {
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

      client.account.listSshKeys(function(err, sshKeys, headers) {
        expect(sshKeys).to.shallowDeepEqual(data.ssh_keys);
      });
    });

    it('returns ssh keys at page', function() {
      testUtils.api.get('/v2/account/keys?page=2').reply(200, JSON.stringify(data));

      client.account.listSshKeys(2, function(err, sshKeys, headers) {
        expect(sshKeys).to.shallowDeepEqual(data.ssh_keys);
      });
    });

    it('returns ssh keys at page with length', function() {
      testUtils.api.get('/v2/account/keys?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.account.listSshKeys(2, 1, function(err, sshKeys, headers) {
        expect(sshKeys).to.shallowDeepEqual(data.ssh_keys);
      });
    });
  });

  describe('create ssh key', function() {
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

      client.account.createSshKey(attributes, function(err, sshKey, headers) {
        expect(sshKey).to.shallowDeepEqual(data.ssh_key);
      });
    });
  });

  describe('get ssh key', function() {
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

      client.account.getSshKey(3, function(err, sshKey, headers) {
        expect(sshKey).to.shallowDeepEqual(data.ssh_key);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/account/keys/foo%2Fbar').reply(200, JSON.stringify(data));

      client.account.getSshKey('foo/bar', function(err, sshKey, headers) {
        expect(sshKey).to.shallowDeepEqual(data.ssh_key);
      });
    });
  });

  describe('update ssh key', function() {
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

      client.account.updateSshKey(3, attributes, function(err, sshKey, headers) {
        expect(sshKey).to.shallowDeepEqual(data.ssh_key);
      });
    });

    it('escapes the name', function() {
      testUtils.api.put('/v2/account/keys/foo%2Fbar', attributes).reply(200, JSON.stringify(data));

      client.account.updateSshKey('foo/bar', attributes, function(err, sshKey, headers) {
        expect(sshKey).to.shallowDeepEqual(data.ssh_key);
      });
    });
  });

  describe('delete ssh key', function() {
    it('deletes the ssh key', function() {
      testUtils.api.delete('/v2/account/keys/123').reply(204, '');

      client.account.deleteSshKey(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/account/keys/foo%2Fbar').reply(204, '');

      client.account.deleteSshKey('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });
  });
});