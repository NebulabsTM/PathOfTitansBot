const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);
var Rcon = require('rcon');
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")




const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');

function PlayerKilledWebhook(data, id, channel) {
    const client = index.Gbot;
    var combatLogChannel = client.channels.cache.get(channel);
    let combatType = '';

    const combatEmbed = new EmbedBuilder();
    if (data.KillerAlderonId) {
    var desc = `**[${id}] ${data.KillerName}** \`${data.KillerAlderonId}\` Their \`${(Math.round(data.KillerGrowth * 100) / 100).toFixed(2)}\` \`${data.KillerDinosaurType}\` Has Killed **${data.VictimName}** \`${data.VictimAlderonId}\` Their \`${(Math.round(data.VictimGrowth * 100) / 100).toFixed(2)} ${data.VictimDinosaurType}\``
    combatEmbed.setColor(`ff0000`);
    combatType = 'kill';
    } else {
    var desc = `**[${id}] ${data.VictimName}** \`${data.VictimAlderonId}\` Their \`${(Math.round(data.VictimGrowth * 100) / 100).toFixed(2)}\` \`${data.VictimDinosaurType}\` was killed by suicide`
    combatEmbed.setColor(`ff5d00`);
    combatType = 'suicide';
    }
    combatEmbed.setDescription(desc);
    combatEmbed.setTimestamp();

    
    // Database handling
    const dataG = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.VictimAlderonId);
    console.log(dataG);
    if (dataG) {
        db.prepare(`UPDATE users SET deaths = deaths + 1, spawned = 'None' WHERE alderon_id = ?;`).run(data.VictimAlderonId);
    }

    if (combatType == 'kill') {
        const dataG = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.KillerAlderonId);
        console.log(dataG);
        if (dataG) {
            db.prepare(`UPDATE users SET kills = kills + 1 WHERE alderon_id = ?;`).run(data.KillerAlderonId);
        }
    }



    // What you can do here to fix hunger percentages 

                if (combatType = 'kill') {
                                  // Hunger feedback
                const dataS = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get(`923181672810291220`);
                  if (dataS) {

                      // var responses = [];

                      let servers = JSON.parse(dataS.servers);

                      // var conn = new Rcon(servers[id-1].ip, parseInt(servers[id-1].port), servers[id-1].password);

                      rconCommandStandalone(`whisper ${data.VictimName} You have been killed by ${data.KillerName} [:AG:${data.KillerAlderonId}] Playing as a ${(Math.round(data.KillerGrowth * 100) / 100).toFixed(2)} ${data.KillerDinosaurType}`, servers[id-1]);
                      rconCommandStandalone(`whisper ${data.KillerName} You have killed ${data.VictimName} [:AG:${data.VictimAlderonId}] Playing as a ${(Math.round(data.VictimGrowth * 100) / 100).toFixed(2)} ${data.VictimDinosaurType}`, servers[id-1]);

                    // this would send the killers hunger % to the victim but this sometimes does weird math things I dont understand.

                      // conn.on('auth', function() {
                      //     console.log("Authenticated");
                      //     conn.send(`getattr ${data.KillerName} hunger`);
                      //     conn.send(`getattr ${data.KillerName} maxhunger`);
                      //   }).on('response', function(str) {
                      //     console.log("Response: " + str);

                      //     responses.push(str)
                      //     if (responses.length == 2) {
                      //       let x = 0;
                      //       for (let i = 0; i < responses.length; i++) {
                      //         if (responses[i].includes('Property maxhunger')) {
                      //           const regex = /\d+(?:\.\d+)?/;
                      //           var maxhunger = Math.round(parseFloat( responses[i].match(regex)[0]));
                      //           x++;
                      //         } else if (responses[i].includes(`Property hunger`)) {
                      //           const regex = /\d+(?:\.\d+)?/;
                      //           var hunger = Math.round(parseFloat( responses[i].match(regex)[0]));
                      //           x++;
                      //         }
                      //       }

                      //       if (x == 2) {
                      //         let hungerPercentage = Math.round((hunger / maxhunger) * 100)
                      //         // rconCommandStandalone(`whisper ${data.VictimName} You have been killed by ${data.KillerName} [:AG:${data.KillerAlderonId}], they had ${hungerPercentage}% hunger.`, servers[id-1]);
                      //         let hungerTxt = `> ${data.KillerName} had ${hungerPercentage}% hunger when they killed ${data.VictimName}. (Hunger = ${hunger}, Maxhunger = ${maxhunger})`;
                      //         combatLogChannel.send({ content: hungerTxt });
                      //       }

                      //     }
                          

                      //   }).on('error', function(err) {
                      //     console.log("Error: " + err);
                      //   }).on('end', function() {
                      //     console.log("Connection closed");
                      //   });
                  
                        
                        // try {
                        //   conn.connect();
                        // } catch (e) {
                        //   if (e instanceof TypeError) {
                        //     // ignore TypeError
                        //   } 
                        //   else if(e instanceof RangeError) {
                        //     // handle RangeError
                        //   }
                        //   else {
                        //     // something else
                        //   } 
                        // }
                  }
                }




                
                
            
                combatLogChannel.send({ embeds: [combatEmbed] });

}

module.exports = PlayerKilledWebhook;