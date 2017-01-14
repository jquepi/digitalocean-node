(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * Snapshot resource
    * @class Snapshot
    */
  var Snapshot = (function() {
    function Snapshot(client) {
      this.client = client;
    }

    /**
     * List snapshot objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Snapshot
     */
    Snapshot.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/snapshots', {}].concat(slice.call(args.params), [200, 'snapshots', args.callback]));
    };

    /**
     * Get the identified snapshot object.
     *
     * @param {string} id - The id of the snapshot to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Snapshot
     */
    Snapshot.prototype.get = function(id, callback) {
      var url = util.safeUrl('snapshots', id);
      return this.client.get(url, {}, 200, 'snapshot', callback);
    };

    /**
     * Delete the identified snapshot object.
     *
     * @param {string} id - The id of the snapshot to delete
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Snapshot
     */
    Snapshot.prototype.delete = function(id, callback) {
      var url = util.safeUrl('snapshots', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    return Snapshot;
  })();

  module.exports = Snapshot;
}).call(this);