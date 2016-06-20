(function() {
  var slice = [].slice,
    util = require('./util');

  var FloatingIp = (function() {
    function FloatingIp(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, optional
    FloatingIp.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);

      return this.client.get.apply(this.client, ['/floating_ips', {}].concat(slice.call(args.params), [200, 'floating_ips', args.callback]));
    };

    // attributes, required
    // callback, optional
    FloatingIp.prototype.create = function(attributes, callback) {
      return this.client.post('/floating_ips', attributes, 202, 'floating_ip', callback);
    };

    // ip, required
    // callback, optional
    FloatingIp.prototype.get = function(ip, callback) {
      var url = util.safeUrl('floating_ips', ip);
      return this.client.get(url, {}, 200, 'floating_ip', callback);
    };

    // ip, required
    // callback, optional
    FloatingIp.prototype.delete = function(ip, callback) {
      var url = util.safeUrl('floating_ips', ip);
      return this.client.delete(url, {}, 204, [], callback);
    };

    // ip, required
    // page or query object, optional
    // perPage, optional
    // callback, optional
    FloatingIp.prototype.listActions = function() {
      var args = util.extractListArguments(arguments, 1);
      var url = util.safeUrl('floating_ips', args.identifier, 'actions');

      return this.client.get.apply(this.client, [url, {}].concat(slice.call(args.params), [200, 'actions', args.callback]));
    };

    // ip, rqeuired
    // id, required
    // callback, optional
    FloatingIp.prototype.getAction = function(ip, id, callback) {
      var url = util.safeUrl('floating_ips', ip, 'actions', id);
      return this.client.get(url, {}, 200, 'action', callback);
    };

    // ip, required
    // parametersOrType, required
    // callback, optional
    FloatingIp.prototype.action = function(ip, parametersOrType, callback) {
      var parameters;

      if(typeof parametersOrType === 'string') {
        parameters = { type: parametersOrType };
      } else {
        parameters = parametersOrType;
      }

      var url = util.safeUrl('floating_ips', ip, 'actions');
      return this.client.post(url, parameters, 201, 'action', callback);
    };

    // ip, required
    // callback, optional
    FloatingIp.prototype.unassign = function(ip, callback) {
      return this.action(ip, 'unassign', callback);
    };

    // ip, required
    // parametersOrDropletId, required keys: region slug
    // callback, optional
    FloatingIp.prototype.assign = function(ip, parametersOrDropletId, callback) {
      var parameters;

      if(typeof parametersOrDropletId !== 'object') {
        parameters = {
          droplet_id: parametersOrDropletId
        };
      } else {
        parameters = parametersOrDropletId;
      }
      parameters.type = 'assign';

      return this.action(ip, parameters, callback);
    };

    return FloatingIp;
  })();

  module.exports = FloatingIp;
}).call(this);