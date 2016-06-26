(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * Action resource
    * @class Action
    */
  var Action = (function() {
    function Action(client) {
      this.client = client;
    }

    /**
     * List action objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Action
     */
    Action.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/actions', {}].concat(slice.call(args.params), [200, 'actions', args.callback]));
    };

    /**
     * Get the identified action object.
     *
     * @param {number} id - The id of the action to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Action
     */
    Action.prototype.get = function(id, callback) {
      var url = util.safeUrl('action', id);
      return this.client.get(url, {}, 200, 'action', callback);
    };

    return Action;
  })();

  module.exports = Action;
}).call(this);