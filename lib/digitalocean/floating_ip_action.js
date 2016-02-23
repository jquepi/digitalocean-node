(function() {
  var slice = [].slice;

  var FloatingIpAction = (function() {
    function FloatingIpAction(client) {
      this.client = client;
    }

    // ip, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    FloatingIpAction.prototype.list = function(ip, callback) {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/floating_ips/' + id + '/actions', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Floating IP error: ' + status));
        } else {
          return callback(null, response['actions'], headers, response);
        }
      }]));
    };

    // ip, rqeuired
    // id, required
    // callback, required
    FloatingIpAction.prototype.get = function(ip, id, callback) {
      return this.client.get('/floating_ips/' + ip + '/actions/' + id, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('FloatingIpAction error: ' + status));
        } else {
          return callback(null, response['action'], headers, response);
        }
      });
    };

    // ip, required
    // parametersOrType, required
    // callback, required
    FloatingIpAction.prototype.action = function(ip, parametersOrType, callback) {
      var parameters;

      if(typeof parametersOrType === 'string') {
        parameters = { type: parametersOrType };
      } else {
        parameters = parametersOrType;
      }

      return this.client.post('/floating_ips/' + ip + '/actions', parameters, function(err, status, response, headers) {
        if (err) {
          console.log(err)
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('FloatingIpAction error: ' + status));
        } else {
          return callback(null, response['action'], headers, response);
        }
      });
    };

    // ip, required
    // callback, required
    FloatingIpAction.prototype.unassign = function(ip, callback) {
      this.action(ip, 'unassign', callback);
    };

    // ip, required
    // parametersOrDropletId, required keys: region slug
    // callback, required
    FloatingIpAction.prototype.assign = function(ip, parametersOrDropletId, callback) {
      var parameters;

      if(typeof parametersOrDropletId !== 'object') {
        parameters = {
          droplet_id: parametersOrDropletId
        };
      } else {
        parameters = parametersOrDropletId;
      }
      parameters.type = 'assign';

      this.action(ip, parameters, callback);
    };

    return FloatingIpAction;
  })();

  module.exports = FloatingIpAction;
}).call(this);
