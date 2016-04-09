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
    var data_singular = {
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

    var data_multiple = {
      "droplets": [{
        "id": 19,
        "name": "name1",
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
      }]
    };

    it('creates the droplet', function() {
      var attributes = {
        name: 'name',
        region: 'nyc1',
        size: '1gb',
        image: 1
      };

      testUtils.api.post('/v2/droplets', attributes).reply(202, data_singular);

      client.droplets.create(attributes, function(err, droplet, headers) {
        expect(droplet).to.be.eql(data_singular.droplet);
      });
    });

    it('creates duplicate droplets', function() {
      var attributes = {
        names: ['name1'],
        region: 'nyc1',
        size: '1gb',
        image: 1
      };

      testUtils.api.post('/v2/droplets', attributes).reply(202, data_multiple);

      client.droplets.create(attributes, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data_multiple.droplets);
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

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar').reply(200, JSON.stringify(data));

      client.droplets.get('foo/bar', function(err, droplet, headers) {
        expect(droplet).to.be.eql(data.droplet);
      });
    });
  });

  describe('kernels', function() {
    var data = {
      "kernels": [
        {
          "id": 231,
          "name": "DO-recovery-static-fsck",
          "version": "3.8.0-25-generic"
        }
      ],
      "links": {
        "pages": {
          "last": "https://api.digitalocean.com/v2/droplets/3164494/kernels?page=124&per_page=1",
          "next": "https://api.digitalocean.com/v2/droplets/3164494/kernels?page=2&per_page=1"
        }
      },
      "meta": {
        "total": 1
      }
    };

    it('lists droplet kernels', function() {
      testUtils.api.get('/v2/droplets/123/kernels').reply(200, JSON.stringify(data));

      client.droplets.kernels(123, function(err, kernels, headers) {
        expect(kernels).to.be.eql(data.kernels);
      });
    });

    it('lists droplet kernels at page', function() {
      testUtils.api.get('/v2/droplets/123/kernels?page=2').reply(200, JSON.stringify(data));

      client.droplets.kernels(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.kernels);
      });
    });

    it('lists droplet kernels at page with length', function() {
      testUtils.api.get('/v2/droplets/123/kernels?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.kernels(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.kernels);
      });
    });

    it('lists droplet kernels with a query object', function() {
      testUtils.api.get('/v2/droplets/123/kernels?page=1&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.kernels(123, {
        page: 1,
        per_page: 1
      }, function(err, kernels, headers) {
        expect(kernels).to.be.eql(data.kernels);
      });
    });
  });

  describe('snapshots', function() {
    var data = {
      "snapshots": [
        {
          "id": 119192817,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": null,
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "snapshot"
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('lists droplet snapshots', function() {
      testUtils.api.get('/v2/droplets/123/snapshots').reply(200, JSON.stringify(data));

      client.droplets.snapshots(123, function(err, snapshots, headers) {
        expect(snapshots).to.be.eql(data.snapshots);
      });
    });

    it('lists droplet snapshots at page', function() {
      testUtils.api.get('/v2/droplets/123/snapshots?page=2').reply(200, JSON.stringify(data));

      client.droplets.snapshots(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.snapshots);
      });
    });

    it('lists droplet snapshots at page with length', function() {
      testUtils.api.get('/v2/droplets/123/snapshots?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.snapshots(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.snapshots);
      });
    });

    it('lists droplet snapshots with a query object', function() {
      testUtils.api.get('/v2/droplets/123/snapshots?page=1&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.snapshots(123, {
        page: 1,
        per_page: 1
      }, function(err, snapshots, headers) {
        expect(snapshots).to.be.eql(data.snapshots);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar/snapshots').reply(200, JSON.stringify(data));

      client.droplets.snapshots('foo/bar', function(err, snapshots, headers) {
        expect(snapshots).to.be.eql(data.snapshots);
      });
    });
  });

  describe('backups', function() {
    var data = {
      "backups": [
        {
          "id": 119192817,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": null,
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "backup"
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('lists droplet backups', function() {
      testUtils.api.get('/v2/droplets/123/backups').reply(200, JSON.stringify(data));

      client.droplets.backups(123, function(err, backups, headers) {
        expect(backups).to.be.eql(data.backups);
      });
    });

    it('lists droplet backups at page', function() {
      testUtils.api.get('/v2/droplets/123/backups?page=2').reply(200, JSON.stringify(data));

      client.droplets.backups(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.backups);
      });
    });

    it('lists droplet backups at page with length', function() {
      testUtils.api.get('/v2/droplets/123/backups?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.backups(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.backups);
      });
    });

    it('lists droplet backups with a query object', function() {
      testUtils.api.get('/v2/droplets/123/backups?page=1&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.backups(123, {
        page: 1,
        per_page: 1
      }, function(err, backups, headers) {
        expect(backups).to.be.eql(data.backups);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar/backups').reply(200, JSON.stringify(data));

      client.droplets.backups('foo/bar', function(err, backups, headers) {
        expect(backups).to.be.eql(data.backups);
      });
    });
  });

  describe('neighbors', function() {
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

    it('lists droplet neighbors', function() {
      testUtils.api.get('/v2/droplets/123/neighbors').reply(200, JSON.stringify(data));

      client.droplets.neighbors(123, function(err, neighbors, headers) {
        expect(neighbors).to.be.eql(data.droplets);
      });
    });

    it('lists droplet neighbors at page', function() {
      testUtils.api.get('/v2/droplets/123/neighbors?page=2').reply(200, JSON.stringify(data));

      client.droplets.neighbors(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });

    it('lists droplet neighbors at page with length', function() {
      testUtils.api.get('/v2/droplets/123/neighbors?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.neighbors(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });

    it('lists droplet neighbors with a query object', function() {
      testUtils.api.get('/v2/droplets/123/neighbors?page=1&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.neighbors(123, {
        page: 1,
        per_page: 1
      }, function(err, neighbors, headers) {
        expect(neighbors).to.be.eql(data.droplets);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar/neighbors').reply(200, JSON.stringify(data));

      client.droplets.neighbors('foo/bar', function(err, neighbors, headers) {
        expect(neighbors).to.be.eql(data.droplets);
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

    it('escapes the name', function(done) {
      testUtils.api.delete('/v2/droplets/foo%2Fbar').reply(204, '');

      client.droplets.delete('foo/bar', function() {
        done();
      });
    });
  });

  describe('deleteByTag', function() {
    it('deletes the droplet', function(done) {
      testUtils.api.delete('/v2/droplets?tag_name=awesome').reply(204, '');

      client.droplets.deleteByTag('awesome', function() {
        done();
      });
    });

    it('escapes the name', function(done) {
      testUtils.api.delete('/v2/droplets?tag_name=foo%2Fbar').reply(204, '');

      client.droplets.deleteByTag('foo/bar', function() {
        done();
      });
    });
  });
});