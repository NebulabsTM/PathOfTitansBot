

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
var Rcon = require('rcon');



function createNest(interaction, partner, eggs, description, gender, url) {



    // First, check if both users are linked.

    var dataG1 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(interaction.user.id);
    if (dataG1) {
        var dataG2 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(partner.id);
        if (dataG2) {

            var dataGy = db.prepare(`SELECT * FROM nests WHERE creator = ? OR partner = ? OR creator = ? OR creator = ?;`).get(dataG1.alderon_name, dataG1.alderon_name, dataG2.alderon_name, dataG2.alderon_name);
            if (dataGy) {
                interaction.reply({content: `${interaction.user} You and/or your partner already have an active nest.`, ephemeral: true});
                return;
            }

            if (dataG1.spawned == dataG2.spawned && dataG1.spawned !== 'None'&& dataG2.spawned !== 'None') {

                

                // need to get growth of both players
                const dataS = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get(interaction.guildId);
                if (dataS) {

                    var growths = [];

                    let servers = JSON.parse(dataS.servers);

                    var conn = new Rcon(servers[dataG1.server_id-1].ip, parseInt(servers[dataG1.server_id-1].port), servers[dataG1.server_id-1].password);

                    conn.on('auth', function() {
                        console.log("Authenticated");
                        conn.send(`getattr ${dataG1.alderon_name} growth`);
                        conn.send(`getattr ${dataG2.alderon_name} growth`);
                      }).on('response', function(str) {
                        console.log("Response: " + str); 
                        growths.push(str)
                        if (growths.length == 2) {
                            var gs = [];
                            for (let i = 0; i < growths.length; i++) {
                                console.log(growths[i]);
                                const regex = /\d+(?:\.\d+)?/;
                                let g = growths[i].match(regex)[0]
                                gs.push(parseFloat(g))
                            }
                            console.log(gs);

                            for (let i = 0; i < gs.length; i++) {
                                if (gs[i] < .75) {
                                    interaction.reply({content: `${interaction.user} You and your partner need to be at least sub adult in order to nest.`, ephemeral: true});
                                    return; 
                                }
                            }

                            if (eggs < 1 || eggs > 20) {
                                interaction.reply({content: `${interaction.user} You need to select a valid amount of eggs. (1-20)`, ephemeral: true});
                                return; 
                            }

                            let eggTxt = '';
                            for (let ec = 0; ec < eggs; ec++) {
                                eggTxt+=`:egg:`;
                            }

                            if (eggs < 1) {
                                eggTxt = ':x:'
                            }
                            
                            
                            const nestEmbed = new EmbedBuilder()
                            nestEmbed.setColor('#0a0a0a')
                            nestEmbed.setTitle(`${dataG1.alderon_name} and ${dataG2.alderon_name}'s ${dataG1.spawned} Nest (Server ${dataG1.server_id})`)
                            nestEmbed.setDescription(description)
                            nestEmbed.setThumbnail('https://img.freepik.com/free-icon/nest_318-191962.jpg')

                            if (gender == 'Female') {
                                nestEmbed.addFields(
                                    { name: `♀️ Mother`, value: `<@${dataG1.discord_id}>\n${dataG1.alderon_name}\n${dataG1.alderon_id}`, inline: true },
                                    { name: ':nest_with_eggs:', value: eggTxt.replace(/.{25}/g, '$&\n'), inline: true },
                                    { name: `♂️ Father`, value: `<@${dataG2.discord_id}>\n${dataG2.alderon_name}\n${dataG2.alderon_id}`, inline: true },
                                )
                            } else {
                                nestEmbed.addFields(
                                    { name: `♂️ Father`, value: `<@${dataG1.discord_id}>\n${dataG1.alderon_name}\n${dataG1.alderon_id}`, inline: true },
                                    { name: ':nest_with_eggs:', value: eggTxt.replace(/.{25}/g, '$&\n'), inline: true },
                                    { name: `♀️ Mother`, value: `<@${dataG2.discord_id}>\n${dataG2.alderon_name}\n${dataG2.alderon_id}`, inline: true },
                                )
                            }

                            nestEmbed.addFields({ name: `:hatching_chick: Offspring`, value: `-------\n`, inline: true });
                           
                            if (url !== 'none') {
                                nestEmbed.setImage(url)
                            }

                            nestEmbed.setTimestamp()

                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('hatch')
                                    .setLabel('🥚 Become Hatchling')
                                    .setStyle(ButtonStyle.Success),
                            );

                            // Add nest to DB
                        

                            interaction.reply({ embeds: [nestEmbed], components: [row] , fetchReply: true }).then(reply => {
                                console.log(`Reply ID: ${reply.id}`);
                                db.prepare(`INSERT INTO nests (message, server_id, creator, partner, eggs) VALUES (?, ?, ?, ?, ?);`).run(reply.id, dataG1.server_id, dataG1.alderon_name, dataG2.alderon_name, eggs);
                              })
                              .catch(error => {
                                console.error(error);
                              });

                            setTimeout(function(){

                                const row2 = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('hatch')
                                        .setLabel('🥚 Nest Expired')
                                        .setDisabled(true)
                                        .setStyle(ButtonStyle.Danger),
                                );

                                interaction.editReply({components: [row2]})
                                db.prepare(`DELETE FROM nests WHERE message = ?`).run(reply.id);
                                db.prepare(`DELETE FROM invites WHERE message = ?`).run(reply.id);
                            }, 1800000);
                                









                        }
                      }).on('error', function(err) {
                        console.log("Error: " + err);
                      }).on('end', function() {
                        console.log("Connection closed");
                      });
                
                      try {
                        conn.connect();




                      } catch (e) {
                        if (e instanceof TypeError) {
                          // ignore TypeError
                        } 
                        else if(e instanceof RangeError) {
                          // handle RangeError
                        }
                        else {
                          // something else
                        } 
                      }

                      
                    













                } else {
                    return;
                }


            } else {
                interaction.reply({content: `${interaction.user} You and your partner need to be spawned in as the same dinosaur in order to nest and online.`, ephemeral: true});
                return;
            }
        } else {
            interaction.reply({content: `${interaction.user} Your partner needs to have your Discord accounts linked to your own Alderon Accounts if they want to create a nest.`, ephemeral: true});
            return; 
        }
    } else {
        interaction.reply({content: `${interaction.user} You need to have your Discord account linked to your Alderon Account if you want to create a nest.`, ephemeral: true});
        return; 
    }




}




module.exports = createNest;
  