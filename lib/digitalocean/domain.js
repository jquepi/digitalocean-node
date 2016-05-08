(function() {
  var slice = [].slice,
    util = require('./util');

  var Domain = (function() {
    function Domain(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    Domain.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/domains', {}].concat(slice.call(params), [200, 'domains', callback]));
    };

    // attributes, required
    // callback, required
    Domain.prototype.create = function(attributes, callback) {
      return this.client.post('/domains', attributes, 201, 'domain', callback);
    };

    // name, required
    // callback, required
    Domain.prototype.get = function(name, callback) {
      var url = util.safeUrl('domains', name);
      return this.client.get(url, {}, 200, 'domain', callback);
    };

    // name, required
    // callback, required
    Domain.prototype.delete = function(name, callback) {
      var url = util.safeUrl('domains', name);
      return this.client.delete(url, {}, 204, [], callback);
    };

    // domainName, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    Domain.prototype.listRecords = function() {
      var domainName = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      var url = util.safeUrl('domains', domainName, 'domain_records');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [200, 'domain_records', callback]));
    };

    // domainName, rqeuired
    // id, required
    // callback, required
    Domain.prototype.getRecord = function(domainName, id, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.get(url, {}, 200, 'domain_record', callback);
    };

    // domainName, required
    // attributes, required
    // callback, required
    Domain.prototype.createRecord = function(domainName, attributes, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records');
      return this.client.post(url, attributes, 201, 'domain_record', callback);
    };

    // domainName, required
    // id, required
    // attributes, required
    // callback, required
    Domain.prototype.updateRecord = function(domainName, id, attributes, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.put(url, attributes, 200, 'domain_record', callback);
    };

    // domainName, required
    // id, required
    // callback, required
    Domain.prototype.deleteRecord = function(domainName, id, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    return Domain;
  })();

  module.exports = Domain;
}).call(this);