

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function redeemList(interaction, name) {

    if (name.includes('@')) {
        name = name.replace(/[^0-9]/g, '');
        var dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(name);
        if (dataG1) {






            var dataG2 = db.prepare(`SELECT * FROM redeem WHERE alderon_name = ?;`).all(dataG1.alderon_name);
            if (dataG2.length !== 0) {
                
                const redeemEmbed = new EmbedBuilder()
                redeemEmbed.setTimestamp();
                redeemEmbed.setColor('#0a0a0a')
                redeemEmbed.setTitle(`${dataG1.alderon_name}'s Redeemable Items [\`${dataG1.alderon_id}\`]`)
                let redeemTxt = '';
                console.log(dataG2);
                for (let i = 0; i < dataG2.length; i++) {
                    redeemTxt+=`UID#${dataG2[i].uid} \`${dataG2[i].code}\`: ${dataG2[i].growth} ${dataG2[i].dinosaur}`;
                }
                redeemEmbed.setDescription(redeemTxt)
                interaction.reply({embeds: [redeemEmbed], ephemeral: true});
                return;

            } else {
                interaction.reply({content: `${interaction.user} This user does not have any redeemable items.`, ephemeral: true});
                return;
            }

            





        } else {
            interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: false});
            return;
        }

    } else {
        const dataG1 = db.prepare(`SELECT * FROM users WHERE alderon_name = ? OR alderon_id = ?;`).get(name, name);
        if (dataG1) {




            
            var dataG2 = db.prepare(`SELECT * FROM redeem WHERE alderon_name = ?;`).all(dataG1.alderon_name);
            if (dataG2.length !== 0) {
                
                const redeemEmbed = new EmbedBuilder()
                redeemEmbed.setTimestamp();
                redeemEmbed.setColor('#0a0a0a')
                redeemEmbed.setTitle(`${dataG1.alderon_name}'s Redeemable Items [\`${dataG1.alderon_id}\`]`)
                let redeemTxt = '';
                console.log(dataG2);
                for (let i = 0; i < dataG2.length; i++) {
                    redeemTxt+=`UID#${dataG2[i].uid} \`${dataG2[i].code}\`: ${dataG2[i].growth} ${dataG2[i].dinosaur}`;
                }
                redeemEmbed.setDescription(redeemTxt)
                interaction.reply({embeds: [redeemEmbed], ephemeral: true});
                return;

            } else {
                interaction.reply({content: `${interaction.user} This user does not have any redeemable items.`, ephemeral: true});
                return;
            }





        } else {
            interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: true});
            return;
        }
    }



}


module.exports = redeemList;
  