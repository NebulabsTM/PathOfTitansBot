

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function strikeList(interaction, name) {

    if (name.includes('@')) {
        name = name.replace(/[^0-9]/g, '');
        var dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(name);
        if (dataG1) {

            var dataG2 = db.prepare(`SELECT * FROM strikes WHERE alderon_id = ?;`).all(dataG1.alderon_id);
            if (dataG2.length !== 0) {
                
                const strikeEmbed = new EmbedBuilder()
                strikeEmbed.setTimestamp();
                strikeEmbed.setColor('#0a0a0a')
                strikeEmbed.setTitle(`${dataG1.alderon_name}'s Strikes [\`${dataG1.alderon_id}\`]`)
                for (let i = 0; i < dataG2.length; i++) {
                    strikeEmbed.addFields({ name: `[#${dataG2[i].uid}] [<t:${dataG2[i].date}:R>] [${dataG2[i].category}] Strike Nº${i+1} [${dataG2[i].category}]`, value: `\`\`\` ${dataG2[i].reason} \`\`\`` , inline: false })
                }
                interaction.reply({embeds: [strikeEmbed], ephemeral: true});
                return;

            } else {
                interaction.reply({content: `${interaction.user} This user does not have any strikes.`, ephemeral: true});
                return;
            }

            





        } else {
            interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: false});
            return;
        }

    } else {
        const dataG1 = db.prepare(`SELECT * FROM users WHERE alderon_name = ? OR alderon_id = ?;`).get(name, name);
        if (dataG1) {

            var dataG2 = db.prepare(`SELECT * FROM strikes WHERE alderon_id = ?;`).all(dataG1.alderon_id);
            if (dataG2.length !== 0) {
                
                const strikeEmbed = new EmbedBuilder()
                strikeEmbed.setTimestamp();
                strikeEmbed.setColor('#0a0a0a')
                strikeEmbed.setTitle(`${dataG1.alderon_name}'s Strikes [\`${dataG1.alderon_id}\`]`)
                for (let i = 0; i < dataG2.length; i++) {
                    strikeEmbed.addFields({ name: `[#${dataG2[i].uid}] [<t:${dataG2[i].date}:R>] [${dataG2[i].category}] Strike Nº${i+1}`, value: `\`\`\` ${dataG2[i].reason} \`\`\`` , inline: false })
                }
                interaction.reply({embeds: [strikeEmbed], ephemeral: true});
                return;

            } else {
                interaction.reply({content: `${interaction.user} This user does not have any strikes.`, ephemeral: true});
                return;
            }
        } else {
            interaction.reply({content: `${interaction.user} Alderon account was not found in the database.`, ephemeral: true});
            return;
        }
    }



}


module.exports = strikeList;
  