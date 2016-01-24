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

    // droplet, required
    // callback, required
    Droplet.prototype.create = function(droplet, callback) {
      return this.client.post('/droplets', droplet, function(err, status, response, headers) {
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
    Droplet.prototype.actions = function(id, callback) {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/droplets/' + id + '/actions', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['actions'], headers, response);
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
