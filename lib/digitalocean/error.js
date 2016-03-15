(function() {
  var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) {
          child[key] = parent[key];
        }
      }

      function Constructor() {
        this.constructor = child;
      }
      Constructor.prototype = parent.prototype;
      child.prototype = new Constructor();
      child.__super__ = parent.prototype;
      return child;
    },
    hasProp = {}.hasOwnProperty;

  var DigitalOceanError = (function(superClass) {
    extend(DigitalOceanError, superClass);

    function DigitalOceanError(message, statusCode, headers, body) {
      this.message = message;
      this.statusCode = statusCode;
      this.headers = headers;
      this.body = body;
    }
    return DigitalOceanError;
  })(Error);

  module.exports = DigitalOceanError;
}).call(this);