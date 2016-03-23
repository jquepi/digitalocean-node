(function() {
  module.exports.safeUrl = function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(accum, fragment) {
      return accum + '/' + encodeURIComponent(fragment);
    }, '');
  };
}).call(this);