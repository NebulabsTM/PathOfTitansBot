// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const index = require("../../app.js");
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ActivityType } = require('discord.js');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")


function restartAllServers() {

    var dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG1) {
        return;
    }

    let servers = JSON.parse(dataG1.servers);

    for (let i = 0; i < servers.length; i++) {
        rconCommandStandalone(`announce The server will restart in 10 minutes!`, servers[i]);
        rconCommandStandalone(`restart 600`, servers[i]);
        setTimeout(function(){
            rconCommandStandalone(`loadcreatormode AutoLoad`, servers[i]);
        }, 900000);
    }

}

module.exports = restartAllServers;