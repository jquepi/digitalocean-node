(function() {
  var slice = [].slice,
    util = require('./util');

  var Tag = (function() {
    function Tag(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, optional
    Tag.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/tags', {}].concat(slice.call(params), [200, 'tags', callback]));
    };

    // attributes, required
    // callback, optional
    Tag.prototype.create = function(attributes, callback) {
      return this.client.post('/tags', attributes, 201, 'tag', callback);
    };

    // name, required
    // callback, optional
    Tag.prototype.get = function(name, callback) {
      var url = util.safeUrl('tags', name);
      return this.client.get(url, {}, 200, 'tag', callback);
    };

    // name, required
    // attributes, required
    // callback, optional
    Tag.prototype.update = function(name, attributes, callback) {
      var url = util.safeUrl('tags', name);
      return this.client.put(url, attributes, 200, 'tag', callback);
    };

    // name, required
    // resources, array of objects with resource_id and resource_type, required
    // callback, optional
    Tag.prototype.tag = function(name, resources, callback) {
      var attributes = { "resources": resources };
      var url = util.safeUrl('tags', name, 'resources');
      return this.client.post(url, attributes, 204, [], callback);
    };

    // name, required
    // resources, array of objects with resource_id and resource_type, required
    // callback, optional
    Tag.prototype.untag = function(name, resources, callback) {
      var attributes = { "resources": resources };
      var url = util.safeUrl('tags', name, 'resources');
      return this.client.delete(url, attributes, 204, [], callback);
    };

    // name, required
    // callback, optional
    Tag.prototype.delete = function(name, callback) {
      var url = util.safeUrl('tags', name);
      return this.client.delete(url, {}, 204, [], callback);
    };

    return Tag;
  })();

  module.exports = Tag;
}).call(this);