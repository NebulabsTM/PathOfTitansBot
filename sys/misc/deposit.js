// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

const index = require("../../app.js"); //


var SourceQuery = require('sourcequery');

function deposit(data, server) {


    const client = index.Gbot; // 
    var moneyLogChannel = client.channels.cache.get(`1082689334169325660`); // 

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
                        let result = players.find(obj => obj.name === data.PlayerName);
                    
                        let args = data.Message.split(' ');
    

                        let amt = Math.abs(parseInt(args[1]));

                        if (amt <= 0) {
                            rconCommandStandalone(`whisper ${data.PlayerName} :pot: You can't deposit a negative amount.`, servers[server-1]);
                            return;
                        }

                        if (amt > result.score) {
                            rconCommandStandalone(`whisper ${data.PlayerName} :pot: You do not have :marks:${amt}. Right now you only have :marks:${result.score}`, servers[server-1]);
                            return;
                        }
                        if (args.length !== 2) {
                            rconCommandStandalone(`whisper ${data.PlayerName} :pot: Invalid syntax (ex: !deposit 100)`, servers[server-1]);
                            return;
                        }
                        if (Number.isNaN(amt)) {
                            rconCommandStandalone(`whisper ${data.PlayerName} :pot: Invalid syntax (ex: !deposit 100)`, servers[server-1]);
                            return;
                        }


                        // Possible fix
                        if (amt > 1000000000) {
                            return;
                        }


                        rconCommandStandalone(`removemarks ${data.PlayerName} ${amt}`, servers[server-1]);
                        rconCommandStandalone(`whisper ${data.PlayerName} deposited ${amt} into ${amt} ERA Coins`, servers[server-1]);
                        db.prepare(`UPDATE users SET tokens = tokens + ? WHERE alderon_id = ?;`).run(amt, data.AlderonId);
                        
                        moneyLogChannel.send({ content: `\`\`\`diff\n+ ${data.PlayerName} converted ${amt} Marks into ${amt} ERA Coins.\n+ Era Tokens Before: ${dataG2.tokens}\n+ Era Tokens After: ${dataG2.tokens + amt}\n- Marks Before: ${result.score}\n- Marks After: ${result.score - amt}\n\`\`\`` });
                        return;
                    }


                });

            } else {
                rconCommandStandalone(`whisper ${data.PlayerName} :pot: Please link your Alderon account to our Discord by using /link in our Discord Server.`, servers[server-1]);
                return;
            }
        } else {
            rconCommandStandalone(`whisper ${data.PlayerName} :pot: for some reason, you where not found in the servers database. Please log out and back in and try again.`, servers[server-1]);
            return;
        }





    }
        
}


module.exports = deposit;