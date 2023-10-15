
var Rcon = require('rcon');
const index = require("../../app.js")

function rconCommand(command, server, interaction) {
  
    const bot = index.Gbot;
    var conn = new Rcon(server.ip, parseInt(server.port), server.password);

    conn.on('auth', function() {
        interaction.reply({content: `Command sent.`, ephemeral: true});
        console.log("Authenticated");
        conn.send(command);
      }).on('response', function(str) {
        console.log("Response: " + str);
        if (str) {
           interaction.member.guild.channels.cache.get(interaction.channelId).send(str);
        }
      }).on('error', function(err) {
        interaction.reply({content: `There was an issue getting to the server.`, ephemeral: true});
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
module.exports = rconCommand;
