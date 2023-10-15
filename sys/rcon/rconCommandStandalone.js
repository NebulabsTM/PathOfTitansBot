
var Rcon = require('rcon');
const index = require("../../app.js")

// var logchannel = client.channels.cache.get("1007049790623846485");
// logchannel.send(`Server: ${serverData.ip}\nCommand: ${command}`);


function rconCommandWebhook(command, server) {

    const bot = index.Gbot;
     var conn = new Rcon(server.ip, parseInt(server.port), server.password);

    conn.on('auth', function() {
        console.log("Authenticated");
        conn.send(command);
      }).on('response', function(str) {
        console.log("Webhook Response: " + str);
      }).on('error', function(err) {
        console.log("Error: " + err);
      }).on('end', function() {
        console.log("Connection closed");
      });

      try {
        conn.connect();
      } catch (e) {
        if (e instanceof TypeError) {
          // ignore TypeError
        } 
        else if(e instanceof RangeError) {
          // handle RangeError
        }
        else {
          // something else
        } 
      }



}
module.exports = rconCommandWebhook;
