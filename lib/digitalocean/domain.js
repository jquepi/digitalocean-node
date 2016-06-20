(function() {
  var slice = [].slice,
    util = require('./util');

  var Domain = (function() {
    function Domain(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, optional
    Domain.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/domains', {}].concat(slice.call(args.params), [200, 'domains', args.callback]));
    };

    // attributes, required
    // callback, optional
    Domain.prototype.create = function(attributes, callback) {
      return this.client.post('/domains', attributes, 201, 'domain', callback);
    };

    // name, required
    // callback, optional
    Domain.prototype.get = function(name, callback) {
      var url = util.safeUrl('domains', name);
      return this.client.get(url, {}, 200, 'domain', callback);
    };

    // name, required
    // callback, optional
    Domain.prototype.delete = function(name, callback) {
      var url = util.safeUrl('domains', name);
      return this.client.delete(url, {}, 204, [], callback);
    };

    // domainName, required
    // page or query object, optional
    // perPage, optional
    // callback, optional
    Domain.prototype.listRecords = function() {
      var args = util.extractListArguments(arguments, 1);
      var url = util.safeUrl('domains', args.identifier, 'domain_records');

      return this.client.get.apply(this.client, [url, {}].concat(slice.call(args.params), [200, 'domain_records', args.callback]));
    };

    // domainName, rqeuired
    // id, required
    // callback, optional
    Domain.prototype.getRecord = function(domainName, id, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.get(url, {}, 200, 'domain_record', callback);
    };

    // domainName, required
    // attributes, required
    // callback, optional
    Domain.prototype.createRecord = function(domainName, attributes, callback) {
      // console.log(callback);
      var url = util.safeUrl('domains', domainName, 'domain_records');
      return this.client.post(url, attributes, 201, 'domain_record', callback);
    };

    // domainName, required
    // id, required
    // attributes, required
    // callback, optional
    Domain.prototype.updateRecord = function(domainName, id, attributes, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.put(url, attributes, 200, 'domain_record', callback);
    };

    // domainName, required
    // id, required
    // callback, optional
    Domain.prototype.deleteRecord = function(domainName, id, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    return Domain;
  })();

  module.exports = Domain;
}).call(this);