// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")


function confirmLink(data, server) {

        // Database handling
        const dataG = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
        if (dataG) {
            let servers = JSON.parse(dataG.servers);

            const dataG1 = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.AlderonId);
            console.log(dataG1);
            if (dataG1) {
                if (dataG1.discord_id.includes('P')) { // Change this after one week please..
                    db.prepare(`UPDATE users SET discord_id = ?, tokens = tokens + 100000 WHERE alderon_id = ?;`).run(dataG1.discord_id.replace('P',''), data.AlderonId);
                    rconCommandStandalone(`whisper ${data.PlayerName} :sarcodance: Succesfully linked your account! If you want to get unlinked, you need to ask a staff member.`, servers[server-1])
                } else {
                    if (dataG1.discord_id == 'None') {
                        rconCommandStandalone(`whisper ${data.PlayerName} :AG: No pending Discord link. Go into our Discord and use /link to link your Discord ID.`, servers[server-1]);
                    } else {
                        rconCommandStandalone(`whisper ${data.PlayerName} :AG: Your account is already linked. If you want to get unlinked, you need to ask a staff member.`, servers[server-1]);
                    }
                }
            } else {
                rconCommandStandalone(`whisper ${data.PlayerName} :AG: For some reason, you are not in the database. Please leave and join the server and try again. If that fails, please notify an admin.`, servers[server-1])
            }

        }
}

module.exports = confirmLink;