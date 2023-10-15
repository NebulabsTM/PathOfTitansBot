// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

function grow(data, server) {

    let seasons = {
        wet : {
            Rain: '60',
            ClearSky: '20',
            Snow: '10',
            Mist: '10'
        },
        dry : {
            Rain: '20',
            ClearSky: '60',
            Snow: '10',
            Mist: '10'
        }
    }



    const dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG1) {
        return;
    }






    
}


module.exports = grow;