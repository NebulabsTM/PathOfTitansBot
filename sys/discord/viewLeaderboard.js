

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function viewLeaderboard(interaction, category) {

    

    if (category == 'kills') {
        var sql1 = `SELECT * FROM users ORDER BY kills DESC LIMIT 25`
    } else if (category == 'deaths') {
        var sql1 = `SELECT * FROM users ORDER BY deaths DESC LIMIT 25`
    } else if (category == 'quests') {
        var sql1 = `SELECT * FROM users ORDER BY quests DESC LIMIT 25`
    } else if (category == 'messages') {
        var sql1 = `SELECT * FROM users ORDER BY messages DESC LIMIT 25`
    } else if (category == 'tokens') {
        var sql1 = `SELECT * FROM users ORDER BY tokens DESC LIMIT 25`
    } else if (category == 'playtime') {
        var sql1 = `SELECT * FROM users ORDER BY online_time DESC LIMIT 25`
    } else if (category == 'offspring') {
        var sql1 = `SELECT * FROM users ORDER BY offspring DESC LIMIT 25`
    }

    var dataG1 = db.prepare(sql1).all();

    console.log(sql1);
    if (dataG1) {
        let lbTxt = '';
        let lbList = '';
        let u = '';






        if (category == 'kills') {
            var e = ':crossed_swords:'
            var dataG2 = db.prepare(`SELECT 1 + (SELECT count( * ) FROM users a WHERE a.kills > b.kills ) AS rank FROM users b WHERE discord_id = ? ORDER BY rank LIMIT 1 ;`).get(interaction.user.id);
            for (let i = 0; i < dataG1.length; i++) {
                lbList+=`**${i+1}.** ${dataG1[i].kills} — ${dataG1[i].alderon_name}\n`;
            }
            lbTxt+= `**${e} Top ${dataG1.length} ${category}**\n${lbList}\n\n`;
        }
        else if (category == 'deaths') {
            var e = ':headstone:'
            var dataG2 = db.prepare(`SELECT 1 + (SELECT count( * ) FROM users a WHERE a.deaths > b.deaths ) AS rank FROM users b WHERE discord_id = ? ORDER BY rank LIMIT 1 ;`).get(interaction.user.id);
            for (let i = 0; i < dataG1.length; i++) {
                lbList+=`**${i+1}.** ${dataG1[i].deaths} — ${dataG1[i].alderon_name}\n`;
            }
            lbTxt+= `**${e} Top ${dataG1.length} ${category}**\n${lbList}\n\n`;
        }
        else if (category == 'quests') {
            var e = ':scroll:'
            var dataG2 = db.prepare(`SELECT 1 + (SELECT count( * ) FROM users a WHERE a.quests > b.quests ) AS rank FROM users b WHERE discord_id = ? ORDER BY rank LIMIT 1 ;`).get(interaction.user.id);
            for (let i = 0; i < dataG1.length; i++) {
                lbList+=`**${i+1}.** ${dataG1[i].quests} — ${dataG1[i].alderon_name}\n`;
            }
            lbTxt+= `**${e} Top ${dataG1.length} ${category}**\n${lbList}\n\n`;
        }
        else if(category == 'messages') {
            var e = ':speech_balloon:'
            var dataG2 = db.prepare(`SELECT 1 + (SELECT count( * ) FROM users a WHERE a.messages > b.messages ) AS rank FROM users b WHERE discord_id = ? ORDER BY rank LIMIT 1 ;`).get(interaction.user.id);
            for (let i = 0; i < dataG1.length; i++) {
                lbList+=`**${i+1}.** ${dataG1[i].messages} — ${dataG1[i].alderon_name}\n`;
            }
            lbTxt+= `**${e} Top ${dataG1.length} ${category}**\n${lbList}\n\n`;
        }
        else if(category == 'tokens') {
            var e = ':coin:'
            var dataG2 = db.prepare(`SELECT 1 + (SELECT count( * ) FROM users a WHERE a.tokens > b.tokens ) AS rank FROM users b WHERE discord_id = ? ORDER BY rank LIMIT 1 ;`).get(interaction.user.id);
            for (let i = 0; i < dataG1.length; i++) {
                lbList+=`**${i+1}.** ${dataG1[i].tokens} — ${dataG1[i].alderon_name}\n`;
            }
            lbTxt+= `**${e} Top ${dataG1.length} ${category}**\n${lbList}\n\n`;
        }
        else if(category == 'playtime') {
            var e = ':hourglass:'
            var dataG2 = db.prepare(`SELECT 1 + (SELECT count( * ) FROM users a WHERE a.online_time > b.online_time ) AS rank FROM users b WHERE discord_id = ? ORDER BY rank LIMIT 1 ;`).get(interaction.user.id);
            for (let i = 0; i < dataG1.length; i++) {

                let h = Math.floor(dataG1[i].online_time / 3600);
                let m = Math.floor(dataG1[i].online_time % 3600 / 60);

                lbList+=`**${i+1}.** ${h}h${m}m — ${dataG1[i].alderon_name}\n`;
            }
            lbTxt+= `**${e} Top ${dataG1.length} ${category}**\n${lbList}\n\n`;
        }
        else if(category == 'offspring') {
            var e = ':egg:'
            var dataG2 = db.prepare(`SELECT 1 + (SELECT count( * ) FROM users a WHERE a.offspring > b.offspring ) AS rank FROM users b WHERE discord_id = ? ORDER BY rank LIMIT 1 ;`).get(interaction.user.id);
            for (let i = 0; i < dataG1.length; i++) {
                lbList+=`**${i+1}.** ${dataG1[i].offspring} — ${dataG1[i].alderon_name}\n`;
            }
            lbTxt+= `**${e} Top ${dataG1.length} ${category}**\n${lbList}\n\n`;
        }




        if (dataG2) {
            var dataG3 = db.prepare(`SELECT * FROM users WHERE discord_id = ?;`).get(interaction.user.id);
            if (dataG3) {

                if (category == 'kills') {
                    u = dataG3.kills;
                } else if (category == 'deaths') {
                    dataG3.deaths;
                } else if (category == 'offspring') {
                    dataG3.offspring;
                } else if (category == 'quests') {
                    u = dataG3.quests;
                } else if (category == 'messages') {
                    u = dataG3.messages;
                } else if (category == 'tokens') {
                    u = dataG3.tokens;
                } else if (category == 'playtime') {
                    let h = Math.floor(dataG3.online_time / 3600);
                    let m = Math.floor(dataG3.online_time % 3600 / 60);
                    u = `${h}h${m}m`;
                }

                lbTxt+=`\n**${dataG2.rank}.** ${u} — ${dataG3.alderon_name}`;
            }
        }

        interaction.reply({content: lbTxt, ephemeral: true});

        // var dataG3 = db.prepare(``).get();

            
        

    }


}


module.exports = viewLeaderboard;
  