

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function strikeAdd(interaction, name, reason, category) {

    if (name.includes('@')) {
        name = name.replace(/[^0-9]/g, '');
        var dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(name);
        if (dataG1) {
            db.prepare(`INSERT INTO strikes (alderon_id, reason, category, date) VALUES (?, ?, ?, ?);`).run(dataG1.alderon_id, reason, category, Math.floor(Date.now() / 1000));
            interaction.reply({content: `${interaction.user} Added a strike to ${dataG1.alderon_name} \`${dataG1.alderon_id}\`.`, ephemeral: false});
            return;
        } else {
            interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: false});
            return;
        }

    } else {
        const dataG1 = db.prepare(`SELECT * FROM users WHERE alderon_name = ? OR alderon_id = ?;`).get(name, name);
        if (dataG1) {
            db.prepare(`INSERT INTO strikes (alderon_id, reason, category, date) VALUES (?, ?, ?, ?);`).run(dataG1.alderon_id, reason, category, Math.floor(Date.now() / 1000));
            interaction.reply({content: `${interaction.user} Added a strike to ${dataG1.alderon_name} \`${dataG1.alderon_id}\`.`, ephemeral: false});
            return;
        } else {
            interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: false});
            return;
        }
    }



}


module.exports = strikeAdd;
  