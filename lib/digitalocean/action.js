(function() {
  var slice = [].slice;

  var Action = (function() {
    function Action(client) {
      this.client = client;
    }

    // page or query object, optional
    // per_page, optional
    // callback, optional
    Action.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/actions', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Action error: ' + status));
        } else {
          return callback(null, response['actions'], headers, response);
        }
      }]));
    };

    // id, required
    // callback, optional
    Action.prototype.get = function(id, callback) {
      return this.client.get('/action/' + id, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Action error: ' + status));
        } else {
          return callback(null, response['action'], headers, response);
        }
      });
    };

    return Action;
  })();

  module.exports = Action;
}).call(this);
