// External Dependencies
var url = require('url'),
  request = require('request'),
  deepExtend = require('deep-extend');

// API sections
var Account = require('./account'),
  Action = require('./action'),
  Domain = require('./domain'),
  DomainRecord = require('./domain_record'),
  Droplet = require('./droplet'),
  DropletAction = require('./droplet_action'),
  FloatingIp = require('./floating_ip'),
  FloatingIpAction = require('./floating_ip_action'),
  Image = require('./image'),
  ImageAction = require('./image_action'),
  Region = require('./region'),
  Size = require('./size'),
  SshKey = require('./ssh_key');

// Utilities
var slice = [].slice,
  DigitalOceanError = require('./error');

Client = (function() {
  // token, required, string
  // options, optional
  function Client(token, options) {
    this.token = token;
    this.options = options;

    this.requestOptions = this.options && this.options.requestOptions || {};
    this.request = this.options && this.options.request || request;
    this.requestDefaults = {
      headers: {
        'User-Agent': 'digitalocean-node/0.3.0',
        'Content-Type': 'application/json'
      }
    };

    this.version = 'v2';
    this.host = 'api.digitalocean.com';

    this.account = new Account(this);
    this.actions = new Action(this);
    this.domains = new Domain(this);
    this.domainRecords = new DomainRecord(this);
    this.floatingIps = new FloatingIp(this);
    this.floatingIpActions = new FloatingIpAction(this);
    this.images = new Image(this);
    this.imageActions = new ImageAction(this);
    this.sshKeys = new SshKey(this);
    this.droplets = new Droplet(this);
    this.dropletActions = new DropletAction(this);
    this.regions = new Region(this);
    this.sizes = new Size(this);
  }

  Client.prototype._buildRequestOptions = function(params1, params2) {
    return deepExtend(this.requestDefaults, this.requestOptions, params1, params2);
  };

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
  // `request`.
  Client.prototype._handleError = function(callback) {
    return function(err, res, body) {
      if (err) {
        return callback(err);
      }

      if (Math.floor(res.statusCode / 100) === 5) {
        return callback(new DigitalOceanError('Error ' + res.statusCode, res.statusCode, res.headers));
      }

      if (typeof body === 'string') {
        try {
          body = JSON.parse(body || '{}');
        } catch (_error) {
          err = _error;
          return callback(err);
        }
      }

      var code = res.statusCode;
      if (body.message && (code === 400 || code === 401 || code === 403 || code === 404 || code === 410 || code === 422)) {
        return callback(new DigitalOceanError(body.message, res.statusCode, res.headers, body));
      }

      return callback(null, res.statusCode, body, res.headers);
    }
  };

  // path, required, string
  // options, required
  // page or query object, optional
  // perPage, optional
  // callback, required
  Client.prototype.get = function() {
    var i;
    var path = arguments[0],
        options = arguments[1],
        params = 4 <= arguments.length ? slice.call(arguments, 2, i = arguments.length - 1) : (i = 2, []),
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

    return this.request(this._buildRequestOptions({
        uri: this._buildUrl(path, query),
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }, options),
      this._handleError(callback)
    );
  };

  Client.prototype._makeRequestWithBody = function(type, path, content, options, callback) {
    if ((callback == null) && typeof options === 'function') {
      callback = options;
      options = {};
    }

    return this.request(this._buildRequestOptions(
        {
          uri: this._buildUrl(path, options.query),
          method: type,
          body: JSON.stringify(content)
        },
        options
      ),
      this._handleError(callback)
    );
  };

  // path, required, string
  // content, required, object
  // options, optional, object
  // callback, required, function
  Client.prototype.post = function(path, content, options, callback) {
    return this._makeRequestWithBody('POST', path, content, options, callback);
  };

  // path, required, string
  // content, optional, object
  // options, optional, object
  // callback, required, function
  Client.prototype.patch = function(path, content, options, callback) {
    return this._makeRequestWithBody('PATCH', path, content, options, callback);
  };

  // path, required, string
  // content, optional, object
  // options, optional, object
  // callback, required, function
  Client.prototype.put = function(path, content, options, callback) {
    return this._makeRequestWithBody('PUT', path, content, options, callback);
  };

  // path, required, string
  // content, optional, object
  // options, optional, object
  // callback, required, function
  Client.prototype.delete = function(path, content, options, callback) {
    return this._makeRequestWithBody('PUT', path, content, options, callback);
  };

  return Client;
})();

module.exports = function(token, options) {
  return new Client(token, options);
};
