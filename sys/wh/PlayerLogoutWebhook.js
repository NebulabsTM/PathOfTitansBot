const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);

const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');


function PlayerLoginWebhook(data, id, channel) {
    const client = index.Gbot;
    var activityChannel = client.channels.cache.get(channel);

    const leaveEmbed = new EmbedBuilder();
    leaveEmbed.setDescription(`**[${id}] ${data.PlayerName}** \`${data.AlderonId}\` Left **${data.ServerName}**`);
    leaveEmbed.setColor(`FF0000`);
    leaveEmbed.setTimestamp()
    activityChannel.send({ embeds: [leaveEmbed] });

    // Database handling
    const dataG = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.AlderonId);
    console.log(dataG);
    if (!dataG) {
        const dataS = db.prepare(`INSERT INTO users (alderon_name, alderon_id, online, spawned, server_id, last_seen) VALUES (?, ?, ?, ?, ?, ?);`).run(data.PlayerName, data.AlderonId, 'No', 'None', 0, Math.floor(Date.now() / 1000));
    } else {
        // Need to update time_online with last seen.
        let timeToAdd = Math.floor(Date.now() / 1000) - dataG.last_seen;
        const dataS = db.prepare(`UPDATE users SET online = 'No', spawned = 'None', server_id = 0, online_time = online_time + ?, last_seen = ? WHERE alderon_id = ?;`).run(timeToAdd, Math.floor(Date.now() / 1000), data.AlderonId);
    }

    const dataGy = db.prepare(`SELECT * FROM nests WHERE creator = ? OR partner = ?;`).get(data.PlayerName, data.PlayerName);
    if (dataGy) {
        const channel = client.channels.cache.get(`1077211954374004808`);
        channel.messages.fetch(dataGy.message).then(message => {
            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('hatch')
                    .setLabel('🥚 Nest Expired')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),
            );

            message.edit({components: [row2]});
            db.prepare(`DELETE FROM nests WHERE message = ?`).run(message.id);
            db.prepare(`DELETE FROM invites WHERE message = ?`).run(message.id);
        })
    }
}

module.exports = PlayerLoginWebhook;
