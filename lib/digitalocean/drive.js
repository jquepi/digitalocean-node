(function() {
  var slice = [].slice,
    util = require('./util');

  var Drive = (function() {
    function Drive(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, optional
    Drive.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/drives', {}].concat(slice.call(params), [200, 'drives', callback]));
    };

    // attributes, required
    // callback, optional
    Drive.prototype.create = function(attributes, callback) {
      return this.client.post('/drives', attributes, 202, 'drive', callback);
    };

    // id, required
    // callback, optional
    Drive.prototype.get = function(id, callback) {
      var url = util.safeUrl('drives', id);
      return this.client.get(url, {}, 200, 'drive', callback);
    };

    // id, required
    // callback, optional
    Drive.prototype.delete = function(id, callback) {
      var url = util.safeUrl('drives', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, optional
    Drive.prototype.listActions = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 1, []),
          callback = arguments[i++];

      var url = util.safeUrl('drives', id, 'actions');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [200, 'actions', callback]));
    };

    // id, rqeuired
    // id, required
    // callback, optional
    Drive.prototype.getAction = function(driveId, id, callback) {
      var url = util.safeUrl('drives', driveId, 'actions', id);
      return this.client.get(url, {}, 200, 'action', callback);
    };

    // id, required
    // parametersOrType, required
    // callback, optional
    Drive.prototype.action = function(id, parametersOrType, callback) {
      var parameters;

      if(typeof parametersOrType === 'string') {
        parameters = { type: parametersOrType };
      } else {
        parameters = parametersOrType;
      }

      var url = util.safeUrl('drives', id, 'actions');
      return this.client.post(url, parameters, 201, 'action', callback);
    };

    // id, required
    // callback, optional
    Drive.prototype.detach = function(id, callback) {
      return this.action(id, 'detach', callback);
    };

    // id, required
    // parametersOrDropletId, required keys: region slug
    // callback, optional
    Drive.prototype.attach = function(id, parametersOrDropletId, callback) {
      var parameters;

      if(typeof parametersOrDropletId !== 'object') {
        parameters = {
          droplet_id: parametersOrDropletId
        };
      } else {
        parameters = parametersOrDropletId;
      }
      parameters.type = 'attach';

      return this.action(id, parameters, callback);
    };

    return Drive;
  })();

  module.exports = Drive;
}).call(this);