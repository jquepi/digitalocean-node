(function() {
  var slice = [].slice;

  var DomainRecord = (function() {
    function DomainRecord(client) {
      this.client = client;
    }

    // domainName, required
    // page or query object, optional
    // perPage, optional
    // callback, required
    DomainRecord.prototype.list = function(domainName, callback) {
      var id = arguments[0],
          i,
          params = 2 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/domains/' + id + '/domain_records', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Droplet error: ' + status));
        } else {
          return callback(null, response['domain_records'], headers, response);
        }
      }]));
    };

    // domainName, rqeuired
    // id, required
    // callback, required
    DomainRecord.prototype.get = function(domainName, id, callback) {
      return this.client.get('/domains/' + domainName + '/domain_records/' + id, {}, function(err, status, response, headers) {
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
      return this.client.post('/domains/' + domainName + '/domain_records', attributes, function(err, status, response, headers) {
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
      return this.client.put('/domains/' + domainName + '/domain_records/' + id, attributes, function(err, status, response, headers) {
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
      return this.client.delete('/domains/' + domainName + '/domain_records/' + id, {}, function(err, status, response, headers) {
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
