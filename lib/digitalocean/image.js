var slice = [].slice;

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
    return this.client.get('/images/' + id, {}, function(err, status, response, headers) {
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
  Image.prototype.update = function(id, image, callback) {
    return this.client.put('/images/' + id, image, function(err, status, response, headers) {
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
    return this.client.delete('/images/' + id, {}, function(err, status, response, headers) {
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
