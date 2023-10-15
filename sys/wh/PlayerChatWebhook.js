const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/Mesozoic.db`);

// Rcon
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")


// in-game commands
let confirmLink = require('../misc/confirmLink.js');
let collect = require('../misc/collect.js');
let balance = require('../misc/balance.js');
let deposit = require('../misc/deposit.js');
let withdraw = require('../misc/withdraw.js');
let grow = require('../misc/grow.js');
let nestAccept = require('../misc/nestAccept.js');
let nestDeny = require('../misc/nestDeny.js');
let redeem = require('../misc/redeem.js');


const chatCommandcooldown = new Set();
const chatCommandcooldownTime = 3000;


function PlayerChatWebhook(data, id, channel) {
    const client = index.Gbot;
    var chatLogChannel = client.channels.cache.get(channel);

    if (data.FromWhisper) {var type = 'Wisper'} else {var type = data.ChannelName}
    chatLogChannel.send({ content: `\`\`\`ini\n[${id}] [${type.toUpperCase()}] [${data.AlderonId}] ${data.PlayerName}: ${data.Message}\n\`\`\`` });
    


    // Database handling
    db.prepare(`UPDATE users SET messages = messages + 1 WHERE alderon_id = ?;`).run(data.AlderonId);

    // Trivia handling


        var dataG1 = db.prepare(`SELECT * FROM trivia WHERE active = ?;`).get(id);
        if (dataG1) {
            var dataGx = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
            if (dataGx) {
            let servers = JSON.parse(dataGx.servers);

                if (data.Message.toLowerCase().includes(dataG1.answer.toLowerCase())) {
                    rconCommandStandalone(`announce ${data.PlayerName} Got the answer and won 100.000 Marks! The answer was "${dataG1.answer}"`, servers[id-1]);
                    rconCommandStandalone(`addmarks ${data.PlayerName} 100000`, servers[id-1]);
                    db.prepare(`UPDATE trivia SET active = 0 WHERE active = ?;`).run(id);
                }
            }
        }
    




    // Command handling
    if (data.Message.startsWith('!')) {

        if (chatCommandcooldown.has(data.PlayerName)) {
            return;
        }


        const dataG = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get('923181672810291220');
        if (dataG) {
            let servers = JSON.parse(dataG.servers);
            if (data.ChannelName !== 'Global') {
                rconCommandStandalone(`whisper ${data.PlayerName} :mute: Bot commands can only be used in Global chat.`, servers[id-1]);
                return;
            }
        }

        if (data.Message === '!confirm') {
            confirmLink(data, id);
        } else if (data.Message === '!farm') {
            collect(data, id);
        }  else if (data.Message.startsWith('!balance') || data.Message.startsWith('!bal' )) {
            balance(data, id);
        }  else if (data.Message.startsWith('!deposit') || data.Message.startsWith('!dep' )) {
            deposit(data, id);
        }  else if (data.Message.startsWith('!withdraw') || data.Message.startsWith('!with' )) {
            withdraw(data, id);
        }  else if (data.Message.startsWith('!grow') || data.Message.startsWith('!growth' )) {
            grow(data, id);
        }  else if (data.Message.startsWith('!accept')) {
            nestAccept(data, id);
        }  else if (data.Message.startsWith('!deny')) {
            nestDeny(data, id);
        }  else if (data.Message.startsWith('!redeem')) {
            redeem(data, id);
        }


        // Cooldown
        chatCommandcooldown.add(data.PlayerName);
        setTimeout(() => {
            chatCommandcooldown.delete(data.PlayerName);
        }, chatCommandcooldownTime);
    }
}

module.exports = PlayerChatWebhook;