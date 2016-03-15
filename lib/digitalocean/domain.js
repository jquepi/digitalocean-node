(function() {
  var slice = [].slice;

  var Domain = (function() {
    function Domain(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    Domain.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/domains', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Domain error: ' + status));
        } else {
          return callback(null, response['domains'], headers, response);
        }
      }]));
    };

    // attributes, required
    // callback, required
    Domain.prototype.create = function(attributes, callback) {
      return this.client.post('/domains', attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('Domain error: ' + status));
        } else {
          return callback(null, response['domain'], headers, response);
        }
      });
    };

    // name, required
    // callback, required
    Domain.prototype.get = function(name, callback) {
      return this.client.get('/domains/' + name, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Domain error: ' + status));
        } else {
          return callback(null, response['domain'], headers, response);
        }
      });
    };

    // name, required
    // callback, required
    Domain.prototype.delete = function(name, callback) {
      return this.client.delete('/domains/' + name, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('Domain error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    return Domain;
  })();

  module.exports = Domain;
}).call(this);