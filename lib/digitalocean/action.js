(function() {
  var slice = [].slice,
    util = require('./util');

  var Action = (function() {
    function Action(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, optional
    Action.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/actions', {}].concat(slice.call(args.params), [200, 'actions', args.callback]));
    };

    // id, required
    // callback, optional
    Action.prototype.get = function(id, callback) {
      var url = util.safeUrl('action', id);
      return this.client.get(url, {}, 200, 'action', callback);
    };

    return Action;
  })();

  module.exports = Action;
}).call(this);