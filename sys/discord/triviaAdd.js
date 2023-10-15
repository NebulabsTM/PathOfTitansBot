

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function triviaAdd(interaction, question, answer) {
        db.prepare(`INSERT INTO trivia (question, answer) VALUES (?, ?);`).run(question, answer);
        interaction.reply({content: `${interaction.user} Added the question to trivia list.`, ephemeral: true});
        return;
}


module.exports = triviaAdd;
  