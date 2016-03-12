var slice = [].slice;

var ImageAction = (function() {
  function ImageAction(client) {
    this.client = client;
  }

  // imageId, required
  // page or query object, optional
  // perPage, optional
  // callback, required
  ImageAction.prototype.list = function() {
    var imageId = arguments[0],
        i,
        params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
        callback = arguments[i++];

    return this.client.get.apply(this.client, ['/images/' + imageId + '/actions', {}].concat(slice.call(params), [function(err, status, response, headers) {
      if (err) {
        return callback(err);
      }
      if (status !== 200) {
        return callback(new Error('ImageAction error: ' + status));
      } else {
        return callback(null, response['actions'], headers, response);
      }
    }]));
  };

  // imageId, rqeuired
  // id, required
  // callback, required
  ImageAction.prototype.get = function(imageId, id, callback) {
    return this.client.get('/images/' + imageId + '/actions/' + id, {}, function(err, status, response, headers) {
      if (err) {
        return callback(err);
      }
      if (status !== 200) {
        return callback(new Error('ImageAction error: ' + status));
      } else {
        return callback(null, response['action'], headers, response);
      }
    });
  };

  // imageId, required
  // parametersOrType, required
  // callback, required
  ImageAction.prototype.action = function(imageId, parametersOrType, callback) {
    var parameters;

    if(typeof parametersOrType === 'string') {
      parameters = { type: parametersOrType };
    } else {
      parameters = parametersOrType;
    }

    return this.client.post('/images/' + imageId + '/actions', parameters, function(err, status, response, headers) {
      if (err) {
        console.log(err)
        return callback(err);
      }
      if (status !== 201) {
        return callback(new Error('ImageAction error: ' + status));
      } else {
        return callback(null, response['action'], headers, response);
      }
    });
  };

  // imageId, required
  // callback, required
  ImageAction.prototype.convert = function(imageId, callback) {
    this.action(imageId, 'convert', callback);
  };

  // imageId, required
  // parametersOrRegionSlug, required keys: region slug
  // callback, required
  ImageAction.prototype.transfer = function(imageId, parametersOrRegionSlug, callback) {
    var parameters;

    if(typeof parametersOrRegionSlug !== 'object') {
      parameters = {
        region: parametersOrRegionSlug
      };
    } else {
      parameters = parametersOrRegionSlug;
    }
    parameters.type = 'transfer';

    this.action(imageId, parameters, callback);
  };

  return ImageAction;
})();

module.exports = ImageAction;
