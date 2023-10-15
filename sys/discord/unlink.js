// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');


function unlink(interaction, name) {

    if (name.includes('@')) {
        name = name.replace(/[^0-9]/g, '');
    }

    console.log(name);
    const dataS1 = db.prepare(`UPDATE users SET discord_id = ? WHERE discord_id = ? OR alderon_name = ? OR alderon_id = ?;`).run('None', name, name, name);
    if (dataS1.changes == 0) {
        interaction.reply({content: `${interaction.user} User was not found in the database. User might not be linked.`, ephemeral: false});
        return;
    } else {
        interaction.reply({content: `${interaction.user} Unlinked <@${name}>.`, ephemeral: false});
        return;
    }
                

}

module.exports = unlink;