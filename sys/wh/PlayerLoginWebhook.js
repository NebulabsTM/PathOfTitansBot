const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');

function PlayerLoginWebhook(data, id, channel) {
    const client = index.Gbot;
    var activityChannel = client.channels.cache.get(channel);

    const joinEmbed = new EmbedBuilder();
    joinEmbed.setDescription(`**[${id}] ${data.PlayerName}** \`${data.AlderonId}\` Joined **${data.ServerName}**`);
    joinEmbed.setTimestamp()
    if (data.bServerAdmin) { joinEmbed.setColor(`ffc800`); } else { joinEmbed.setColor(`00FF00`); }
    activityChannel.send({ embeds: [joinEmbed] });

    // Database handling
    const dataG = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.AlderonId);
    console.log(dataG);



    if (!dataG) {
        
        const dataOld = db.prepare(`SELECT * FROM oldusersdrz WHERE alderon_id = ?`).get(data.AlderonId);
        if (dataOld) {
            let eraCoinsToAdd = Math.round(dataOld.tokens * 230000) + dataOld.marks;
            const dataSs = db.prepare(`INSERT INTO users (alderon_name, alderon_id, discord_id, tokens, online, spawned, server_id, login_time, last_seen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`).run(data.PlayerName, data.AlderonId, dataOld.discord_id, eraCoinsToAdd, 'Yes', 'None', id, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000));
        } else {
            const dataS = db.prepare(`INSERT INTO users (alderon_name, alderon_id, online, spawned, server_id, login_time, last_seen) VALUES (?, ?, ?, ?, ?, ?, ?);`).run(data.PlayerName, data.AlderonId, 'Yes', 'None', id, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000));
        }
        if (id == 3 || id == 4) { // Server 3 and 4 are Realism
            if (!dataG.alderon_id.includes(data.AlderonId)) {
                var dataGx = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
                if (dataGx) {
                let servers = JSON.parse(dataGx.servers);
                
                setTimeout(() => {
                    rconCommandStandalone(`kick ${data.PlayerName} Visit discord.gg/mesozoic-era, and link your account to get access to the server.`, servers[id]);
                }, 10000);
                    
            }
            }
        }
    } else {
        const dataS = db.prepare(`UPDATE users SET online = 'Yes', spawned = 'None', server_id = ?, login_time = ?, last_seen = ? WHERE alderon_id = ?;`).run(id, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000),  data.AlderonId);
    
    }

    
    

}

module.exports = PlayerLoginWebhook;
