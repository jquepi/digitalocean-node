(function() {
  var slice = [].slice;

  var FloatingIp = (function() {
    function FloatingIp(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    FloatingIp.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/floating_ips', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('FloatingIp error: ' + status));
        } else {
          return callback(null, response['floating_ips'], headers, response);
        }
      }]));
    };

    // attributes, required
    // callback, required
    FloatingIp.prototype.create = function(attributes, callback) {
      return this.client.post('/floating_ips', attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 202) {
          return callback(new Error('FloatingIp error: ' + status));
        } else {
          return callback(null, response['floating_ip'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    FloatingIp.prototype.get = function(id, callback) {
      return this.client.get('/floating_ips/' + id, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('FloatingIp error: ' + status));
        } else {
          return callback(null, response['floating_ip'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    FloatingIp.prototype.delete = function(id, callback) {
      return this.client.delete('/floating_ips/' + id, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('FloatingIp error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    return FloatingIp;
  })();

  module.exports = FloatingIp;
}).call(this);