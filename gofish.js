var mc = require('minecraft-protocol');

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
  setTimeout(useItem, 5000, 0);
});
client.on('disconnect', function(packet) {
  console.log('disconnected: '+ packet.reason);
});
client.on('end', function(err) {
  console.log('Connection lost');
});

client.on('world_particles', function(packet) {
  if (packet.particleId == 4) {
    console.log('fish on');
    useItem();
    setTimeout(useItem, 500);
  }
});

function setQuickBarSlot(slot) {
  client.write('held_item_slot', { slotId: slot });
}

function useItem() {
  client.write('use_item', { hand : 0 });
}
