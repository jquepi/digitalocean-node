var digitalocean = require('digitalocean');
var client = digitalocean.client('TOKEN');

var attributes = {
  name: 'aquarius-h20',
  region: 'nyc1',
  size: '1gb',
  image: 'ubuntu-14-04-x64'
};

client.droplets.create(attributes, function(err, droplet) {
  if (err === null) {
    pollUntilDone(droplet.id, function() {
      console.log("We have a droplet: " + droplet.id + "!");
    });
  } else {
    console.log("error requesting a droplet");
  }
});

// Poll for non-locked state every 10s
function pollUntilDone(id, done) {
  client.droplets.get(id, function(err, droplet) {
    if (!err && droplet.locked === false) {
      // we're done!
      done.call();
    } else if (!err && droplet.locked === true) {
      // back off 10s more
      setTimeout(function() {
        pollUntilDone(id, done);
      }, (10 * 1000));
    } else {
      pollUntilDone(id, done);
    }
  });
}