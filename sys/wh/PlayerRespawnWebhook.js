const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');

function PlayerRespawnWebhook(data, id, channel) {
    const client = index.Gbot;
    var activityLogChannel = client.channels.cache.get(channel);
    var stringLoc = data.Location;
    var loc = data.Location.replace(/[\(\)']+/g,'').split(' ')
    var coords = [];
    for (var i = 0; i < loc.length; i++) {
        coords.push(parseInt(loc[i].slice(2, -3)));
    }
    var location = `(X=${coords[0]},Y=${coords[1]},Z=${coords[2]})`

    const respawnEmbed = new EmbedBuilder();
    respawnEmbed.setDescription(`**[${id}] ${data.PlayerName}** \`${data.PlayerAlderonId}\` Spawned as \`${(Math.round(data.DinosaurGrowth * 100) / 100).toFixed(2)} ${data.DinosaurType}\`\n\`${location}\``);
    respawnEmbed.setColor(`0065ff`);
    respawnEmbed.setTimestamp()
    activityLogChannel.send({ embeds: [respawnEmbed] });
    
    // Database handling
    const dataG = db.prepare(`SELECT * FROM users WHERE alderon_name = ?;`).get(data.PlayerName);
    console.log(dataG);
    if (dataG) {
        const dataS = db.prepare(`UPDATE users SET online = 'Yes', spawned = ? WHERE alderon_id = ?;`).run(data.DinosaurType, data.PlayerAlderonId);

        if (id == 1 || id == 2) { // Server 1 and 2 are Semi-Realism
            var dataGx = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
            if (dataGx) {
                let servers = JSON.parse(dataGx.servers);
                if (dataG.discord_id == 'None') {
                    rconCommandStandalone(`whisper ${data.PlayerName} Visit discord.gg/mesozoic-era, and link your account to access features such as; Nesting, leaderboard, profiles, and marks conversion for free!`, servers[id-1]);    
                } else if (dataG.discord_id.includes('P')) {
                    rconCommandStandalone(`whisper ${data.PlayerName} You have a pending Discord link! Type !confirm to confirm your link and get access features such as; Nesting, leaderboard, profiles, and marks conversion for free!`, servers[id-1]);    
                }
            }
        }
    }
    // db.prepare(`INSERT INTO worldevents (type, alderon_name, alderon_id, time, coordinate) VALUES (?, ?, ?, ?, ?);`).run('spawn' ,data.PlayerName, data.PlayerAlderonId, Math.floor(Date.now() / 1000), `(${stringLoc})`);
}

module.exports = PlayerRespawnWebhook;