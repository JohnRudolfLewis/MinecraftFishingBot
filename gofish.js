var mc = require('minecraft-protocol');
var moment = require('moment');
var start = moment();
var fishCount = 0;

if(process.argv.length < 4 || process.argv.length > 6) {
  console.log("Usage : node echo.js <host> <port> [<name>] [<password>]");
  process.exit(1);
}

var client = mc.createClient({
  version: '1.10',
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  username: process.argv[4] ? process.argv[4] : "echo",
  password: process.argv[5]
});

client.on('connect', function() {
  console.info('connected');
  // a few seconds after logging in, use the fishing rod in the main hand
  setTimeout(useItem, 5000, 0);
});

client.on('disconnect', function(packet) {
  console.log('disconnected: '+ packet.reason);
  process.exit(1);
});

client.on('end', function(err) {
  console.log('Connection lost');
  process.exit(1);
});

// This may change in the future, but I deduced that when a fishing bobber does its thing
// when a fish is on the hook, the server sends a 'world_particles' packet with a particleId
// of 4. So time to try to catch the fist.
client.on('world_particles', function(packet) {
  if (packet.particleId == 4) {
    console.log('fish on');
    // use the fishing rod to attempt to catch the fish
    useItem();
    // a few moments later, use it again to re-cast
    setTimeout(useItem, 500);
    fishCount++;
  }
});

// respond to chat messages about how the fishing has been
client.on('chat', function(packet) {
  var jsonMsg = JSON.parse(packet.message);
  if(jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
    var username = jsonMsg.with[0].text;
    var msg = jsonMsg.with[1];
    if(username === client.username) return;
    if (msg == 'how\'s the fishing?') {
      howsFishing();
    }
  }
});

function useItem() {
  client.write('use_item', { hand : 0 });
}

function howsFishing() {
  client.write('chat', {message: 'I\'ve been fishing for about ' + start.fromNow(true) + ' and have caught ' + fishCount + ' items.'});
}
