// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');

function removeGameserver(interaction, server) {


    const data = db.prepare(`SELECT servers FROM servers WHERE guildId = '${interaction.guildId}';`).get();

    if (data) {

        let servers = JSON.parse(data.servers);
        index = server-1;
        servers.splice(index, 1);
        let new_servers = JSON.stringify(servers);

        const dataX = db.prepare(`UPDATE servers SET servers = ? WHERE guildId = ?;`).run(new_servers, interaction.guildId);
        interaction.reply({content: `${interaction.user} Server has been removed. Type /listgameserver to view your servers.`, ephemeral: true});



    }

}

module.exports = removeGameserver;