const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);

const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');

function AdminSpectateWebhook(data, id, channel) {
    const client = index.Gbot;
    var commandLogChannel = client.channels.cache.get(channel);

    const spectateEmbed = new EmbedBuilder();
    spectateEmbed.setDescription(`**[${id}] ${data.AdminName}** \`${data.AdminAlderonId}\` ${data.Action}`);
    spectateEmbed.setTimestamp()
    spectateEmbed.setColor(`FFFF00`);
    commandLogChannel.send({ embeds: [spectateEmbed] });
}

module.exports = AdminSpectateWebhook;