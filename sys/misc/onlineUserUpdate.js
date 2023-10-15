// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
var SourceQuery = require('sourcequery');
const index = require("../../app.js");
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ActivityType } = require('discord.js');


function onlineUserUpdate() {
    const client = index.Gbot;

    let now = Math.floor(Date.now() / 1000);
    db.prepare(`UPDATE users SET online_time = online_time + ? WHERE online = ?`).run(300, 'Yes');

    var dataGx = db.prepare(`SELECT alderon_name FROM users WHERE online = ?;`).all('Yes');

    db.prepare(`UPDATE users SET online = ?, server_id = ?`).run('No', 0);
    var dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG1) {
        return;
    }

    let servers = JSON.parse(dataG1.servers);

    client.user.setPresence({
        activities: [{ name: `${dataGx.length} players on ${servers.length} servers.`, type: ActivityType.Watching }],
        status: 'online',
    });

    for (let i = 0; i < servers.length; i++) {
        var sq = new SourceQuery(1000);
        sq.open(servers[i].ip, Port=servers[i].port);
        sq.getPlayers(function(err, players){

            if (players) {
                for (let j = 0; j < players.length; j++) {
                    console.log(players[j].name);
                    db.prepare(`UPDATE users SET online = ?, server_id = ?, last_seen = ? WHERE alderon_name = ?`).run('Yes', i+1, now, players[j].name);
                } 
            }

        });
    }

}

module.exports = onlineUserUpdate;