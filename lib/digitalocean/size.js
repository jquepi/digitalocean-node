(function() {
  var slice = [].slice,
    util = require('./util');

  var Size = (function() {
    function Size(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, optional
    Size.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/sizes', {}].concat(slice.call(args.params), [200, 'sizes', args.callback]));
    };

    return Size;
  })();

  module.exports = Size;
}).call(this);