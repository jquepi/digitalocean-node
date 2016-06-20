(function() {
  var slice = [].slice;

  module.exports.safeUrl = function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(accum, fragment) {
      return accum + '/' + encodeURIComponent(fragment);
    }, '');
  };

  module.exports.extractListArguments = function(args, countPrependedArgs) {
    var startIndex, endIndex, id, params, callback;

    startIndex = countPrependedArgs;
    if (2 <= args.length) {
      endIndex = args.length - 1;
      params = slice.call(args, startIndex, endIndex);
    } else {
      endIndex = countPrependedArgs;
      params = [];
    }

    if (countPrependedArgs > 0) {
      id = args[0];
      endIndex += 1;
      if (typeof(args[endIndex]) === 'function') {
        callback = args[endIndex];
      }
    }

    return {
      identifier: id,
      callback: callback,
      params: params
    };
  };
}).call(this);
