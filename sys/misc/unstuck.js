const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")


//  '(X=63826.73,Y=205449.89,Z=12326.91)'
function unstuck(agid, id, location) {

    var loc = location.replace(/[\(\)']+/g,'').split(',')
    var oldCoords = [];
    var offsets = [];
    for (var i = 0; i < loc.length; i++) {
        oldCoords.push(parseInt(loc[i].slice(2, -3)));
        var random = Math.floor(Math.random() * (500 - -500)) + -500;
        offsets.push(random);
    }
    var newLocation = `(X=${oldCoords[0]+offsets[0]},Y=${oldCoords[1]+offsets[1]},Z=${oldCoords[2]+2000})`;

    const dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG1) {
        return;
    }
    let servers = JSON.parse(dataG1.servers);
    rconCommandStandalone(`teleport ${agid} ${newLocation}`, servers[id-1]);


}
module.exports = unstuck;


