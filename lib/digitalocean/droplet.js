(function() {
  var slice = [].slice,
    util = require('./util');

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
          return callback(null, response['droplet'] || response['droplets'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    Droplet.prototype.get = function(id, callback) {
      var url = util.safeUrl('droplets', id);
      return this.client.get(url, {}, function(err, status, response, headers) {
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

      var url = util.safeUrl('droplets', id, 'kernels');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
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

      var url = util.safeUrl('droplets', id, 'snapshots');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
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

      var url = util.safeUrl('droplets', id, 'backups');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
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

      var url = util.safeUrl('droplets', id, 'neighbors');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
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
      var url = util.safeUrl('droplets', id);
      return this.client.delete(url, {}, function(err, status, response, headers) {
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