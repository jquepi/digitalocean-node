(function() {
  var slice = [].slice;

  var Region = (function() {
    function Region(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    Region.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/regions', {}].concat(slice.call(params), [200, 'regions', callback]));
    };

    return Region;
  })();

  module.exports = Region;
}).call(this);