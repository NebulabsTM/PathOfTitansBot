const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")
const unstuck = require('../misc/unstuck.js')


const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');

function PlayerRespawnWebhook(data, id, channel, refID) {
    const client = index.Gbot;
    var reportLogChannel = client.channels.cache.get(channel);

    if (!data.Title) {
        data.Title = `None`;
    }
    if (!data.Message) {
        data.Message = `None`;
    }

    const reportEmbed = new EmbedBuilder()
	reportEmbed.setTitle(`[${id}] ${data.ServerName} [ID ${refID}]`)
    reportEmbed.setDescription(`**Report Title:**\n\`\`\`\n${data.Title}\n\`\`\`\n**Reporter Message:**\n\`\`\`\n${data.Message}\n\`\`\``)
    reportEmbed.addFields({ name: `Report Info`, value: `Type: ${data.ReportType}\nReason: ${data.ReportReason}`, inline: true })
    if (data.RecentDamageCauserIDs) {
        reportEmbed.addFields({ name: `Recent Damage Causers`, value: `${data.RecentDamageCauserIDs}`, inline: false })
    }
    if (data.RecentDamageCauserIDs) {
        reportEmbed.addFields({ name: `Nearby Players`, value: `${data.NearbyPlayerIDs}`, inline: false })
    }
    if (data.ReporterPlayerName) {
        reportEmbed.addFields({ name: `Reporter Info`, value: `${data.ReporterPlayerName}\n[${data.ReporterAlderonId}]`, inline: false })
    }
    if (data.ReportedPlayerName !== `None`) {
        reportEmbed.addFields({ name: `Reported Info`, value: `${data.ReportedPlayerName}\n[${data.ReportedAlderonId}]`, inline: false })
    }
    reportEmbed.setTimestamp()
    reportEmbed.setFooter({ text: `Platform: ${data.ReportedPlatform}` });
    if (data.ReportReason == 'Cheating') {
        reportEmbed.setColor(`910000`);
    }
    if (data.ReportReason == 'Exploiting') {
        reportEmbed.setColor(`ff4800`);
    }
    if (data.ReportReason == 'Griefing') {
        reportEmbed.setColor(`ff8400`);
    }
    if (data.ReportReason == 'Offensive Language') {
        reportEmbed.setColor(`7d153f`);
    }
    if (data.ReportReason == 'KOS (Killed on Sight)') {
        reportEmbed.setColor(`ffcc00`);
    }





    if (data.Title.toLowerCase().includes(`stuck`) || data.Message.toLowerCase().includes(`stuck`)) {
        unstuck(data.ReporterAlderonId, id, data.Location);
        reportEmbed.setColor(`0077ff`);

        const unstuckEmbed = new EmbedBuilder();
        unstuckEmbed.setColor(`00FF00`);
        unstuckEmbed.setTitle(`**Unstucked ${data.ReporterPlayerName} Automatically!**`);
        reportLogChannel.send({ embeds: [reportEmbed, unstuckEmbed] });
    } else {
        reportLogChannel.send({ embeds: [reportEmbed] });
    }

    const dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG1) {
        return;
    }
    let servers = JSON.parse(dataG1.servers);
    rconCommandStandalone(`whisper ${data.ReporterPlayerName} Thank you for submitting a report. We will try our best to help you out as soon as we can. If by any chance, you wish to open a ticket in our discord, please use this reports Reference ID [${refID}] so our staff can help you to the best of our abilities.`, servers[id-1]);


}

module.exports = PlayerRespawnWebhook;