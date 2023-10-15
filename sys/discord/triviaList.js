

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function triviaList(interaction) {





        var dataG1 = db.prepare(`SELECT * FROM trivia`).all();
        if (dataG1.length !== 0) {
                let str = '';
                for (let i = 0; i < dataG1.length; i++) {
                        console.log(dataG1[i].answer);
                        str+=`**#${dataG1[i].uid}**\nQ: \`${dataG1[i].question}\`\nA: \`${dataG1[i].answer}\`\n`
                }

                var substrings = str.match(/[\s\S]{1,2000}(?:\r?\n|$)/g);

                for (let i = 0; i < substrings.length; i++) {
                    interaction.member.guild.channels.cache.get(interaction.channelId).send(substrings[i]);
                }
        } else {
                interaction.reply({content: `${interaction.user} No trivia questions found`, ephemeral: true});
                return;
        }

}


module.exports = triviaList;
  