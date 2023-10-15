

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function triviaRemove(interaction, uid) {


        var dataG1 = db.prepare(`SELECT * FROM trivia WHERE uid = ?`).get(uid);
        if (dataG1) {
                db.prepare(`DELETE FROM trivia WHERE uid=?;`).run(uid);
                interaction.reply({content: `${interaction.user} Trivia **#${uid}** has been removed.`, ephemeral: true});
                return; 
        } else {
                interaction.reply({content: `${interaction.user} Trivia question not found.`, ephemeral: true});
                return;
        }

}


module.exports = triviaRemove;
  