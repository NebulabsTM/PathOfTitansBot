const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);

const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');

function AdminCommandWebhook(data, id, channel) {
    const client = index.Gbot;
    var commandLogChannel = client.channels.cache.get(channel);

    console.log(channel);

    if (!data.AdminAlderonId) {
        var line = `**[${id}] ${data.AdminName}** /${data.Command}`
    } else {
        var line = `**[${id}] ${data.AdminName}** \`${data.AdminAlderonId}\` **used** /${data.Command}`
    }

    const commandEmbed = new EmbedBuilder();
    commandEmbed.setDescription(line);
    commandEmbed.setTimestamp()
    commandEmbed.setColor(`0065ff`);
    commandLogChannel.send({ embeds: [commandEmbed] });
}

module.exports = AdminCommandWebhook;