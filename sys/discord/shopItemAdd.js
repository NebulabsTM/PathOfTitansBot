

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function shopItemAdd(interaction, dinosaur, cost) {
        db.prepare(`INSERT INTO shop (dinosaur, cost) VALUES (?, ?);`).run(dinosaur, cost);
        interaction.reply({content: `${interaction.user} Added ${dinosaur} (:coin:${cost}) to the shop.`, ephemeral: true});
        return;
}


module.exports = shopItemAdd;
  