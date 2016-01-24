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
        expect(account).to.be.eql(data.account);
      });
    });
  });
});