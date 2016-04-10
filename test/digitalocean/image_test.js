'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('image endpoints', function() {
  describe('list', function() {
    var data = {
      "images": [
        {
          "id": 119192817,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1304",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "snapshot"
        },
        {
          "id": 449676376,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1404",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "snapshot"
        }
      ],
      "meta": {
        "total": 2
      }
    };

    it('returns images', function() {
      testUtils.api.get('/v2/images').reply(200, JSON.stringify(data));

      client.images.list(function(err, images, headers) {
        expect(images).to.be.eql(data.images);
      });
    });

    it('returns images at page', function() {
      testUtils.api.get('/v2/images?page=2').reply(200, JSON.stringify(data));

      client.images.list(2, function(err, images, headers) {
        expect(images).to.be.eql(data.images);
      });
    });

    it('returns images at page with length', function() {
      testUtils.api.get('/v2/images?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.images.list(2, 1, function(err, images, headers) {
        expect(images).to.be.eql(data.images);
      });
    });
  });

  describe('get', function() {
    var data = {
      "image": {
        "id": 146,
        "name": "Ubuntu 13.04",
        "distribution": null,
        "slug": null,
        "public": false,
        "regions": [
          "region--1"
        ],
        "created_at": "2014-07-29T14:35:41Z",
        "type": "snapshot"
      }
    };

    it('returns the image', function() {
      testUtils.api.get('/v2/images/146').reply(200, JSON.stringify(data));

      client.images.get(146, function(err, image, headers) {
        expect(image).to.be.eql(data.image);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/images/foo%2Fbar').reply(200, JSON.stringify(data));

      client.images.get('foo/bar', function(err, image, headers) {
        expect(image).to.be.eql(data.image);
      });
    });
  });

  describe('update', function() {
    var data = {
      "image": {
        "id": 146,
        "name": "New Name",
        "distribution": null,
        "slug": null,
        "public": false,
        "regions": [
          "region--1"
        ],
        "created_at": "2014-07-29T14:35:41Z",
        "type": "snapshot"
      }
    };

    var attributes = {
      "name": "New Name"
    };

    it('returns the image', function() {
      testUtils.api.put('/v2/images/146', attributes).reply(200, JSON.stringify(data));

      client.images.update(146, attributes, function(err, image, headers) {
        expect(image).to.be.eql(data.image);
      });
    });

    it('escapes the name', function() {
      testUtils.api.put('/v2/images/foo%2Fbar', attributes).reply(200, JSON.stringify(data));

      client.images.update('foo/bar', attributes, function(err, image, headers) {
        expect(image).to.be.eql(data.image);
      });
    });
  });

  describe('delete', function() {
    it('deletes the image', function() {
      testUtils.api.delete('/v2/images/123').reply(204, '');

      client.images.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/images/foo%2Fbar').reply(204, '');

      client.images.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });
  });
});