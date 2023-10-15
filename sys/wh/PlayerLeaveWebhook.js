const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);

const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');


function PlayerRespawnWebhook(data, id, channel) {
    const client = index.Gbot;
    var activityLogChannel = client.channels.cache.get(channel);

    if (data.FromDeath) {
        var desc = `**[${id}] ${data.PlayerName}** \`${data.PlayerAlderonId}\` Has died and therefore left their character.`;
    } else if (data.DinosaurType) {
        var growth = (Math.round(data.DinosaurGrowth * 100) / 100).toFixed(2);
        if (!data.SafeLog) {
            var desc = `**[${id}] ${data.PlayerName}** \`${data.PlayerAlderonId}\` Has InstaLogged out of their \`${growth} ${data.DinosaurType}\``;
        } else {
            var desc = `**[${id}] ${data.PlayerName}** \`${data.PlayerAlderonId}\` Has SafeLogged out of their \`${growth} ${data.DinosaurType}\``;
        }
    } 
    
    const leaveEmbed = new EmbedBuilder();
    leaveEmbed.setDescription(desc);
    leaveEmbed.setTimestamp()
    leaveEmbed.setColor(`ff5d00`);
    activityLogChannel.send({ embeds: [leaveEmbed] });

    // Database handling
    const dataG = db.prepare(`SELECT * FROM users WHERE alderon_name = ?;`).get(data.PlayerName);
    console.log(dataG);
    if (dataG) {
        const dataS = db.prepare(`UPDATE users SET online = 'Yes', spawned = 'None' WHERE alderon_id = ?;`).run(data.PlayerAlderonId);
    }

    const dataGy = db.prepare(`SELECT * FROM nests WHERE creator = ? OR partner = ?;`).get(data.PlayerName, data.PlayerName);
    if (dataGy) {
        console.log('Message id: '+dataGy.message);
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

module.exports = PlayerRespawnWebhook;