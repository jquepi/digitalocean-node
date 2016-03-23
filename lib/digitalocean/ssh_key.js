(function() {
  var slice = [].slice,
    util = require('./util');

  var SshKey = (function() {
    function SshKey(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    SshKey.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/account/keys', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('SshKey error: ' + status));
        } else {
          return callback(null, response['ssh_keys'], headers, response);
        }
      }]));
    };

    // attributes, required
    // callback, required
    SshKey.prototype.create = function(attributes, callback) {
      return this.client.post('/account/keys', attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('SshKey error: ' + status));
        } else {
          return callback(null, response['ssh_key'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    SshKey.prototype.get = function(id, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.get(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('SshKey error: ' + status));
        } else {
          return callback(null, response['ssh_key'], headers, response);
        }
      });
    };

    // id, required
    // attributes, required
    // callback, required
    SshKey.prototype.update = function(id, attributes, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.put(url, attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('SshKey error: ' + status));
        } else {
          return callback(null, response['ssh_key'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    SshKey.prototype.delete = function(id, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.delete(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('SshKey error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    return SshKey;
  })();

  module.exports = SshKey;
}).call(this);