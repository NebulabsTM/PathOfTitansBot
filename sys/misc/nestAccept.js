// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")
const index = require("../../app.js")
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');




function nestAccept(data, server) {
    const client = index.Gbot;
    const channelId = '1077211954374004808';


    const dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
    if (!dataG1) {
        return;
    }
    let servers = JSON.parse(dataG1.servers);

    let args = data.Message.split(' ');
    if (args.length !== 2) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Invalid syntax! (!accept/!deny Username)`, servers[server-1]);
        return;
    }

    const dataG2 = db.prepare(`SELECT * FROM nests WHERE creator = ? OR partner = ?;`).get(data.PlayerName, data.PlayerName);
    if (!dataG2) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: You do not have any active nests.`, servers[server-1]);
        return;
    }


    const dataG3 = db.prepare(`SELECT * FROM invites WHERE alderon_name = ? AND message = ?;`).get(args[1], dataG2.message);
    if (!dataG3) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: User "${args[1]}" does not have any requests for your nest.`, servers[server-1]);
        return;
    }

    // Check if player exists
    const dataG6 = db.prepare(`SELECT * FROM users WHERE alderon_name = ?;`).get(args[1]);
    const dataG7 = db.prepare(`SELECT * FROM users WHERE alderon_name = ?;`).get(data.PlayerName);

    if (!dataG6) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: User "${args[1]}" User was not found in the database.`, servers[server-1]);
        return;
    }

    if (!dataG7) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: For some reason we could not find you in our database. Log out and back in, and if that does not work, go eat a bag of D.`, servers[server-1]);
        return;
    }

    // Check if player is still the right dinosaur
    if (dataG6.spawned !== dataG7.spawned) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: User "${args[1]}" has switched dinosaur, and is no longer eligable to join your nest.`, servers[server-1]);
        return;
    }

    // Now teleport, shrink, and update invites, embed.
    rconCommandStandalone(`setattr ${dataG3.alderon_name} growth 0`, servers[server-1]);
    rconCommandStandalone(`teleport ${dataG3.alderon_name} ${dataG2.creator}`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} :pot: ${args[1]} is now your hatchling!.`, servers[server-1]);

    db.prepare(`DELETE FROM invites WHERE alderon_name = ? AND message = ?;`).run(args[1], dataG2.message);
    db.prepare(`UPDATE nests SET eggs = eggs - 1 WHERE message = ?`).run(dataG2.message);
    db.prepare(`UPDATE users SET offspring = offspring + 1 WHERE alderon_name = ?`).run(dataG2.creator);
    db.prepare(`UPDATE users SET offspring = offspring + 1 WHERE alderon_name = ?`).run(dataG2.partner);
    
    if (dataG2.eggs-1 <= 0) {
        db.prepare(`DELETE FROM nests WHERE message = ?;`).run(dataG2.message);
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: ${args[1]} is now your hatchling!.`, servers[server-1]);

        const dataGy = db.prepare(`SELECT * FROM nests WHERE creator = ? OR partner = ?;`).get(data.PlayerName, data.PlayerName);
        if (dataGy) {
            console.log('Message id: '+dataGy.message);
            const channel = client.channels.cache.get(`1077211954374004808`);
            channel.messages.fetch(dataGy.message).then(message => {
                db.prepare(`DELETE FROM nests WHERE message = ?`).run(message.id);
                db.prepare(`DELETE FROM invites WHERE message = ?`).run(message.id);
            })
        }
    }


    const channel = client.channels.cache.get(channelId);
    const msg = channel.messages.cache.get(dataG2.message);
    // Get the embed from the message
    const receivedEmbed = msg.embeds[0];
    const exampleEmbed = EmbedBuilder.from(receivedEmbed);
    
        let eggTxt = '';
        for (let i = 0; i < dataG2.eggs-1; i++) {
            eggTxt+=`:egg:`
        }

        if (dataG2.eggs-1 < 1) {
            eggTxt = ':x:'
        }


        exampleEmbed.spliceFields(1, 1, {
          name: ':nest_with_eggs: Eggs',
          value: eggTxt
        });

        exampleEmbed.spliceFields(3, 1, {
            name: ':hatching_chick: Offspring',
            value: receivedEmbed.data.fields[3].value + `\n${args[1]}`
          });


    // Edit the message with the updated embed

    if (dataG2.eggs -1 < 1) {
        var row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('hatch')
                        .setLabel('🥚 Nest Expired')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Danger),
                );
    } else {
        var row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('hatch')
                .setLabel('🥚 Become Hatchling')
                .setStyle(ButtonStyle.Success),
        );
    }

    msg.edit({embeds: [exampleEmbed], components: [row2]})
    .then(console.log)
    .catch(console.error);




}

module.exports = nestAccept;