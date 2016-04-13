(function() {
  var slice = [].slice,
    util = require('./util');

  var Account = (function() {
    function Account(client) {
      this.client = client;
    }

    // callback, optional
    Account.prototype.get = function(callback) {
      return this.client.get('/account', {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Account error: ' + status));
        } else {
          return callback(null, response['account'], headers, response);
        }
      });
    };

    // page or query object, optional
    // perPage, optional
    // callback, required
    Account.prototype.listSshKeys = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/account/keys', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Account Key error: ' + status));
        } else {
          return callback(null, response['ssh_keys'], headers, response);
        }
      }]));
    };

    // attributes, required
    // callback, required
    Account.prototype.createSshKey = function(attributes, callback) {
      return this.client.post('/account/keys', attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('Account Key error: ' + status));
        } else {
          return callback(null, response['ssh_key'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    Account.prototype.getSshKey = function(id, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.get(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Account Key error: ' + status));
        } else {
          return callback(null, response['ssh_key'], headers, response);
        }
      });
    };

    // id, required
    // attributes, required
    // callback, required
    Account.prototype.updateSshKey = function(id, attributes, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.put(url, attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Account Key error: ' + status));
        } else {
          return callback(null, response['ssh_key'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    Account.prototype.deleteSshKey = function(id, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.delete(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('Account Key error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    return Account;
  })();

  module.exports = Account;
}).call(this);