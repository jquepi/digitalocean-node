(function() {
  var slice = [].slice,
    util = require('./util');
  /**
    * Size resource
    * @class Size
    */
  var Size = (function() {
    function Size(client) {
      this.client = client;
    }

    /**
     * List size objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Size
     */
    Size.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/sizes', {}].concat(slice.call(args.params), [200, 'sizes', args.callback]));
    };

    return Size;
  })();

  module.exports = Size;
}).call(this);