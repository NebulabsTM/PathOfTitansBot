const index = require("../../app.js");
const db = require('better-sqlite3')('sys/db/Mesozoic.db');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function redeemRemove(interaction, uid) {
    var dataG1 = db.prepare(`SELECT * FROM redeem WHERE uid = ?;`).get(uid);
    if (dataG1) {
        db.prepare(`DELETE FROM redeem WHERE uid=?;`).run(uid);
        interaction.reply({content: `${interaction.user} Redeem item **#${uid}** has been removed.`, ephemeral: false});
        return;
    } else {
        interaction.reply({content: `${interaction.user} Redeem UID **#${uid}** not found. Type \`/redeem-list Username/mention\` to view a list of their redeemable items.`, ephemeral: false});
        return;
    }
}


module.exports = redeemRemove;
  