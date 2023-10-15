// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")


function removeLink(data, server) {

        // Database handling
        const dataG = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('1049506605827362916');
        if (dataG) {
            let servers = JSON.parse(dataG.servers);

            const dataG1 = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.AlderonId);
            console.log(dataG1);
            if (dataG1) {
                db.prepare(`UPDATE users SET discord_id = ? WHERE alderon_id = ?;`).run('None', data.AlderonId);
                rconCommandStandalone(`whisper ${data.PlayerName} Your account has been unlinked.`, servers[server-1]);
            } else {
                rconCommandStandalone(`whisper ${data.PlayerName} For some reason, you are not in the database. Please leave and join the server and try again. If that fails, please notify an admin.`, servers[server-1]);
            }

        }
}

module.exports = removeLink;