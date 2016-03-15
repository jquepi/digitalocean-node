(function() {
  var slice = [].slice;

  var Droplet = (function() {
    function Droplet(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/droplets', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['droplets'], headers, response);
        }
      }]));
    };

    // attributes, required
    // callback, required
    Droplet.prototype.create = function(attributes, callback) {
      return this.client.post('/droplets', attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 202) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['droplet'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    Droplet.prototype.get = function(id, callback) {
      return this.client.get('/droplets/' + id, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['droplet'], headers, response);
        }
      });
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.kernels = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/droplets/' + id + '/kernels', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['kernels'], headers, response);
        }
      }]));
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.snapshots = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/droplets/' + id + '/snapshots', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['snapshots'], headers, response);
        }
      }]));
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.backups = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/droplets/' + id + '/backups', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['backups'], headers, response);
        }
      }]));
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.neighbors = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/droplets/' + id + '/neighbors', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['droplets'], headers, response);
        }
      }]));
    };

    // id, required
    // callback, required
    Droplet.prototype.delete = function(id, callback) {
      return this.client.delete('/droplets/' + id, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    return Droplet;
  })();

  module.exports = Droplet;
}).call(this);