(function() {
  var slice = [].slice,
    util = require('./util');

  var Droplet = (function() {
    function Droplet(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/droplets', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['droplets'], headers, response);
        }
      }]));
    };

    // attributes, required
    // callback, required
    Droplet.prototype.create = function(attributes, callback) {
      return this.client.post('/droplets', attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 202) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['droplet'] || response['droplets'], headers, response);
        }
      });
    };

    // id, required
    // callback, required
    Droplet.prototype.get = function(id, callback) {
      var url = util.safeUrl('droplets', id);
      return this.client.get(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['droplet'], headers, response);
        }
      });
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.kernels = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      var url = util.safeUrl('droplets', id, 'kernels');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['kernels'], headers, response);
        }
      }]));
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.snapshots = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      var url = util.safeUrl('droplets', id, 'snapshots');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['snapshots'], headers, response);
        }
      }]));
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.backups = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      var url = util.safeUrl('droplets', id, 'backups');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['backups'], headers, response);
        }
      }]));
    };

    // id, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.neighbors = function() {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      var url = util.safeUrl('droplets', id, 'neighbors');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['droplets'], headers, response);
        }
      }]));
    };

    // id, required
    // callback, required
    Droplet.prototype.delete = function(id, callback) {
      var url = util.safeUrl('droplets', id);
      return this.client.delete(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    // name, required
    // callback, required
    Droplet.prototype.deleteByTag = function(name, callback) {
      var url = util.safeUrl('droplets');
      var params = { tag_name: encodeURIComponent(name) };
      return this.client.delete(url, params, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    // dropletId, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Droplet.prototype.listActions = function() {
      var dropletId = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      var url = util.safeUrl('droplets', dropletId, 'actions');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
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
    Droplet.prototype.getAction = function(dropletId, id, callback) {
      var url = util.safeUrl('droplets', dropletId, 'actions', id);
      return this.client.get(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['action'], headers, response);
        }
      });
    };

    // dropletId, required
    // parametersOrType, required
    // callback, required
    Droplet.prototype.action = function(dropletId, parametersOrType, callback) {
      var parameters;

      if(typeof parametersOrType === 'string') {
        parameters = { type: parametersOrType };
      } else {
        parameters = parametersOrType;
      }

      var url = util.safeUrl('droplets', dropletId, 'actions');
      return this.client.post(url, parameters, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['action'], headers, response);
        }
      });
    };

    // tagName, required
    // actionType, required
    // callback, required
    Droplet.prototype.actionByTag = function(tagName, actionType, callback) {
      var parameters = {
        tag_name: tagName,
        type: actionType
      };

      return this.client.post('/droplets/actions', parameters, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['actions'], headers, response);
        }
      });
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.shutdown = function(dropletId, callback) {
      this.action(dropletId, 'shutdown', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.powerOff = function(dropletId, callback) {
      this.action(dropletId, 'power_off', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.powerOn = function(dropletId, callback) {
      this.action(dropletId, 'power_on', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.powerCycle = function(dropletId, callback) {
      this.action(dropletId, 'power_cycle', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.reboot = function(dropletId, callback) {
      this.action(dropletId, 'reboot', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.enableBackups = function(dropletId, callback) {
      this.action(dropletId, 'enable_backups', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.disableBackups = function(dropletId, callback) {
      this.action(dropletId, 'disable_backups', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.passwordReset = function(dropletId, callback) {
      this.action(dropletId, 'password_reset', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.enableIPv6 = function(dropletId, callback) {
      this.action(dropletId, 'enable_ipv6', callback);
    };

    // dropletId, required
    // callback, required
    Droplet.prototype.enablePrivateNetworking = function(dropletId, callback) {
      this.action(dropletId, 'enable_private_networking', callback);
    };

    // dropletId, required
    // parametersOrSizeSlug, required keys: size string; optional keys: disk bool
    // callback, required
    Droplet.prototype.resize = function(dropletId, parametersOrSizeSlug, callback) {
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
    Droplet.prototype.rename = function(dropletId, parametersOrHostname, callback) {
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
    Droplet.prototype.snapshot = function(dropletId, parametersOrName, callback) {
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
    Droplet.prototype.restore = function(dropletId, parametersOrImageId, callback) {
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
    Droplet.prototype.rebuild = function(dropletId, parametersOrImage, callback) {
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
    Droplet.prototype.changeKernel = function(dropletId, parametersOrKernelId, callback) {
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

    return Droplet;
  })();

  module.exports = Droplet;
}).call(this);