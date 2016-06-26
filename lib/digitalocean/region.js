(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * Region resource
    * @class Region
    */
  var Region = (function() {
    function Region(client) {
      this.client = client;
    }

    /**
     * List region objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof region
     */
    Region.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/regions', {}].concat(slice.call(args.params), [200, 'regions', args.callback]));
    };

    return Region;
  })();

  module.exports = Region;
}).call(this);