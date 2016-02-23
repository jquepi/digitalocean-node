(function() {

  // External Dependencies
  var request     = require('request'),
      url         = require('url'),
      deepExtend  = require('deep-extend');

  // API sections
  var Account = require('./account');
  var Action = require('./action');
  var Domain = require('./domain');
  var Droplet = require('./droplet');
  var DropletAction = require('./droplet_action');
  var FloatingIp = require('./floating_ip');
  var Image = require('./image');
  var ImageAction = require('./image_action');
  var Region = require('./region');
  var Size = require('./size');
  var SshKey = require('./ssh_key');

  // Utilities
  var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) {
          child[key] = parent[key];
        }
      }

      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    },
    hasProp = {}.hasOwnProperty,
      bind = function(fn, me) {
      return function() {
          return fn.apply(me, arguments);
      };
    },
    slice = [].slice;

  // Client errors
  var HttpError = (function(superClass) {
    extend(HttpError, superClass);

    function HttpError(message, statusCode, headers, body) {
      this.message = message;
      this.statusCode = statusCode;
      this.headers = headers;
      this.body = body;
    }
    return HttpError;
  })(Error);

  // Set up main client class
  Client = (function() {
    function Client(token, options) {
      this.token = token;
      this.options = options;
      this.limit = bind(this.limit, this);
      this.requestOptions = bind(this.requestOptions, this);
      this.request = this.options && this.options.request || request;
      this.version = 'v2';
      this.requestDefaults = {
        headers: {
          'User-Agent': 'digitalocean-node/0.3.0'
        }
      };

      this.account = new Account(this);
      this.actions = new Action(this);
      this.domains = new Domain(this);
      this.floatingIps = new FloatingIp(this);
      this.images = new Image(this);
      this.imageActions = new ImageAction(this);
      this.sshKeys = new SshKey(this);
      this.droplets = new Droplet(this);
      this.dropletActions = new DropletAction(this);
      this.regions = new Region(this);
      this.sizes = new Size(this);
    }

    Client.prototype.requestOptions = function(params1, params2) {
      return deepExtend(this.requestDefaults, params1, params2);
    };

    // URL builder
    Client.prototype.buildUrl = function(path, pageOrQuery, perPage) {
      var _url, query, separator, urlFromPath;

      if (path == null) {
        path = '/';
      }

      if ((pageOrQuery != null) && typeof pageOrQuery === 'object') {
        query = pageOrQuery;
      } else {
        query = {};
        if (pageOrQuery != null) {
          query.page = pageOrQuery;
        }
        if (perPage != null) {
          query.per_page = perPage;
        }
      }

      urlFromPath = url.parse(this.version + path);

      _url = url.format({
        protocol: urlFromPath.protocol || this.options && this.options.protocol || "https:",
        auth: urlFromPath.auth || (this.token && this.token.username && this.token.password ? this.token.username + ":" + this.token.password : ''),
        hostname: urlFromPath.hostname || this.options && this.options.hostname || "api.digitalocean.com",
        port: urlFromPath.port || this.options && this.options.port,
        pathname: urlFromPath.pathname,
        query: query
      });

      return _url;
    };

    Client.prototype.handleError = function(res, body, callback) {
      var err, ref;
      if (Math.floor(res.statusCode / 100) === 5) {
        return callback(new HttpError('Error ' + res.statusCode, res.statusCode, res.headers));
      }
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body || '{}');
        } catch (_error) {
          err = _error;
          return callback(err);
        }
      }
      if (body.message && ((ref = res.statusCode) === 400 || ref === 401 || ref === 403 || ref === 404 || ref === 410 || ref === 422)) {
        return callback(new HttpError(body.message, res.statusCode, res.headers, body));
      }
      return callback(null, res.statusCode, body, res.headers);
    };

    Client.prototype.get = function() {
      var i;
      var path = arguments[0],
          options = arguments[1],
          params = 4 <= arguments.length ? slice.call(arguments, 2, i = arguments.length - 1) : (i = 2, []),
          callback = arguments[i++];

      return this.request(this.requestOptions({
        uri: this.buildUrl.apply(this, [path].concat(slice.call(params))),
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }, options), (function(_this) {
        return function(err, res, body) {
          if (err) {
            return callback(err);
          }
          return _this.handleError(res, body, callback);
        };
      })(this));
    };

    Client.prototype.post = function(path, content, options, callback) {
      var reqDefaultOption, reqOpt;
      if ((callback == null) && typeof options === 'function') {
        callback = options;
        options = {};
      }
      reqDefaultOption = {
        uri: this.buildUrl(path, options.query),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (content) {
        reqDefaultOption.body = JSON.stringify(content);
      }
      reqOpt = this.requestOptions(deepExtend(reqDefaultOption, options));
      return this.request(reqOpt, (function(_this) {
        return function(err, res, body) {
          if (err) {
            return callback(err);
          }
          return _this.handleError(res, body, callback);
        };
      })(this));
    };

    Client.prototype.patch = function(path, content, callback) {
      return this.request(this.requestOptions({
        uri: this.buildUrl(path),
        method: 'PATCH',
        body: JSON.stringify(content),
        headers: {
          'Content-Type': 'application/json'
        }
      }), (function(_this) {
        return function(err, res, body) {
          if (err) {
            return callback(err);
          }
          return _this.handleError(res, body, callback);
        };
      })(this));
    };

    Client.prototype.put = function(path, content, options, callback) {
      if (!callback && options) {
        callback = options;
        options = {
          'Content-Type': 'application/json'
        };
      }
      return this.request(this.requestOptions({
        uri: this.buildUrl(path),
        method: 'PUT',
        body: JSON.stringify(content),
        headers: options
      }), (function(_this) {
        return function(err, res, body) {
          if (err) {
            return callback(err);
          }
          return _this.handleError(res, body, callback);
        };
      })(this));
    };

    Client.prototype.delete = function(path, content, callback) {
      return this.request(this.requestOptions({
        uri: this.buildUrl(path),
        method: 'DELETE',
        body: JSON.stringify(content),
        headers: {
          'Content-Type': 'application/json'
        }
      }), (function(_this) {
        return function(err, res, body) {
          if (err) {
            return callback(err);
          }
          return _this.handleError(res, body, callback);
        };
      })(this));
    };

    return Client;
  })();

  module.exports = function() {
    var credentials, token;
    token = arguments[0], credentials = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Client, [token].concat(slice.call(credentials)), function(){});
  };

}).call(this);
