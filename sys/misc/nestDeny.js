// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")
const index = require("../../app.js")
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');




function nestDeny(data, server) {
    const client = index.Gbot;

    const dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG1) {
        return;
    }
    let servers = JSON.parse(dataG1.servers);

    let args = data.Message.split(' ');
    if (args.length !== 2) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Invalid syntax! (!accept/!deny Username)`, servers[server-1]);
        return;
    }

    const dataG2 = db.prepare(`SELECT * FROM nests WHERE creator = ? OR partner = ?;`).get(data.PlayerName, data.PlayerName);
    if (!dataG2) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: You do not have any active nests.`, servers[server-1]);
        return;
    }


    const dataG3 = db.prepare(`SELECT * FROM invites WHERE alderon_name = ? AND message = ?;`).get(args[1], dataG2.message);
    if (!dataG3) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: User "${args[1]}" does not have any active requests for your nest.`, servers[server-1]);
        return;
    }

    
    rconCommandStandalone(`whisper ${args[1]} :pot: ${data.PlayerName} Has denied your request to join their nest.`, servers[server-1]);
    db.prepare(`DELETE FROM invites WHERE alderon_name = ? AND message = ?;`).run(args[1], dataG2.message);

}

module.exports = nestDeny;