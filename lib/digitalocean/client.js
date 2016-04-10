(function() {
  // External Dependencies
  var url = require('url'),
    request = require('request'),
    Promise = require('bluebird'),
    deepExtend = require('deep-extend');

  // API sections
  var Account = require('./account'),
    Action = require('./action'),
    Domain = require('./domain'),
    Droplet = require('./droplet'),
    FloatingIp = require('./floating_ip'),
    Image = require('./image'),
    Region = require('./region'),
    Size = require('./size'),
    Tag = require('./tag');

  // Utilities
  var slice = [].slice,
    DigitalOceanError = require('./error');

  var Client = (function() {
    // token, required, string
    // options, optional
    function Client(token, options) {
      this.token = token;
      this.options = options;

      this.requestOptions = this.options && this.options.requestOptions || {};
      this.request = this.options && this.options.request || request;
      this.promise = this.options && this.options.promise || Promise;

      var version = require('../../package.json').version;
      this.requestDefaults = {
        headers: {
          'User-Agent': 'digitalocean-node/' + version,
          'Content-Type': 'application/json'
        }
      };

      this.version = 'v2';
      this.host = 'api.digitalocean.com';

      this.account = new Account(this);
      this.actions = new Action(this);
      this.domains = new Domain(this);
      this.floatingIps = new FloatingIp(this);
      this.images = new Image(this);
      this.droplets = new Droplet(this);
      this.regions = new Region(this);
      this.sizes = new Size(this);
      this.tags = new Tag(this);
    }

    Client.prototype._buildUrl = function(path, urlParams) {
      if (path == null) {
        path = '/';
      }

      if (urlParams == null) {
        urlParams = {};
      }

      var urlFromPath = url.parse(this.version + path);

      return url.format({
        protocol: urlFromPath.protocol || this.options && this.options.protocol || "https:",
        auth: urlFromPath.auth || (this.token && this.token.username && this.token.password ? this.token.username + ":" + this.token.password : ''),
        hostname: urlFromPath.hostname || this.options && this.options.hostname || this.host,
        port: urlFromPath.port || this.options && this.options.port,
        pathname: urlFromPath.pathname,
        query: urlParams
      });
    };

    // Returns a function that curries the callback to handle the response from
    // `request`. The returned function has an interface of: `function(err, res, body)`.
    //
    // successStatuses, required, number or array of numbers
    // successRootKeys, required, string or array of strings
    // callback, required, function
    Client.prototype._buildrequestPromiseHandler = function(successStatuses, successRootKeys, resolve, reject) {
      if (typeof successStatuses === 'number') {
        successStatuses = [successStatuses];
      }

      if (typeof successRootKeys === 'string') {
        successRootKeys = [successRootKeys];
      }

      return function(err, res, body) {
        if (err) {
          return reject(err);
        }

        // Handle errors on DO's side (5xx level)
        var statusCodeLevel = Math.floor(res.statusCode / 100);
        if (statusCodeLevel === 5) {
          return reject(new DigitalOceanError('Error ' + res.statusCode, res.statusCode, res.headers));
        }

        // Handle improperly returned reponses (e.g. html or something else bizarre)
        if (typeof body === 'string') {
          try {
            body = JSON.parse(body || '{}');
          } catch (jsonParseError) {
            return reject(jsonParseError);
          }
        }

        // Handle validation errors (4xx level)
        if (body.message && statusCodeLevel === 4) {
          return reject(new DigitalOceanError(body.message, res.statusCode, res.headers, body));
        }

        // Handle an unexpcted response code
        if (successStatuses.indexOf(res.statusCode) < 0) {
          return reject(new Error('Unexpected reponse code: ' + res.statusCode));
        }

        // Find the first key from the body object in successRootKeys
        var data = {};
        for (var i = 0; i < successRootKeys.length; i++) {
          var key = successRootKeys[i];
          if (body[key]) {
            data = body[key];
            break;
          }
        }

        // Append response data under a special key in the object
        data._digitalOcean = {
          statusCode: res.statusCode,
          body: body,
          headers: res.headers
        };
        return resolve(data);
      };
    };

    Client.prototype._callbackOrPromise = function(options, overrideOptions, successStatuses, successRootKeys, callback) {
      // Use a hierarchy of options to provide overrides:
      //  1. this.requestDefaults (specified by client)
      //  2. this.requestOptions  (specified by user at client initialization)
      //  3. options              (specfied by client per call type)
      //  4. overrideOptions      (specified by user at call time)
      var requestOptions = deepExtend(this.requestDefaults, this.requestOptions, options, overrideOptions);

      var self = this;
      var deferred = new this.promise(function(resolve, reject) {
        self.request(
          requestOptions,
          self._buildrequestPromiseHandler(successStatuses, successRootKeys, resolve, reject)
        );
      });

      if (callback) {
        // If a callback is provided, translate it to a Promise (to ensure
        // it's called outside of the promise stack, call via timeout)
        deferred
          .then(function(response) {
            setTimeout(function() {
              callback(
                null,
                response,
                response._digitalOcean.headers,
                response._digitalOcean.body
              );
            }, 0);
          })
          .catch(function(error) {
            setTimeout(function() {
              callback(error);
            }, 0);
          });
      }

      return deferred;
    };

    // path, required, string
    // options, required
    // page or query object, optional
    // perPage, optional
    // successStatuses, required, number or array of numbers
    // successRootKeys, required, string or array of strings
    // callback, required, function
    Client.prototype.get = function() {
      var i;
      var path = arguments[0],
          options = arguments[1],
          params = 4 <= arguments.length ? slice.call(arguments, 2, i = arguments.length - 3) : (i = 2, []),
          successStatuses = arguments[i++],
          successRootKeys = arguments[i++],
          callback = arguments[i++];

      var pageOrQuery = params[0],
          perPage = params[1],
          query = null;
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

      return this._callbackOrPromise(
        {
          uri: this._buildUrl(path, query),
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        },
        options,
        successStatuses,
        successRootKeys,
        callback
      );
    };

    Client.prototype._makeRequestWithBody = function(type, path, content, options, successStatuses, successRootKeys, callback) {
      if ((callback == null) && typeof successRootKeys === 'function') {
        // if `options` isn't passed, shift arguments back by one and set
        // default hash for options
        callback = successRootKeys;
        successRootKeys = successStatuses;
        successStatuses = options;
        options = {};
      }

      return this._callbackOrPromise(
        {
          uri: this._buildUrl(path, options.query),
          method: type,
          headers: {
            'Authorization': 'Bearer ' + this.token
          },
          body: JSON.stringify(content)
        },
        options,
        successStatuses,
        successRootKeys,
        callback
      );
    };

    // path, required, string
    // content, required, object
    // options, optional, object
    // successStatuses, required, number or array of numbers
    // successRootKeys, required, string or array of strings
    // callback, required, function
    Client.prototype.post = function(path, content, options, successStatuses, successRootKeys, callback) {
      return this._makeRequestWithBody('POST', path, content, options, successStatuses, successRootKeys, callback);
    };

    // path, required, string
    // content, optional, object
    // options, optional, object
    // successStatuses, required, number or array of numbers
    // successRootKeys, required, string or array of strings
    // callback, required, function
    Client.prototype.patch = function(path, content, options, successStatuses, successRootKeys, callback) {
      return this._makeRequestWithBody('PATCH', path, content, options, successStatuses, successRootKeys, callback);
    };

    // path, required, string
    // content, optional, object
    // options, optional, object
    // successStatuses, required, number or array of numbers
    // successRootKeys, required, string or array of strings
    // callback, required, function
    Client.prototype.put = function(path, content, options, successStatuses, successRootKeys, callback) {
      return this._makeRequestWithBody('PUT', path, content, options, successStatuses, successRootKeys, callback);
    };

    // path, required, string
    // content, optional, object
    // options, optional, object
    // successStatuses, required, number or array of numbers
    // successRootKeys, required, string or array of strings
    // callback, required, function
    Client.prototype.delete = function(path, content, options, successStatuses, successRootKeys, callback) {
      return this._makeRequestWithBody('DELETE', path, content, options, successStatuses, successRootKeys, callback);
    };

    return Client;
  })();

  module.exports = function(token, options) {
    return new Client(token, options);
  };
}).call(this);