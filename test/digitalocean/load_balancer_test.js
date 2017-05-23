'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('load balancer endpoints', function() {
  describe('list', function() {
    var data = {
      "load_balancers": [
        {
          "id": "4de7ac8b-495b-4884-9a69-1050c6793cd6",
          "name": "example-lb-01",
          "ip": "104.131.186.241",
          "algorithm": "round_robin",
          "status": "new",
          "created_at": "2017-02-01T22:22:58Z",
          "forwarding_rules": [
            {
              "entry_protocol": "http",
              "entry_port": 80,
              "target_protocol": "http",
              "target_port": 80,
              "certificate_id": "",
              "tls_passthrough": false
            },
            {
              "entry_protocol": "https",
              "entry_port": 444,
              "target_protocol": "https",
              "target_port": 443,
              "certificate_id": "",
              "tls_passthrough": true
            }
          ],
          "health_check": {
            "protocol": "http",
            "port": 80,
            "path": "/",
            "check_interval_seconds": 10,
            "response_timeout_seconds": 5,
            "healthy_threshold": 5,
            "unhealthy_threshold": 3
          },
          "sticky_sessions": {
            "type": "none"
          },
          "region": {
            "name": "New York 3",
            "slug": "nyc3",
            "sizes": [
              "512mb",
              "1gb",
              "2gb",
              "4gb",
              "8gb",
              "16gb",
              "m-16gb",
              "32gb",
              "m-32gb",
              "48gb",
              "m-64gb",
              "64gb",
              "m-128gb",
              "m-224gb"
            ],
            "features": [
              "private_networking",
              "backups",
              "ipv6",
              "metadata",
              "install_agent"
            ],
            "available": true
          },
          "tag": "",
          "droplet_ids": [
            3164444,
            3164445
          ],
          "redirect_http_to_https": false
        }
      ],
      "links": {
      },
      "meta": {
        "total": 1
      }
    };

    it('returns load balancer', function() {
      testUtils.api.get('/v2/load_balancers').reply(200, JSON.stringify(data));

      client.loadBalancers.list(function(err, loadBalancers, headers) {
        expect(loadBalancers).to.shallowDeepEqual(data.load_balancers);
      });
    });

    it('returns load balancer at page', function() {
      testUtils.api.get('/v2/load_balancers?page=2').reply(200, JSON.stringify(data));

      client.loadBalancers.list(2, function(err, loadBalancers, headers) {
        expect(loadBalancers).to.shallowDeepEqual(data.load_balancers);
      });
    });

    it('returns load balancer at page with length', function() {
      testUtils.api.get('/v2/load_balancers?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.loadBalancers.list(2, 1, function(err, loadBalancers, headers) {
        expect(loadBalancers).to.shallowDeepEqual(data.load_balancers);
      });
    });

    it('returns load balancers with a query object', function() {
      testUtils.api.get('/v2/load_balancers?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.loadBalancers.list({ page: 2, per_page: 1 }, function(err, loadBalancers, headers) {
        expect(loadBalancers).to.shallowDeepEqual(data.load_balancers);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/load_balancers').reply(200, JSON.stringify(data));

      client.loadBalancers.list().then(function(loadBalancers) {
        expect(loadBalancers).to.shallowDeepEqual(data.load_balancers);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('returns a promisable with a query object', function(done) {
      testUtils.api.get('/v2/load_balancers?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.loadBalancers.list({ page: 2, per_page: 1 }).then(function(loadBalancers) {
        expect(loadBalancers).to.shallowDeepEqual(data.load_balancers);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('create', function() {
    var data = {
      "load_balancer": {
        "id": "4de7ac8b-495b-4884-9a69-1050c6793cd6",
        "name": "example-lb-01",
        "ip": "",
        "algorithm": "round_robin",
        "status": "new",
        "created_at": "2017-02-01T22:22:58Z",
        "forwarding_rules": [
          {
            "entry_protocol": "http",
            "entry_port": 80,
            "target_protocol": "http",
            "target_port": 80,
            "certificate_id": "",
            "tls_passthrough": false
          },
          {
            "entry_protocol": "https",
            "entry_port": 444,
            "target_protocol": "https",
            "target_port": 443,
            "certificate_id": "",
            "tls_passthrough": true
          }
        ],
        "health_check": {
          "protocol": "http",
          "port": 80,
          "path": "/",
          "check_interval_seconds": 10,
          "response_timeout_seconds": 5,
          "healthy_threshold": 5,
          "unhealthy_threshold": 3
        },
        "sticky_sessions": {
          "type": "none"
        },
        "region": {
          "name": "New York 3",
          "slug": "nyc3",
          "sizes": [
            "512mb",
            "1gb",
            "2gb",
            "4gb",
            "8gb",
            "16gb",
            "m-16gb",
            "32gb",
            "m-32gb",
            "48gb",
            "m-64gb",
            "64gb",
            "m-128gb",
            "m-224gb"
          ],
          "features": [
            "private_networking",
            "backups",
            "ipv6",
            "metadata",
            "install_agent"
          ],
          "available": true
        },
        "tag": "",
        "droplet_ids": [
          3164444,
          3164445
        ],
        "redirect_http_to_https": false
      }
    };
    var attributes = {
      "name": "example-lb-01",
      "region": "nyc3",
      "forwarding_rules": [
        {
          "entry_protocol": "http",
          "entry_port": 80,
          "target_protocol": "http",
          "target_port": 80,
          "certificate_id": "",
          "tls_passthrough": false
        },
        {
          "entry_protocol": "https",
          "entry_port": 444,
          "target_protocol": "https",
          "target_port": 443,
          "tls_passthrough": true
        }
      ],
      "health_check": {
        "protocol": "http",
        "port": 80,
        "path": "/",
        "check_interval_seconds": 10,
        "response_timeout_seconds": 5,
        "healthy_threshold": 5,
        "unhealthy_threshold": 3
      },
      "sticky_sessions": {
        "type": "none"
      },
      "droplet_ids": [
        3164444,
        3164445
      ]
    };

    it('creates the load balancer', function() {
      testUtils.api.post('/v2/load_balancers', attributes).reply(202, data);

      client.loadBalancers.create(attributes, function(err, loadBalancer, headers) {
        expect(loadBalancer).to.shallowDeepEqual(data.load_balancer);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.post('/v2/load_balancers', attributes).reply(202, data);

      client.loadBalancers.create(attributes).then(function(loadBalancer) {
        expect(loadBalancer).to.shallowDeepEqual(data.load_balancer);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('update', function() {
    var data = {
      "load_balancer": {
        "id": "4de7ac8b-495b-4884-9a69-1050c6793cd6",
        "name": "example-lb-01",
        "ip": "",
        "algorithm": "round_robin",
        "status": "new",
        "created_at": "2017-02-01T22:22:58Z",
        "forwarding_rules": [
          {
            "entry_protocol": "http",
            "entry_port": 80,
            "target_protocol": "http",
            "target_port": 80,
            "certificate_id": "",
            "tls_passthrough": false
          },
          {
            "entry_protocol": "https",
            "entry_port": 444,
            "target_protocol": "https",
            "target_port": 443,
            "certificate_id": "",
            "tls_passthrough": true
          }
        ],
        "health_check": {
          "protocol": "http",
          "port": 80,
          "path": "/",
          "check_interval_seconds": 10,
          "response_timeout_seconds": 5,
          "healthy_threshold": 5,
          "unhealthy_threshold": 3
        },
        "sticky_sessions": {
          "type": "none"
        },
        "region": {
          "name": "New York 3",
          "slug": "nyc3",
          "sizes": [
            "512mb",
            "1gb",
            "2gb",
            "4gb",
            "8gb",
            "16gb",
            "m-16gb",
            "32gb",
            "m-32gb",
            "48gb",
            "m-64gb",
            "64gb",
            "m-128gb",
            "m-224gb"
          ],
          "features": [
            "private_networking",
            "backups",
            "ipv6",
            "metadata",
            "install_agent"
          ],
          "available": true
        },
        "tag": "",
        "droplet_ids": [
          3164444,
          3164445
        ],
        "redirect_http_to_https": false
      }
    };
    var attributes = {
      "name": "example-lb-01",
      "region": "nyc3",
      "forwarding_rules": [
        {
          "entry_protocol": "http",
          "entry_port": 80,
          "target_protocol": "http",
          "target_port": 80,
          "certificate_id": "",
          "tls_passthrough": false
        },
        {
          "entry_protocol": "https",
          "entry_port": 444,
          "target_protocol": "https",
          "target_port": 443,
          "tls_passthrough": true
        }
      ],
      "health_check": {
        "protocol": "http",
        "port": 80,
        "path": "/",
        "check_interval_seconds": 10,
        "response_timeout_seconds": 5,
        "healthy_threshold": 5,
        "unhealthy_threshold": 3
      },
      "sticky_sessions": {
        "type": "none"
      },
      "droplet_ids": [
        3164444,
        3164445
      ]
    };

    it('updates the load balancer', function() {
      testUtils.api.put('/v2/load_balancers/123', attributes).reply(200, data);

      client.loadBalancers.update('123', attributes, function(err, loadBalancer, headers) {
        expect(loadBalancer).to.shallowDeepEqual(data.load_balancer);
      });
    });

    it('escapes the name', function() {
      testUtils.api.put('/v2/load_balancers/foo%2Fbar').reply(200, data);

      client.loadBalancers.update('foo/bar', attributes, function(err, loadBalancer, headers) {
        expect(loadBalancer).to.shallowDeepEqual(data.load_balancer);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.put('/v2/load_balancers/123', attributes).reply(200, data);

      client.loadBalancers.update('123', attributes).then(function(loadBalancer) {
        expect(loadBalancer).to.shallowDeepEqual(data.load_balancer);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('get', function() {
    var data = {
      "load_balancer": {
        "id": "4de7ac8b-495b-4884-9a69-1050c6793cd6",
        "name": "example-lb-01",
        "ip": "104.131.186.241",
        "algorithm": "round_robin",
        "status": "new",
        "created_at": "2017-02-01T22:22:58Z",
        "forwarding_rules": [
          {
            "entry_protocol": "http",
            "entry_port": 80,
            "target_protocol": "http",
            "target_port": 80,
            "certificate_id": "",
            "tls_passthrough": false
          },
          {
            "entry_protocol": "https",
            "entry_port": 444,
            "target_protocol": "https",
            "target_port": 443,
            "certificate_id": "",
            "tls_passthrough": true
          }
        ],
        "health_check": {
          "protocol": "http",
          "port": 80,
          "path": "/",
          "check_interval_seconds": 10,
          "response_timeout_seconds": 5,
          "healthy_threshold": 5,
          "unhealthy_threshold": 3
        },
        "sticky_sessions": {
          "type": "none"
        },
        "region": {
          "name": "New York 3",
          "slug": "nyc3",
          "sizes": [
            "512mb",
            "1gb",
            "2gb",
            "4gb",
            "8gb",
            "16gb",
            "m-16gb",
            "32gb",
            "m-32gb",
            "48gb",
            "m-64gb",
            "64gb",
            "m-128gb",
            "m-224gb"
          ],
          "features": [
            "private_networking",
            "backups",
            "ipv6",
            "metadata",
            "install_agent"
          ],
          "available": true
        },
        "tag": "",
        "droplet_ids": [
          3164444,
          3164445
        ],
        "redirect_http_to_https": false
      }
    };

    it('returns the load balancer', function() {
      testUtils.api.get('/v2/load_balancers/123').reply(200, JSON.stringify(data));

      client.loadBalancers.get(123, function(err, loadBalancer, headers) {
        expect(loadBalancer).to.shallowDeepEqual(data.load_balancer);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/load_balancers/foo%2Fbar').reply(200, JSON.stringify(data));

      client.loadBalancers.get('foo/bar', function(err, loadBalancer, headers) {
        expect(loadBalancer).to.shallowDeepEqual(data.load_balancer);
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.get('/v2/load_balancers/123').reply(200, JSON.stringify(data));

      client.loadBalancers.get(123).then(function(loadBalancer) {
        expect(loadBalancer).to.shallowDeepEqual(data.load_balancer);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('delete', function() {
    it('deletes the droplet', function() {
      testUtils.api.delete('/v2/load_balancers/123').reply(204, '');

      client.loadBalancers.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/load_balancers/foo%2Fbar').reply(204, '');

      client.loadBalancers.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.delete('/v2/load_balancers/123').reply(204, '');

      client.loadBalancers.delete(123).then(function(loadBalancer) {
        expect(loadBalancer.ip).to.be.undefined;
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('add', function() {
    it('creates with a parameters hash', function() {
      var parameters = {
        droplet_ids: [123]
      };

      testUtils.api.post('/v2/load_balancers/123/droplets',
        { droplet_ids: [123] }
      ).reply(204, '');

      client.loadBalancers.add(123, parameters, function(err) {
        expect(err).to.be.null;
      });
    });

    it('creates with droplet ids', function() {
      testUtils.api.post('/v2/load_balancers/123/droplets',
        { droplet_ids: [456] }
      ).reply(204, '');

      client.loadBalancers.add(123, [456], function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/load_balancers/foo%2Fbar/droplets',
        { droplet_ids: [456] }
      ).reply(204, '');

      client.loadBalancers.add('foo/bar', [456], function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.post('/v2/load_balancers/123/droplets',
        { droplet_ids: [456] }
      ).reply(204, '');

      client.loadBalancers.add(123, [456]).then(function(result) {
        expect(result._digitalOcean.body).to.shallowDeepEqual({});
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('remove', function() {
    it('creates with a parameters hash', function() {
      var parameters = {
        droplet_ids: [123]
      };

      testUtils.api.delete('/v2/load_balancers/123/droplets',
        { droplet_ids: [123] }
      ).reply(204, '');

      client.loadBalancers.remove(123, parameters, function(err) {
        expect(err).to.be.null;
      });
    });

    it('creates with droplet ids', function() {
      testUtils.api.delete('/v2/load_balancers/123/droplets',
        { droplet_ids: [456] }
      ).reply(204, '');

      client.loadBalancers.remove(123, [456], function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/load_balancers/foo%2Fbar/droplets',
        { droplet_ids: [456] }
      ).reply(204, '');

      client.loadBalancers.remove('foo/bar', [456], function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.delete('/v2/load_balancers/123/droplets',
        { droplet_ids: [456] }
      ).reply(204, '');

      client.loadBalancers.remove(123, [456]).then(function(result) {
        expect(result._digitalOcean.body).to.shallowDeepEqual({});
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('createForwardingRules', function() {
    var rules = [
      {
        "entry_protocol": "tcp",
        "entry_port": 3306,
        "target_protocol": "tcp",
        "target_port": 3306
      }
    ];

    it('creates with a parameters hash', function() {
      var parameters = {
        forwarding_rules: rules
      };

      testUtils.api.post('/v2/load_balancers/123/forwarding_rules',
        {
          forwarding_rules: [
            {
              "entry_protocol": "tcp",
              "entry_port": 3306,
              "target_protocol": "tcp",
              "target_port": 3306
            }
          ]
        }
      ).reply(204, '');

      client.loadBalancers.createForwardingRules(123, parameters, function(err) {
        expect(err).to.be.null;
      });
    });

    it('creates with droplet ids', function() {
      testUtils.api.post('/v2/load_balancers/123/forwarding_rules',
        {
          forwarding_rules: [
            {
              "entry_protocol": "tcp",
              "entry_port": 3306,
              "target_protocol": "tcp",
              "target_port": 3306
            }
          ]
        }
      ).reply(204, '');

      client.loadBalancers.createForwardingRules(123, rules, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/load_balancers/foo%2Fbar/forwarding_rules',
        {
          forwarding_rules: [
            {
              "entry_protocol": "tcp",
              "entry_port": 3306,
              "target_protocol": "tcp",
              "target_port": 3306
            }
          ]
        }
      ).reply(204, '');

      client.loadBalancers.createForwardingRules('foo/bar', rules, function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.post('/v2/load_balancers/123/forwarding_rules',
        {
          forwarding_rules: [
            {
              "entry_protocol": "tcp",
              "entry_port": 3306,
              "target_protocol": "tcp",
              "target_port": 3306
            }
          ]
        }
      ).reply(204, '');

      client.loadBalancers.createForwardingRules(123, rules).then(function(result) {
        expect(result._digitalOcean.body).to.shallowDeepEqual({});
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('deleteForwardingRules', function() {
    var rules = [
      {
        "entry_protocol": "tcp",
        "entry_port": 3306,
        "target_protocol": "tcp",
        "target_port": 3306
      }
    ];

    it('creates with a parameters hash', function() {
      var parameters = {
        forwarding_rules: rules
      };

      testUtils.api.delete('/v2/load_balancers/123/forwarding_rules',
        {
          forwarding_rules: [
            {
              "entry_protocol": "tcp",
              "entry_port": 3306,
              "target_protocol": "tcp",
              "target_port": 3306
            }
          ]
        }
      ).reply(204, '');

      client.loadBalancers.deleteForwardingRules(123, parameters, function(err) {
        expect(err).to.be.null;
      });
    });

    it('creates with droplet ids', function() {
      testUtils.api.delete('/v2/load_balancers/123/forwarding_rules',
        {
          forwarding_rules: [
            {
              "entry_protocol": "tcp",
              "entry_port": 3306,
              "target_protocol": "tcp",
              "target_port": 3306
            }
          ]
        }
      ).reply(204, '');

      client.loadBalancers.deleteForwardingRules(123, rules, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/load_balancers/foo%2Fbar/forwarding_rules',
        {
          forwarding_rules: [
            {
              "entry_protocol": "tcp",
              "entry_port": 3306,
              "target_protocol": "tcp",
              "target_port": 3306
            }
          ]
        }
      ).reply(204, '');

      client.loadBalancers.deleteForwardingRules('foo/bar', rules, function(err) {
        expect(err).to.be.null;
      });
    });

    it('returns a promisable', function(done) {
      testUtils.api.delete('/v2/load_balancers/123/forwarding_rules',
        {
          forwarding_rules: [
            {
              "entry_protocol": "tcp",
              "entry_port": 3306,
              "target_protocol": "tcp",
              "target_port": 3306
            }
          ]
        }
      ).reply(204, '');

      client.loadBalancers.deleteForwardingRules(123, rules).then(function(result) {
        expect(result._digitalOcean.body).to.shallowDeepEqual({});
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

});
