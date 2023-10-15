

// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');


function addTokensAll(interaction, amount) {

    var dataS = db.prepare(`UPDATE users SET tokens = tokens + ?;`).run(amount);
    console.log(dataS);
    interaction.reply({content: `${interaction.user} Added ${amount} ERA Coins to ${dataS.changes} users.`, ephemeral: false});
    return;
}


module.exports = addTokensAll;
  