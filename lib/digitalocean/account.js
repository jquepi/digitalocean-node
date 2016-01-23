(function() {
  var slice = [].slice;

  var Account = (function() {
    function Account(client) {
      this.client = client;
    }

    Account.prototype.profile = function(data) {
      return Object.keys(data).forEach((function(_this) {
        return function(e) {
          return _this[e] = data[e];
        };
      })(this));
    };

    Account.prototype.get = function(callback) {
      return this.client.get('/account', {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Account error: ' + status));
        } else {
          return callback(null, response['account'], headers, response);
        }
      });
    };

    return Account;
  })();

  module.exports = Account;
}).call(this);
