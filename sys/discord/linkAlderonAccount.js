// Import database
const db = require('better-sqlite3')('sys/db/Mesozoic.db');

function linkAlderonAccount(interaction, id) {



        let inputX = id;
        let regexp = /^\d{3}-\d{3}-\d{3}$/;

        if (regexp.test(inputX)) {
            var c_id = inputX;
        } else {
            let inputY = id;
            var c_id = inputY.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
        }

        const dataG = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(c_id);
        console.log(dataG);
        if (dataG) {
            

                if (dataG.discord_id !== 'None') {

                    if (dataG.discord_id.includes('P')) {
                        if (dataG.discord_id.includes(interaction.user.id)) {
                            interaction.reply({ content: `${interaction.user} You already have a pending confirmation for this account. Please go in-game and type \`!confirm\` in chat.`, ephemeral: false });
                        } else {
                            interaction.reply({ content: `${interaction.user} This account is pending confirmation for user <@${dataG.discord_id.replace('P','')}>. If this is not you, go in-game and type \`!unlink\` in chat.`, ephemeral: false });
                        }
                    } else {
                        if (dataG.discord_id == interaction.user.id) {
                            interaction.reply({ content: `${interaction.user} This account is already linked to your Discord Account.`, ephemeral: false });
                        } else {
                            interaction.reply({ content: `${interaction.user} This account is already linked to <@${dataG.discord_id}>`, ephemeral: false });
                        }
                    }
    
                } else {
                    let p_id = `P${interaction.user.id}`;
                    db.prepare(`UPDATE users SET discord_id = ? WHERE alderon_id = ?;`).run(p_id, c_id);
                    interaction.reply({ content: `${interaction.user} Your Discord Account has a pending confirmation. Please go in-game and type \`!confirm\` in chat to complete the linking.`, ephemeral: false });
                }




        } else {
            interaction.reply({ content: `${interaction.user} No user has been found in the database using Alderon ID \`${c_id}\`.`, ephemeral: false });
        }
}

module.exports = linkAlderonAccount;