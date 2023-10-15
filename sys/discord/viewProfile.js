

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function viewProfile(interaction, name) {

    if (name.includes('@')) {
                    // Translate mention to id
                    
                    name = name.replace(/[^0-9]/g, '');

                    const dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(name);
                    if (dataG1) {
                        // Found
            
                        var h = Math.floor(dataG1.online_time / 3600);
                        var m = Math.floor(dataG1.online_time % 3600 / 60);
            
                        const profileEmbed = new EmbedBuilder()
                        profileEmbed.setTimestamp();
                        profileEmbed.setColor('#0a0a0a')
                        profileEmbed.setTitle(`${dataG1.alderon_name}'s Profile [\`${dataG1.alderon_id}\`]`)
                      
                        profileEmbed.setThumbnail('https://i.imgur.com/ku4iwLR.png');
                        profileEmbed.setFooter({ text: 'Mesozoic Era', iconURL: 'https://i.imgur.com/ku4iwLR.png' });
                        profileEmbed.setURL('https://www.mesozoic-era.co.uk/');

                        profileEmbed.addFields(
                            { name: `:crossed_swords: Kills`, value: `${dataG1.kills}` , inline: true },
                            { name: `:headstone: Deaths`, value: `${dataG1.deaths}` , inline: true },
                            { name: `:scroll: Quests`, value: `${dataG1.quests}` , inline: true },
                            { name: `:speech_balloon: Messages`, value: `${dataG1.messages}` , inline: true },
                            { name: `:stopwatch: Playtime`, value: `${h} Hours and ${m} Minutes` , inline: true},
                            { name: `:egg: Offspring`, value: `${dataG1.offspring}` , inline: true},
                            { name: `:stopwatch: Last Seen`, value: `<t:${dataG1.last_seen}>` , inline: true },
                            { name: `:zap: Online`, value: `${dataG1.online}` , inline: true },
                            { name: `:dna: Current Species`, value: `${dataG1.spawned}` , inline: true })
                        if (dataG1.server_id !== 0) {
                            profileEmbed.addFields(
                                { name: `:desktop: Server`, value: `${dataG1.server_id}` , inline: true }
                            )
                        }
                        profileEmbed.addFields(
                            { name: `:coin: ERA Coins`, value: `${dataG1.tokens.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` , inline: true }
                        )
                    
                        if (dataG1.discord_id !== 'None' && !dataG1.discord_id.includes('P')) {
                            profileEmbed.addFields({ name: ':busts_in_silhouette: Discord', value: `<@${dataG1.discord_id}>`, inline: true })
                        }
            
                        interaction.reply({embeds: [profileEmbed], ephemeral: false});
            
            
            
                    } else {
                        // Not found
                        interaction.reply({content: `${interaction.user} No Alderon Account linked to this Discord Account.`, ephemeral: false});
                    }
    } else {
        if (name == 'self') {
            // Check if the user has their discord id in the DB
            const dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(interaction.user.id);
            if (dataG1) {
                // Linked
    
                var h = Math.floor(dataG1.online_time / 3600);
                var m = Math.floor(dataG1.online_time % 3600 / 60);
    
                const profileEmbed = new EmbedBuilder()
                profileEmbed.setTimestamp();
                profileEmbed.setColor('#0a0a0a')
                profileEmbed.setTitle(`${dataG1.alderon_name}'s Profile [\`${dataG1.alderon_id}\`]`)

                profileEmbed.setThumbnail('https://i.imgur.com/ku4iwLR.png');
                profileEmbed.setFooter({ text: 'Mesozoic Era', iconURL: 'https://i.imgur.com/ku4iwLR.png' });
                profileEmbed.setURL('https://www.mesozoic-era.co.uk/');
              
                profileEmbed.addFields(
                    { name: `:crossed_swords: Kills`, value: `${dataG1.kills}` , inline: true },
                    { name: `:headstone: Deaths`, value: `${dataG1.deaths}` , inline: true },
                    { name: `:scroll: Quests`, value: `${dataG1.quests}` , inline: true },
                    { name: `:speech_balloon: Messages`, value: `${dataG1.messages}` , inline: true },
                    { name: `:stopwatch: Playtime`, value: `${h} Hours and ${m} Minutes` , inline: true},
                    { name: `:egg: Offspring`, value: `${dataG1.offspring}` , inline: true},
                    { name: `:stopwatch: Last Seen`, value: `<t:${dataG1.last_seen}>` , inline: true },
                    { name: `:zap: Online`, value: `${dataG1.online}` , inline: true },
                    { name: `:dna: Current Species`, value: `${dataG1.spawned}` , inline: true })
                if (dataG1.server_id !== 0) {
                    profileEmbed.addFields(
                        { name: `:desktop: Server`, value: `${dataG1.server_id}` , inline: true }
                    )
                }
                profileEmbed.addFields(
                    { name: `:coin: ERA Coins`, value: `${dataG1.tokens.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` , inline: true }
                )
            
                if (dataG1.discord_id !== 'None' && !dataG1.discord_id.includes('P')) {
                    profileEmbed.addFields({ name: ':busts_in_silhouette: Discord', value: `<@${dataG1.discord_id}>`, inline: true })
                }
    
                interaction.reply({embeds: [profileEmbed], ephemeral: false});
    
    
    
            } else {
                // Not linked
                interaction.reply({content: `${interaction.user} You do not have your Discord Account linked. Please specify a username or link your account using \`/link\`.`, ephemeral: false});
            }
        } else {
    
            console.log(name);
            
            const dataG1 = db.prepare(`SELECT * FROM users WHERE alderon_name = ? OR alderon_id = ?;`).get(name, name);
            if (dataG1) {
                // Found
    
                var h = Math.floor(dataG1.online_time / 3600);
                var m = Math.floor(dataG1.online_time % 3600 / 60);
    
                const profileEmbed = new EmbedBuilder()
                profileEmbed.setTimestamp();
                profileEmbed.setColor('#0a0a0a')
                profileEmbed.setTitle(`${dataG1.alderon_name}'s Profile [\`${dataG1.alderon_id}\`]`)
      
                profileEmbed.setThumbnail('https://i.imgur.com/ku4iwLR.png');
                profileEmbed.setFooter({ text: 'Mesozoic Era', iconURL: 'https://i.imgur.com/ku4iwLR.png' });
                profileEmbed.setURL('https://www.mesozoic-era.co.uk/');

                profileEmbed.addFields(
                    { name: `:crossed_swords: Kills`, value: `${dataG1.kills}` , inline: true },
                    { name: `:headstone: Deaths`, value: `${dataG1.deaths}` , inline: true },
                    { name: `:scroll: Quests`, value: `${dataG1.quests}` , inline: true },
                    { name: `:speech_balloon: Messages`, value: `${dataG1.messages}` , inline: true },
                    { name: `:stopwatch: Playtime`, value: `${h} Hours and ${m} Minutes` , inline: true},
                    { name: `:egg: Offspring`, value: `${dataG1.offspring}` , inline: true},
                    { name: `:stopwatch: Last Seen`, value: `<t:${dataG1.last_seen}>` , inline: true },
                    { name: `:zap: Online`, value: `${dataG1.online}` , inline: true },
                    { name: `:dna: Current Species`, value: `${dataG1.spawned}` , inline: true })
                if (dataG1.server_id !== 0) {
                    profileEmbed.addFields(
                        { name: `:desktop: Server`, value: `${dataG1.server_id}` , inline: true }
                    )
                }
                profileEmbed.addFields(
                    { name: `:coin: ERA Coins`, value: `${dataG1.tokens.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` , inline: true }
                )
            
                if (dataG1.discord_id !== 'None' && !dataG1.discord_id.includes('P')) {
                    profileEmbed.addFields({ name: ':busts_in_silhouette: Discord', value: `<@${dataG1.discord_id}>`, inline: true })
                }
    
                interaction.reply({embeds: [profileEmbed], ephemeral: false});
    
    
            } else {
                // Not Found
                interaction.reply({content: `${interaction.user} User was not found in the database. The name should be case sensitive.`, ephemeral: false});
            }
    
        }
    }

    








}


module.exports = viewProfile;
  