(function() {
  var slice = [].slice,
    util = require('./util');

  var Image = (function() {
    function Image(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, optional
    Image.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/images', {}].concat(slice.call(params), [200, 'images', callback]));
    };

    // id, required
    // callback, optional
    Image.prototype.get = function(id, callback) {
      var url = util.safeUrl('images', id);
      return this.client.get(url, {}, 200, 'image', callback);
    };

    // id, required
    // image, required
    // callback, optional
    Image.prototype.update = function(id, attributes, callback) {
      var url = util.safeUrl('images', id);
      return this.client.put(url, attributes, 200, 'image', callback);
    };

    // id, required
    // callback, optional
    Image.prototype.delete = function(id, callback) {
      var url = util.safeUrl('images', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    // imageId, required
    // page or query object, optional
    // perPage, optional
    // callback, optional
    Image.prototype.listActions = function() {
      var imageId = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 1, []),
          callback = arguments[i++];

      var url = util.safeUrl('images', imageId, 'actions');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [200, 'actions', callback]));
    };

    // imageId, rqeuired
    // id, required
    // callback, optional
    Image.prototype.getAction = function(imageId, id, callback) {
      var url = util.safeUrl('images', imageId, 'actions', id);
      return this.client.get(url, {}, 200, 'action', callback);
    };

    // imageId, required
    // parametersOrType, required
    // callback, optional
    Image.prototype.action = function(imageId, parametersOrType, callback) {
      var parameters;

      if(typeof parametersOrType === 'string') {
        parameters = { type: parametersOrType };
      } else {
        parameters = parametersOrType;
      }

      var url = util.safeUrl('images', imageId, 'actions');
      return this.client.post(url, parameters, 201, 'action', callback);
    };

    // imageId, required
    // callback, optional
    Image.prototype.convert = function(imageId, callback) {
      return this.action(imageId, 'convert', callback);
    };

    // imageId, required
    // parametersOrRegionSlug, required keys: region slug
    // callback, optional
    Image.prototype.transfer = function(imageId, parametersOrRegionSlug, callback) {
      var parameters;

      if(typeof parametersOrRegionSlug !== 'object') {
        parameters = {
          region: parametersOrRegionSlug
        };
      } else {
        parameters = parametersOrRegionSlug;
      }
      parameters.type = 'transfer';

      return this.action(imageId, parameters, callback);
    };

    return Image;
  })();

  module.exports = Image;
}).call(this);