(function() {
  var slice = [].slice,
    util = require('./util');

  var Account = (function() {
    function Account(client) {
      this.client = client;
    }

    // callback, optional
    Account.prototype.get = function(callback) {
      return this.client.get('/account', {}, 200, 'account', callback);
    };

    // page or query object, optional
    // perPage, optional
    // callback, optional
    Account.prototype.listSshKeys = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/account/keys', {}].concat(slice.call(params), [200, 'ssh_keys', callback]));
    };

    // attributes, required
    // callback, optional
    Account.prototype.createSshKey = function(attributes, callback) {
      return this.client.post('/account/keys', attributes, 201, 'ssh_key', callback);
    };

    // id, required
    // callback, optional
    Account.prototype.getSshKey = function(id, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.get(url, {}, 200, 'ssh_key', callback);
    };

    // id, required
    // attributes, required
    // callback, optional
    Account.prototype.updateSshKey = function(id, attributes, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.put(url, attributes, 200, 'ssh_key', callback);
    };

    // id, required
    // callback, optional
    Account.prototype.deleteSshKey = function(id, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    return Account;
  })();

  module.exports = Account;
}).call(this);