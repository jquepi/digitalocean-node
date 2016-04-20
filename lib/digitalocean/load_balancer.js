(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * LoadBalancer resource
    * @class LoadBalancer
    */
  var LoadBalancer = (function() {
    function LoadBalancer(client) {
      this.client = client;
    }

    /**
     * List load balancer objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {listRequestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/load_balancers', {}].concat(slice.call(args.params), [200, 'load_balancers', args.callback]));
    };

    /**
     * Create a load balancer object.
     *
     * @param {object} attributes - The attributes with which to create the load balancer. See the {@link https://developers.digitalocean.com/documentation/v2/#load_balancers|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.create = function(attributes, callback) {
      return this.client.post('/load_balancers', attributes, 202, 'load_balancer', callback);
    };

    /**
     * Update a load balancer object.
     *
     * @param {string} id - The id of the load balancer to retrieve
     * @param {object} attributes - The attributes with which to update the load balancer. See the {@link https://developers.digitalocean.com/documentation/v2/#load_balancers|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.update = function(id, attributes, callback) {
    var url = util.safeUrl('load_balancers', id);
      return this.client.put(url, attributes, 200, 'load_balancer', callback);
    };

    /**
     * Get the identified load balancer object.
     *
     * @param {string} id - The id of the load balancer to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.get = function(id, callback) {
      var url = util.safeUrl('load_balancers', id);
      return this.client.get(url, {}, 200, 'load_balancer', callback);
    };

    /**
     * Delete the identified load balancer object.
     *
     * @param {string} id - The id of the load balancer to delete
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.delete = function(id, callback) {
      var url = util.safeUrl('load_balancers', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    /**
     * Create a forwarding rule object in a load balancer.
     *
     * @param {string} loadBalancerId - The id of the load balancer for which to add a resource
     * @param {array|object} parametersOrIds - Array of ids of objects to add to the load balancer. Otherwise, an object with required key of `droplet_ids`. See the {@link https://developers.digitalocean.com/documentation/v2/#|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.add = function(loadBalancerId, parametersOrIds, callback) {
      var parameters;

      if(parametersOrIds.length) {
        parameters = {
          droplet_ids: parametersOrIds
        };
      } else {
        parameters = parametersOrIds;
      }

      var url = util.safeUrl('load_balancers', loadBalancerId, 'droplets');
      return this.client.post(url, parameters, 204, [], callback);
    };

    /**
     * Remove the specified IDs from the load balancer.
     *
     * @param {string} loadBalancerId - The name of the load balancer for which to remove a resource
     * @param {array|object} parametersOrIds - Array of ids of objects to add to the load balancer. Otherwise, an object with required key of `droplet_ids`. See the {@link https://developers.digitalocean.com/documentation/v2/#|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.remove = function(loadBalancerId, parametersOrIds, callback) {
      var parameters;

      if(parametersOrIds.length) {
        parameters = {
          droplet_ids: parametersOrIds
        };
      } else {
        parameters = parametersOrIds;
      }

      var url = util.safeUrl('load_balancers', loadBalancerId, 'droplets');
      return this.client.delete(url, parameters, 204, [], callback);
    };

    /**
     * Create a forwarding rule object in a load balancer.
     *
     * @param {string} loadBalancerId - The name of the load balancer for which to create a record
     * @param {array|object} parametersOrRules - Array of rules to create on the load balancer. Otherwise, an object with required key of `forwarding_rules`. See the https://developers.digitalocean.com/documentation/v2/#load-balancers|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.createForwardingRules = function(loadBalancerId, parametersOrRules, callback) {
      var parameters;

      if(parametersOrRules.length) {
        parameters = {
          forwarding_rules: parametersOrRules
        };
      } else {
        parameters = parametersOrRules;
      }

      var url = util.safeUrl('load_balancers', loadBalancerId, 'forwarding_rules');
      return this.client.post(url, parameters, 204, [], callback);
    };

    /**
     * Delete the identified load balancer forwarding rule object.
     *
     * @param {string} loadBalancerId - The name of the load balancer for which to delete a record
     * @param {array|object} parametersOrRules - Array of rules on the load balancer to delete. Otherwise, an object with required key of `forwarding_rules`. See the https://developers.digitalocean.com/documentation/v2/#load-balancers|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof LoadBalancer
     */
    LoadBalancer.prototype.deleteForwardingRules = function(loadBalancerId, parametersOrRules, callback) {
      var parameters;

      if(parametersOrRules.length) {
        parameters = {
          forwarding_rules: parametersOrRules
        };
      } else {
        parameters = parametersOrRules;
      }

      var url = util.safeUrl('load_balancers', loadBalancerId, 'forwarding_rules');
      return this.client.delete(url, parameters, 204, [], callback);
    };

    return LoadBalancer;
  })();

  module.exports = LoadBalancer;
}).call(this);
