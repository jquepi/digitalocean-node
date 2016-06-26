(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * Tag resource
    * @class Tag
    */
  var Tag = (function() {
    function Tag(client) {
      this.client = client;
    }

    /**
     * List tag objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Tag
     */
    Tag.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/tags', {}].concat(slice.call(args.params), [200, 'tags', args.callback]));
    };

    /**
     * Create a tag object.
     *
     * @param {object} attributes - The attributes with which to create the tag. See the {@link https://developers.digitalocean.com/documentation/v2/#tags|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Tag
     */
    Tag.prototype.create = function(attributes, callback) {
      return this.client.post('/tags', attributes, 201, 'tag', callback);
    };

    /**
     * Get the identified tag object.
     *
     * @param {string} name - The name of the tag to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Tag
     */
    Tag.prototype.get = function(name, callback) {
      var url = util.safeUrl('tags', name);
      return this.client.get(url, {}, 200, 'tag', callback);
    };

    /**
     * Update the identified tag object.
     *
     * @param {string} name - The name of the tag to udpate
     * @param {object} attributes - The attributes with which to update the tag. See the {@link https://developers.digitalocean.com/documentation/v2/#tags|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Tag
     */
    Tag.prototype.update = function(name, attributes, callback) {
      var url = util.safeUrl('tags', name);
      return this.client.put(url, attributes, 200, 'tag', callback);
    };

    /**
     * @typedef Resources
     * @type {object}
     * @property {string} resource_id - a resource ID.
     * @property {string} resource_type - a resource type.
     */

    /**
     * Associate the identified tag with the identified resources.
     *
     * @param {string} name - The name of the tag to udpate
     * @param {Resources[]} resources - An array of objects each with keys of resource_id and resource_type.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Tag
     */
    Tag.prototype.tag = function(name, resources, callback) {
      var attributes = { "resources": resources };
      var url = util.safeUrl('tags', name, 'resources');
      return this.client.post(url, attributes, 204, [], callback);
    };

    /**
     * Unassociate the identified tag with the identified resources.
     *
     * @param {string} name - The name of the tag to udpate
     * @param {Resources[]} resources - An array of objects each with keys of resource_id and resource_type.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Tag
     */
    Tag.prototype.untag = function(name, resources, callback) {
      var attributes = { "resources": resources };
      var url = util.safeUrl('tags', name, 'resources');
      return this.client.delete(url, attributes, 204, [], callback);
    };

    /**
     * Delete the identified tag object.
     *
     * @param {string} name - The name of the tag to delete
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Tag
     */
    Tag.prototype.delete = function(name, callback) {
      var url = util.safeUrl('tags', name);
      return this.client.delete(url, {}, 204, [], callback);
    };

    return Tag;
  })();

  module.exports = Tag;
}).call(this);