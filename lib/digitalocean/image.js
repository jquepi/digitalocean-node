(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * Image resource
    * @class Image
    */
  var Image = (function() {
    function Image(client) {
      this.client = client;
    }

    /**
     * List image objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
    Image.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/images', {}].concat(slice.call(args.params), [200, 'images', args.callback]));
    };

    /**
     * Get the identified image object.
     *
     * @param {number} id - The id of the image to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
    Image.prototype.get = function(id, callback) {
      var url = util.safeUrl('images', id);
      return this.client.get(url, {}, 200, 'image', callback);
    };

    /**
     * Update the identified image object.
     *
     * @param {number} id - The id of the image to update
     * @param {object} attributes - The attributes with which to create the Droplet. See the {@link https://developers.digitalocean.com/documentation/v2/#images|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
    Image.prototype.update = function(id, attributes, callback) {
      var url = util.safeUrl('images', id);
      return this.client.put(url, attributes, 200, 'image', callback);
    };

    /**
     * Delete the identified image object.
     *
     * @param {number} id - The id of the image to delete
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
    Image.prototype.delete = function(id, callback) {
      var url = util.safeUrl('images', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    /**
     * List of action objects.
     *
     * @param {number} id - ID of Droplet for which to retrieve actions
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
    Image.prototype.listActions = function() {
      var args = util.extractListArguments(arguments, 1);
      var url = util.safeUrl('images', args.identifier, 'actions');

      return this.client.get.apply(this.client, [url, {}].concat(slice.call(args.params), [200, 'actions', args.callback]));
    };

    /**
     * Get the identified action object.
     *
     * @param {number} imageId - The id of the image for which to retrieve the action
     * @param {number} id - The id of the action to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
    Image.prototype.getAction = function(imageId, id, callback) {
      var url = util.safeUrl('images', imageId, 'actions', id);
      return this.client.get(url, {}, 200, 'action', callback);
    };

    /**
     * Create an action on the identified image.
     *
     * @param {number} imageId - The id of the image for which to create the action
     * @param {string|object} parametersOrType - The name of the action to create or an object with key value pairs of parameters.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
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

    /**
     * If the image is a backup, wwitch the identified image from a backup to a snapshot.
     *
     * @param {number} dropletId - The id of the image for which to create the action
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
    Image.prototype.convert = function(imageId, callback) {
      return this.action(imageId, 'convert', callback);
    };

    /**
     * Add the image to an additional region.
     *
     * @param {number} imageId - The id of the image for which to create the action
     * @param {string|object} parametersOrRegionSlug - If a string, the identifier of the region. Otherwise, an object with required keys of `region`. See the {@link https://developers.digitalocean.com/documentation/v2/#transfer-an-image|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Image
     */
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