

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function removeTokens(interaction, name, amount) {

    console.log(name);

    console.log('1');

    if (name.includes('@')) {
                    // Translate mention to id
                    
                    name = name.replace(/[^0-9]/g, '');

                    const dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(name);
                    if (dataG1) {
                        // Found discord
                        db.prepare(`UPDATE users SET tokens = tokens - ? WHERE discord_id = ?;`).run(amount, name);
            
                        interaction.reply({content: `${interaction.user} Removed ${amount} ERA Coins from <@${name}>.`, ephemeral: false});
            
            
                    } else {
                        // Not found discord
                        interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: false});
                    }
    } else {
        if (name == 'self') {
            // Check if the user has their discord id in the DB
            const dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(interaction.user.id);
            if (dataG1) {
                // Linked self
                db.prepare(`UPDATE users SET tokens = tokens - ? WHERE discord_id = ?;`).run(amount, interaction.user.id);
                

                interaction.reply({content: `${interaction.user} Removed ${amount} ERA Coins from your balance.`, ephemeral: false});
    

            } else {
                // Not linked self
                interaction.reply({content: `${interaction.user} You do not have your Discord Account linked. Please specify a username or link your account using \`/link\`.`, ephemeral: false});
            }
        } else {
    
            console.log(name);
            
            const dataG1 = db.prepare(`SELECT * FROM users WHERE alderon_name = ?;`).get(name);
            if (dataG1) {
                // Found username

                db.prepare(`UPDATE users SET tokens = tokens - ? WHERE alderon_name = ?;`).run(amount, name);

                interaction.reply({content: `${interaction.user} Removed ${amount} ERA Coins from ${name}.`, ephemeral: false});
    
    
            } else {
                // Not Found username
                interaction.reply({content: `${interaction.user} User was not found in the database. The name should be case sensitive.`, ephemeral: false});
            }
    
        }
    }

    








}


module.exports = removeTokens;
  