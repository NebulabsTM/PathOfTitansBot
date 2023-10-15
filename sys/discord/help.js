

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function help(interaction) {

    let helpTxt = 
    `
    </profile:1013135712138305546> View a profile\n
    </leaderboard:1072165909009010710> View the leaderboards\n
    </nest:1072165909009010711> Create a nest\n
    </shop:1073360771276353646> View the shop\n
    `;

    interaction.reply({ content: `${interaction.user} here is a list of all commands:\n${helpTxt}`, ephemeral: false });

}


module.exports = help;
  