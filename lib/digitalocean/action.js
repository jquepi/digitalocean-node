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
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/actions', {}].concat(slice.call(params), [200, 'actions', callback]));
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