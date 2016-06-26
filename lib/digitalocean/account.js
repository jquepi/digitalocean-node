(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * Account resource
    * @class Account
    */
  var Account = (function() {
    function Account(client) {
      this.client = client;
    }

    /**
     * Get the account object.
     *
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Account
     */
    Account.prototype.get = function(callback) {
      return this.client.get('/account', {}, 200, 'account', callback);
    };

    /**
     * List ssh key objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Account
     */
    Account.prototype.listSshKeys = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/account/keys', {}].concat(slice.call(args.params), [200, 'ssh_keys', args.callback]));
    };

    /**
     * Create a ssh key object.
     *
     * @param {object} attributes - The attributes with wich to create the ssh key. See the {@link https://developers.digitalocean.com/documentation/v2/#ssh-keys|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Account
     */
    Account.prototype.createSshKey = function(attributes, callback) {
      return this.client.post('/account/keys', attributes, 201, 'ssh_key', callback);
    };

    /**
     * Get the identified ssh key object.
     *
     * @param {number} id - The id of the ssh key to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Account
     */
    Account.prototype.getSshKey = function(id, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.get(url, {}, 200, 'ssh_key', callback);
    };

    /**
     * Update the identified ssh key object.
     *
     * @param {number} id - The id of the ssh key to update
     * @param {object} attributes - The attributes with which to update the ssh key. See the {@link https://developers.digitalocean.com/documentation/v2/#ssh-keys|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Account
     */
    Account.prototype.updateSshKey = function(id, attributes, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.put(url, attributes, 200, 'ssh_key', callback);
    };

    /**
     * Delete the identified ssh key object.
     *
     * @param {number} id - The id of the ssh key to delete
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Account
     */
    Account.prototype.deleteSshKey = function(id, callback) {
      var url = util.safeUrl('account', 'keys', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    return Account;
  })();

  module.exports = Account;
}).call(this);