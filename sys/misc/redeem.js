// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")
const index = require("../../app.js")
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');




function redeem(data, server) {
    const client = index.Gbot;

    const dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG1) {
        return;
    }
    let servers = JSON.parse(dataG1.servers);

    let args = data.Message.split(' ');
    if (args.length !== 2) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Invalid syntax! (!redeem CODE)`, servers[server-1]);
        return;
    }

    const dataGx = db.prepare(`SELECT * FROM users WHERE alderon_name = ?;`).get(data.PlayerName);
    if (!dataGx) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: For some reason we could not find you in our database. please log out and back in and retry.`, servers[server-1]);
        return;
    }

    const dataG2 = db.prepare(`SELECT * FROM redeem WHERE alderon_name = ? AND code = ?;`).get(data.PlayerName, args[1]);
    if (!dataG2) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Redeemable growth not found, please make sure you entered the right code. (case sensitive)`, servers[server-1]);
        return;
    }

    if (dataG2.dinosaur !== dataGx.spawned) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: You are not the right dinosaur, your redeem is for a ${dataG2.growth} ${dataG2.dinosaur}`, servers[server-1]);
        return;
    }
    
    rconCommandStandalone(`modattr ${data.PlayerName} growth ${dataG2.growth}`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} :pot: Dinosaur growth redeemed!`, servers[server-1]);
    db.prepare(`DELETE FROM redeem WHERE code = ?;`).run(args[1]);

}

module.exports = redeem;