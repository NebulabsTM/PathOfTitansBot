

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
var Rcon = require('rcon');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")
const index = require("../../app.js")

// Notes:
// Add a check if creator or partner has a nest already.
// Add nest destroy command.
// Nest request should DM creator AND partner.
// Someone should not be able to create multiple requests.

function nestRequest(interaction) {
    const client = index.Gbot;
    // Get server info
    const dataG = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG) {
        interaction.reply({content: `Something went wrong while trying to reach the server database.`, ephemeral: true});
        return;
    }
    console.log('a');
    let servers = JSON.parse(dataG.servers);

    // Get the users data
    var dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(interaction.user.id);
    // Check if the user is linked
    if (!dataG1) {
        interaction.reply({content: `You need to link your Alderon Games account to our Discord in order to join an egg. Use \`/link\` in our Discord to link your accounts.`, ephemeral: true});
        return;
    }
    console.log('b');

    // Check if user already has a nest
    

    // Get the nest data
    var dataG2 = db.prepare(`SELECT * FROM nests WHERE message = ?;`).get(interaction.message.id);
    // Check if the nest still exists
    if (!dataG2) {
        interaction.reply({content: `Something went wrong and the nest was not found.`, ephemeral: true});
        return;
    }
    console.log('c');


    // Get the creators data
    var dataG3 = db.prepare(`SELECT * FROM users WHERE alderon_name = ?;`).get(dataG2.creator);
    // Check if the user is online and the same dinosaur as the creator of the nest
    if (!dataG3) {
        interaction.reply({content: `Something went wrong and the nest creator was not found.`, ephemeral: true});
        return;
    }
    console.log('d');

    var dataG6 = db.prepare(`SELECT * FROM invites WHERE alderon_name = ? AND message = ?;`).get(dataG1.alderon_name, interaction.message.id);
    if (dataG6) {
        interaction.reply({content: `You already have an active invite for this nest. Please wait from a response from the parents.`, ephemeral: true});
        return;
    }


    if (dataG1.spawned !== dataG3.spawned) {
        interaction.reply({content: `You need to be a ${dataG3.spawned} in order to become their hatchling.`, ephemeral: true});
        return;
    }

    console.log('e');


    if (dataG1.alderon_name == dataG2.creator || dataG1.alderon_name == dataG2.partner) {
        interaction.reply({content: `You can not become your own hatchling.`, ephemeral: true});
        return;
    }

    console.log('f');


    // Create an invitation in a database.
    db.prepare(`INSERT INTO invites (message, alderon_name) VALUES (?, ?)`).run(dataG2.message, dataG1.alderon_name);


    // Send a message in discord and in game to the creator to !accept.
    rconCommandStandalone(`whisper ${dataG3.alderon_name} :pot: ${dataG1.alderon_name} [${dataG1.alderon_id}] Has requested to become your hatchling. You can !accept or !deny.`, servers[dataG2.server_id-1]);
    interaction.reply({content: `Sent request to join the nest!`, ephemeral: true});









}




module.exports = nestRequest;
  