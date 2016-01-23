(function() {
  var digitalocean = module.exports = {
    client: require('./digitalocean/client'),
    account: require('./digitalocean/account'),
  };
}).call(this);
