(function() {
  var slice = [].slice;

  var DropletAction = (function() {
    function DropletAction(client) {
      this.client = client;
    }

    // dropletId, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    DropletAction.prototype.list = function() {
      var dropletId = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/droplets/' + dropletId + '/actions', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['actions'], headers, response);
        }
      }]));
    };

    // dropletId, rqeuired
    // id, required
    // callback, required
    DropletAction.prototype.get = function(dropletId, id, callback) {
      return this.client.get('/droplets/' + dropletId + '/actions/' + id, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('DropletAction error: ' + status));
        } else {
          return callback(null, response['action'], headers, response);
        }
      });
    };

    // dropletId, required
    // parametersOrType, required
    // callback, required
    DropletAction.prototype.action = function(dropletId, parametersOrType, callback) {
      var parameters;

      if(typeof parametersOrType === 'string') {
        parameters = { type: parametersOrType };
      } else {
        parameters = parametersOrType;
      }

      return this.client.post('/droplets/' + dropletId + '/actions', parameters, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('DropletAction error: ' + status));
        } else {
          return callback(null, response['action'], headers, response);
        }
      });
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.shutdown = function(dropletId, callback) {
      this.action(dropletId, 'shutdown', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.powerOff = function(dropletId, callback) {
      this.action(dropletId, 'power_off', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.powerOn = function(dropletId, callback) {
      this.action(dropletId, 'power_on', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.powerCycle = function(dropletId, callback) {
      this.action(dropletId, 'power_cycle', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.reboot = function(dropletId, callback) {
      this.action(dropletId, 'reboot', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.enableBackups = function(dropletId, callback) {
      this.action(dropletId, 'enable_backups', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.disableBackups = function(dropletId, callback) {
      this.action(dropletId, 'disable_backups', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.passwordReset = function(dropletId, callback) {
      this.action(dropletId, 'password_reset', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.enableIPv6 = function(dropletId, callback) {
      this.action(dropletId, 'enable_ipv6', callback);
    };

    // dropletId, required
    // callback, required
    DropletAction.prototype.enablePrivateNetworking = function(dropletId, callback) {
      this.action(dropletId, 'enable_private_networking', callback);
    };

    // dropletId, required
    // parametersOrSizeSlug, required keys: size string; optional keys: disk bool
    // callback, required
    DropletAction.prototype.resize = function(dropletId, parametersOrSizeSlug, callback) {
      var parameters;

      if(typeof parametersOrSizeSlug !== 'object') {
        parameters = {
          size: parametersOrSizeSlug
        };
      } else {
        parameters = parametersOrSizeSlug;
      }
      parameters.type = 'resize';

      this.action(dropletId, parameters, callback);
    };

    // dropletId, required
    // parametersOrHostname, required keys: name string
    // callback, required
    DropletAction.prototype.rename = function(dropletId, parametersOrHostname, callback) {
      var parameters;

      if(typeof parametersOrHostname !== 'object') {
        parameters = {
          name: parametersOrHostname
        };
      } else {
        parameters = parametersOrHostname;
      }
      parameters.type = 'rename';

      this.action(dropletId, parameters, callback);
    };

    // dropletId, required
    // parametersOrName, required keys: name string
    // callback, required
    DropletAction.prototype.snapshot = function(dropletId, parametersOrName, callback) {
      var parameters;

      if(typeof parametersOrName !== 'object') {
        parameters = {
          name: parametersOrName
        };
      } else {
        parameters = parametersOrName;
      }
      parameters.type = 'snapshot';

      this.action(dropletId, parameters, callback);
    };

    // dropletId, required
    // parametersOrImageId, required keys: image int
    // callback, required
    DropletAction.prototype.restore = function(dropletId, parametersOrImageId, callback) {
      var parameters;

      if(typeof parametersOrImageId !== 'object') {
        parameters = {
          image: parametersOrImageId
        };
      } else {
        parameters = parametersOrImageId;
      }
      parameters.type = 'restore';

      this.action(dropletId, parameters, callback);
    };

    // dropletId, required
    // parametersOrImage, required keys: image int (dropletId) or string (slug)
    // callback, required
    DropletAction.prototype.rebuild = function(dropletId, parametersOrImage, callback) {
      var parameters;

      if(typeof parametersOrImage !== 'object') {
        parameters = {
          image: parametersOrImage
        };
      } else {
        parameters = parametersOrImage;
      }
      parameters.type = 'rebuild';

      this.action(dropletId, parameters, callback);
    };

    // dropletId, required
    // parametersOrKernelId, required keys: kernel int (dropletId)
    // callback, required
    DropletAction.prototype.changeKernel = function(dropletId, parametersOrKernelId, callback) {
      var parameters;

      if(typeof parametersOrKernelId !== 'object') {
        parameters = {
          kernel: parametersOrKernelId
        };
      } else {
        parameters = parametersOrKernelId;
      }
      parameters.type = 'change_kernel';

      this.action(dropletId, parameters, callback);
    };

    return DropletAction;
  })();

  module.exports = DropletAction;
}).call(this);