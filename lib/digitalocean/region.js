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

      return this.client.get.apply(this.client, ['/regions', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Region error: ' + status));
        } else {
          return callback(null, response['regions'], headers, response);
        }
      }]));
    };

    return Region;
  })();

  module.exports = Region;
}).call(this);