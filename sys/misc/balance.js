// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

var SourceQuery = require('sourcequery');

function collect(data, server) {

    var dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (dataG1) {
        let servers = JSON.parse(dataG1.servers);

        var dataG2 = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.AlderonId);
        if (dataG2) {
            if (dataG2.discord_id !== 'None' && !dataG2.discord_id.includes('P')) {

                // Source Query
                var sq = new SourceQuery(1000); // 1000ms timeout
                sq.open(servers[server-1].ip, Port=servers[server-1].port);

                sq.getPlayers(function(err, players){

                    if (players) {
                        console.log(players);
                        let result = players.find(obj => obj.name === data.PlayerName);
                        rconCommandStandalone(`whisper ${data.PlayerName} :pot: You have ${dataG2.tokens} ERA Coins and :marks:${result.score}`, servers[server-1]);
                        return;
                    }

                });

            } else {
                rconCommandStandalone(`whisper ${data.PlayerName} :pot: Please link your Alderon account to our Discord by using /link in our Discord Server.`, servers[server-1]);
                return;
            }
        } else {
            rconCommandStandalone(`whisper ${data.PlayerName} for some reason, you where not found in the servers database. Please log out and back in and try again.`, servers[server-1]);
            return;
        }





    }
        
}


module.exports = collect;