(function() {
  var slice = [].slice,
    util = require('./util');

  var Image = (function() {
    function Image(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    Image.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/images', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Image error: ' + status));
        } else {
          return callback(null, response['images'], headers, response);
        }
      }]));
    };

    // id, required
    // callback, required
    Image.prototype.get = function(id, callback) {
      var url = util.safeUrl('images', id);
      return this.client.get(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Image error: ' + status));
        } else {
          return callback(null, response['image'], headers, response);
        }
      });
    };

    // id, required
    // image, required
    // callback, required
    Image.prototype.update = function(id, attributes, callback) {
      var url = util.safeUrl('images', id);
      return this.client.put(url, attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Image error: ' + status));
        } else {
          return callback(null, response['image'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    Image.prototype.delete = function(id, callback) {
      var url = util.safeUrl('images', id);
      return this.client.delete(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('Image error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    return Image;
  })();

  module.exports = Image;
}).call(this);