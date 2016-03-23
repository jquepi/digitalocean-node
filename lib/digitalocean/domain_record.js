(function() {
  var slice = [].slice,
    util = require('./util');

  var DomainRecord = (function() {
    function DomainRecord(client) {
      this.client = client;
    }

    // domainName, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    DomainRecord.prototype.list = function() {
      var domainName = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      var url = util.safeUrl('domains', domainName, 'domain_records');
      return this.client.get.apply(this.client, [url, {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('DomainRecord error: ' + status));
        } else {
          return callback(null, response['domain_records'], headers, response);
        }
      }]));
    };

    // domainName, rqeuired
    // id, required
    // callback, required
    DomainRecord.prototype.get = function(domainName, id, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.get(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('DomainRecord error: ' + status));
        } else {
          return callback(null, response['domain_record'], headers, response);
        }
      });
    };

    // domainName, required
    // attributes, required
    // callback, required
    DomainRecord.prototype.create = function(domainName, attributes, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records');
      return this.client.post(url, attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('DomainRecord error: ' + status));
        } else {
          return callback(null, response['domain_record'], headers, response);
        }
      });
    };

    // domainName, required
    // id, required
    // attributes, required
    // callback, required
    DomainRecord.prototype.update = function(domainName, id, attributes, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.put(url, attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('DomainRecord error: ' + status));
        } else {
          return callback(null, response['domain_record'], headers, response);
        }
      });
    };

    // domainName, required
    // id, required
    // callback, required
    DomainRecord.prototype.delete = function(domainName, id, callback) {
      var url = util.safeUrl('domains', domainName, 'domain_records', id);
      return this.client.delete(url, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('DomainRecord error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    return DomainRecord;
  })();

  module.exports = DomainRecord;
}).call(this);