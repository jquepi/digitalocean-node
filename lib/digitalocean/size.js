(function() {
  var slice = [].slice;

  var Size = (function() {
    function Size(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    Size.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/sizes', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Size error: ' + status));
        } else {
          return callback(null, response['sizes'], headers, response);
        }
      }]));
    };

    return Size;
  })();

  module.exports = Size;
}).call(this);
