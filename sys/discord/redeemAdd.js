

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');
const index = require("../../app.js")


function redeemAdd(interaction, name, dinosaur, growth) {
    const client = index.Gbot;
    let code = (Math.random() + 1).toString(36).substring(7).toUpperCase();

    if (name.includes('@')) {
        name = name.replace(/[^0-9]/g, '');
        var dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(name);
        if (dataG1) {
            db.prepare(`INSERT INTO redeem (alderon_name, code, dinosaur, growth) VALUES (?, ?, ?, ?);`).run(dataG1.alderon_name, code, dinosaur, growth);
            interaction.reply({content: `${interaction.user} Added a redeemable dinosaur for ${dataG1.alderon_name} \`${dataG1.alderon_id}\`.`, ephemeral: false});
            client.users.send(dataG1.discord_id, `You have been given a ${growth} ${dinosaur}! use \`!redeem ${code}\` in-game to redeem your dinosaur. Make sure you are spawned in as the right dinosaur.`);
            return;
        } else {
            interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: false});
            return;
        }

    } else {
        const dataG1 = db.prepare(`SELECT * FROM users WHERE alderon_name = ? OR alderon_id = ?;`).get(name, name);
        if (dataG1) {
            db.prepare(`INSERT INTO redeem (alderon_name, code, dinosaur, growth) VALUES (?, ?, ?, ?);`).run(dataG1.alderon_name, code, dinosaur, growth);
            interaction.reply({content: `${interaction.user} Added a redeemable dinosaur for ${dataG1.alderon_name} \`${dataG1.alderon_id}\`.`, ephemeral: false});
            client.users.send(dataG1.discord_id, `You have been given a ${growth} ${dinosaur}! use \`!redeem ${code}\` in-game to redeem your dinosaur. Make sure you are spawned in as the right dinosaur.`);
            return;
        } else {
            interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: false});
            return;
        }
    }



}


module.exports = redeemAdd;
  