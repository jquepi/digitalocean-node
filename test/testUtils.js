'use strict';

// NOTE: testUtils should be require'd before anything else in each spec file!

require('mocha');

var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));

var nock = require('nock');

var utils = module.exports = {
  getUserDigitalOceanToken: function() {
    return process.env.DIGITALOCEAN_TEST_TOKEN || 'b7d03a6947b217efb6f3ec3bd3504582';
  },
  api: nock('https://api.digitalocean.com'),
  apiWithHeaders: function(headers) {
    return nock('https://api.digitalocean.com', {
      reqheaders: headers
    });
  }
};

require('mocha-jshint')({
  pretty: true
});