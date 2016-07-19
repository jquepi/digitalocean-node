(function() {
  var slice = [].slice,
    util = require('./util');

  var Volume = (function() {
    function Volume(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, optional
    Volume.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);

      return this.client.get.apply(this.client, ['/volumes', {}].concat(slice.call(args.params), [200, 'volumes', args.callback]));
    };

    // attributes, required
    // callback, optional
    Volume.prototype.create = function(attributes, callback) {
      return this.client.post('/volumes', attributes, 202, 'volume', callback);
    };

    // id, required
    // callback, optional
    Volume.prototype.get = function(id, callback) {
      var url = util.safeUrl('volumes', id);
      return this.client.get(url, {}, 200, 'volume', callback);
    };

    // id, required
    // callback, optional
    Volume.prototype.delete = function(id, callback) {
      var url = util.safeUrl('volumes', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, optional
    Volume.prototype.listActions = function() {
      var args = util.extractListArguments(arguments, 1);
      var url = util.safeUrl('volumes', args.identifier, 'actions');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(args.params), [200, 'actions', args.callback]));
    };

    // id, rqeuired
    // id, required
    // callback, optional
    Volume.prototype.getAction = function(volumeId, id, callback) {
      var url = util.safeUrl('volumes', volumeId, 'actions', id);
      return this.client.get(url, {}, 200, 'action', callback);
    };

    // id, required
    // parametersOrType, required
    // callback, optional
    Volume.prototype.action = function(id, parametersOrType, callback) {
      var parameters;

      if(typeof parametersOrType === 'string') {
        parameters = { type: parametersOrType };
      } else {
        parameters = parametersOrType;
      }

      var url = util.safeUrl('volumes', id, 'actions');
      return this.client.post(url, parameters, 201, 'action', callback);
    };

    // id, required
    // callback, optional
    Volume.prototype.detach = function(id, callback) {
      return this.action(id, 'detach', callback);
    };

    // id, required
    // parametersOrDropletId, required keys: region slug
    // callback, optional
    Volume.prototype.attach = function(id, parametersOrDropletId, callback) {
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

    // id, required
    // parametersOrSizeGibabytes, required keys: region slug, size_gigabytes
    // region optional unless parameters provided
    // callback, optional
    Volume.prototype.resize = function(id, parametersOrSizeGibabytes, region, callback) {
      var parameters;

      if(typeof parametersOrSizeGibabytes !== 'object') {
        parameters = {
          size_gigabytes: parametersOrSizeGibabytes,
          region: region
        };
      } else {
        parameters = parametersOrSizeGibabytes;
        callback = region;
      }
      parameters.type = 'resize';

      return this.action(id, parameters, callback);
    };

    return Volume;
  })();

  module.exports = Volume;
}).call(this);