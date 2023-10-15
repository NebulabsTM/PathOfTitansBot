var Rcon = require('rcon');
const index = require("../../app.js")
const rconCommand = require("../rcon/rconCommand.js")
const db = require('better-sqlite3')('sys/db/Mesozoic.db');


function cmdCommand(command, server, interaction) {

  
  const data = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get(interaction.guildId);
  if (data) {
      let servers = JSON.parse(data.servers);
      rconCommand(command, servers[server-1], interaction)
      if (server == 0) {
        for (let index = 0; index < servers.length; index++) {
          rconCommand(command, servers[index], interaction)
        }
      }
  }


}
module.exports = cmdCommand;
