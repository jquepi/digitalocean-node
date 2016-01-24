'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('droplet endpoints', function() {
  describe('list', function() {
    var data = {
      "droplets": [
        {
          "id": 19,
          "name": "test.example.com",
          "memory": 1024,
          "vcpus": 2,
          "disk": 20,
          "region": {
            "slug": "nyc1",
            "name": "New York",
            "sizes": [
              "1024mb",
              "512mb"
            ],
            "available": true,
            "features": [
              "virtio",
              "private_networking",
              "backups",
              "ipv6"
            ]
          },
          "image": {
            "id": 119192817,
            "name": "Ubuntu 13.04",
            "distribution": "ubuntu",
            "slug": "ubuntu1304",
            "public": true,
            "regions": [
              "nyc1"
            ],
            "created_at": "2014-07-29T14:35:36Z"
          },
          "size_slug": "1024mb",
          "locked": false,
          "status": "active",
          "networks": {
            "v4": [
              {
                "ip_address": "10.0.0.19",
                "netmask": "255.255.0.0",
                "gateway": "10.0.0.1",
                "type": "private"
              },
              {
                "ip_address": "127.0.0.19",
                "netmask": "255.255.255.0",
                "gateway": "127.0.0.20",
                "type": "public"
              }
            ],
            "v6": [
              {
                "ip_address": "2001::13",
                "cidr": 124,
                "gateway": "2400:6180:0000:00D0:0000:0000:0009:7000",
                "type": "public"
              }
            ]
          },
          "kernel": {
            "id": 485432985,
            "name": "DO-recovery-static-fsck",
            "version": "3.8.0-25-generic"
          },
          "created_at": "2014-07-29T14:35:36Z",
          "features": [
            "ipv6"
          ],
          "backup_ids": [
            449676382
          ],
          "snapshot_ids": [
            449676383
          ],
          "droplet_ids": [

          ]
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('returns droplets', function() {
      testUtils.api.get('/v2/droplets').reply(200, JSON.stringify(data));

      client.droplets.list(function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });

    it('returns droplets at page', function() {
      testUtils.api.get('/v2/droplets?page=2').reply(200, JSON.stringify(data));

      client.droplets.list(2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });

    it('returns droplets at page with length', function() {
      testUtils.api.get('/v2/droplets?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.list(2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });
  });

  describe('create', function() {
    var data = {
      "droplet": {
        "id": 19,
        "name": "name",
        "memory": 1024,
        "vcpus": 2,
        "disk": 20,
        "region": {
          "slug": "nyc1",
          "name": "New York",
          "sizes": [
            "1024mb",
            "512mb"
          ],
          "available": true,
          "features": [
            "virtio",
            "private_networking",
            "backups",
            "ipv6"
          ]
        },
        "image": {
          "id": 1,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1304",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:37Z"
        },
        "size_slug": "1gb",
        "locked": false,
        "status": "new",
        "networks": {
          "v4": [
            {
              "ip_address": "10.0.0.19",
              "netmask": "255.255.0.0",
              "gateway": "10.0.0.1",
              "type": "private"
            },
            {
              "ip_address": "127.0.0.19",
              "netmask": "255.255.255.0",
              "gateway": "127.0.0.20",
              "type": "public"
            }
          ],
          "v6": [
            {
              "ip_address": "2001::13",
              "cidr": 124,
              "gateway": "2400:6180:0000:00D0:0000:0000:0009:7000",
              "type": "public"
            }
          ]
        },
        "kernel": {
          "id": 485432985,
          "name": "DO-recovery-static-fsck",
          "version": "3.8.0-25-generic"
        },
        "created_at": "2014-07-29T14:35:37Z",
        "features": [
          "ipv6"
        ],
        "backup_ids": [],
        "snapshot_ids": [],
        "action_ids": []
      }
    };

    it('creates the droplet', function() {
      var attributes = {
        name: 'name',
        region: 'nyc1',
        size: '1gb',
        image: 1
      };

      testUtils.api.post('/v2/droplets', attributes).reply(202, data);

      client.droplets.create(attributes, function(err, droplet, headers) {
        expect(droplet).to.be.eql(data.droplet);
      });
    });
  });

  describe('get', function() {
    var data = {
      "droplet": {
        "id": 19,
        "name": "test.example.com",
        "memory": 1024,
        "vcpus": 2,
        "disk": 20,
        "region": {
          "slug": "nyc1",
          "name": "New York",
          "sizes": [
            "1024mb",
            "512mb"
          ],
          "available": true,
          "features": [
            "virtio",
            "private_networking",
            "backups",
            "ipv6"
          ]
        },
        "image": {
          "id": 119192817,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1304",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:37Z"
        },
        "size_slug": "1024mb",
        "locked": false,
        "status": "active",
        "networks": {
          "v4": [
            {
              "ip_address": "10.0.0.19",
              "netmask": "255.255.0.0",
              "gateway": "10.0.0.1",
              "type": "private"
            },
            {
              "ip_address": "127.0.0.19",
              "netmask": "255.255.255.0",
              "gateway": "127.0.0.20",
              "type": "public"
            }
          ],
          "v6": [
            {
              "ip_address": "2001::13",
              "cidr": 124,
              "gateway": "2400:6180:0000:00D0:0000:0000:0009:7000",
              "type": "public"
            }
          ]
        },
        "kernel": {
          "id": 485432985,
          "name": "DO-recovery-static-fsck",
          "version": "3.8.0-25-generic"
        },
        "created_at": "2014-07-29T14:35:37Z",
        "features": [
          "ipv6"
        ],
        "backup_ids": [
          449676382
        ],
        "snapshot_ids": [
          449676383
        ],
        "action_ids": [

        ]
      }
    };

    it('returns the droplet', function() {
      testUtils.api.get('/v2/droplets/123').reply(200, JSON.stringify(data));

      client.droplets.get(123, function(err, droplet, headers) {
        expect(droplet).to.be.eql(data.droplet);
      });
    });
  });

  describe('actions', function() {
    var data = {
      "actions": [
        {
          "id": 19,
          "status": "in-progress",
          "type": "create",
          "started_at": "2014-07-29T14:35:39Z",
          "completed_at": null,
          "resource_id": 24,
          "resource_type": "droplet",
          "region_slug": "nyc1",
          "region": {
            "name": "New York",
            "slug": "nyc1",
            "available": true,
            "sizes": ["512mb"],
            "features": ["virtio", "private_networking", "backups", "ipv6", "metadata"]
          }
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('lists droplet actions', function() {
      testUtils.api.get('/v2/droplets/123/actions').reply(200, JSON.stringify(data));

      client.droplets.actions(123, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions at page', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=2').reply(200, JSON.stringify(data));

      client.droplets.actions(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions at page with length', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.actions(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions with a query object', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.droplets.actions(123, {
        page: 1,
        per_page: 2
      }, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });
  });

  describe('delete', function() {
    it('deletes the droplet', function(done) {
      testUtils.api.delete('/v2/droplets/123').reply(204, '');

      client.droplets.delete(123, function() {
        done();
      });
    });
  });
});