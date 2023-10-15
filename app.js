// IMPORTS ---------------------------------------------------------------------
const fs = require('fs');
const bodyParser = require("body-parser")

const { REST } = require('@discordjs/rest');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, GuildEmoji } = require('discord.js');
const token = `ODU2OTIzNzYxMDEzOTQ4NDE3.GgHe20.mzJ-vdkwKQTXGXjPWoqsRlfy_8Piswk8SNokbU`;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const db = require('better-sqlite3')('./sys/db/Mesozoic.db');

const express = require("express");
const app = express();
const PORT = 110;
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`>_ Mesozoic: Listening on port ${PORT}`));

const schedule = require('node-schedule');

// Webhooks
let PlayerChatWebhook = require('./sys/wh/PlayerChatWebhook.js');
let PlayerRespawnWebhook = require('./sys/wh/PlayerRespawnWebhook.js');
let PlayerLoginWebhook = require('./sys/wh/PlayerLoginWebhook.js');
let PlayerLogoutWebhook = require('./sys/wh/PlayerLogoutWebhook.js');
let PlayerReportWebhook = require('./sys/wh/PlayerReportWebhook.js');
let PlayerLeaveWebhook = require('./sys/wh/PlayerLeaveWebhook.js');
let PlayerQuestCompleteWebhook = require('./sys/wh/PlayerQuestCompleteWebhook.js');
let PlayerKilledWebhook = require('./sys/wh/PlayerKilledWebhook.js');
let AdminSpectateWebhook = require('./sys/wh/AdminSpectateWebhook.js');
let AdminCommandWebhook = require('./sys/wh/AdminCommandWebhook.js');

// Commands
let cmdCommand = require('./sys/pot/cmdCommand.js');

// Trivia
let triviaGenerate = require('./sys/pot/triviaGenerate.js');

// Online User update
let onlineUserUpdate = require('./sys/misc/onlineUserUpdate.js');
let restartAllServers = require('./sys/misc/restartAllServers.js');

// Rcon
let rconCommandStandalone = require('./sys/rcon/rconCommandStandalone.js');

// Variables & Channels

// Server 1
let activity_channel1 = '1076904154229903380';
let combat_channel1 = '1076904243971239936';
let admin_channel1 = '1076904212589449336';
let report_channel1 = '1076904185695588462';
let chat_channel1 = '1076904039993835610';
let quest_channel1 = 'None';

// Server 2
let activity_channel2 = '1076904536465227916';
let combat_channel2 = '1076904657105989662';
let admin_channel2 = '1076904624457523260';
let report_channel2 = '1076904577976238182';
let chat_channel2 = '1076904467171119234';
let quest_channel2 = 'None';

// Server 3
let activity_channel3 = '1076905115207868607';
let combat_channel3 = '1076905214021484564';
let admin_channel3 = '1076905182803275917';
let report_channel3 = '1076905150838472704';
let chat_channel3 = '1076904886077239296';
let quest_channel3 = 'None';

// Server 4
let activity_channel4 = '1076905954324516920';
let combat_channel4 = '1076906129520603236';
let admin_channel4 = '1076906093931937944';
let report_channel4 = '1076905985777619055';
let chat_channel4 = '1076905926881194054';
let quest_channel4 = 'None';


const cooldown = new Set();
const cooldownTime = 1000; 


// Rcon Command ---------------------------------------------------------------------

// Discord Command ---------------------------------------------------------------------
let addGameserver = require('./sys/discord/addGameserver.js');
let listGameserver = require('./sys/discord/listGameserver.js');
let removeGameserver = require('./sys/discord/removeGameserver.js');
let linkAlderonAccount = require('./sys/discord/linkAlderonAccount.js');
let unlink = require('./sys/discord/unlink.js');
let viewProfile = require('./sys/discord/viewProfile.js');
let viewLeaderboard = require('./sys/discord/viewLeaderboard.js');
let addTokens = require('./sys/discord/addTokens.js');
let addTokensAll = require('./sys/discord/addTokensAll.js');
let removeTokens = require('./sys/discord/removeTokens.js');
let setTokens = require('./sys/discord/setTokens.js');

let strikeAdd = require('./sys/discord/strikeAdd.js');
let strikeList = require('./sys/discord/strikeList.js');
let strikeRemove = require('./sys/discord/strikeRemove.js');

let redeemAdd = require('./sys/discord/redeemAdd.js');
let redeemList = require('./sys/discord/redeemList.js');
let redeemRemove = require('./sys/discord/redeemRemove.js');

let createNest = require('./sys/discord/createNest.js');
let nestRequest = require('./sys/discord/nestRequest.js');

let triviaAdd = require('./sys/discord/triviaAdd.js');
let triviaList = require('./sys/discord/triviaList.js');
let triviaRemove = require('./sys/discord/triviaRemove.js');

let shopItemAdd = require('./sys/discord/shopItemAdd.js');
let viewShop = require('./sys/discord/viewShop.js');
let shopItemRemove = require('./sys/discord/shopItemRemove.js');

let help = require('./sys/discord/help.js');


// Remove nests and invites when bot starts
db.prepare(`DELETE FROM invites;`).run();
db.prepare(`DELETE FROM nests;`).run();
// client.users.cache.get('767310404003037215').send('Bot has restarted. Cleared all nests and invites.');



// Scheduled Events ---------------------------------------------------------------------

// Webhooks
// Server 1 webhooks
app.post("/Mesozoic/PlayerChat/1", (req, res) => { //
	res.status(200).end()
	PlayerChatWebhook(req.body, 1, chat_channel1);
	console.log(req.body);
});
app.post("/Mesozoic/PlayerKilled/1", (req, res) => { //
	res.status(200).end()
	PlayerKilledWebhook(req.body, 1, combat_channel1);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLogin/1", (req, res) => { //
	res.status(200).end()
	PlayerLoginWebhook(req.body, 1, activity_channel1);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLogout/1", (req, res) => { //
	res.status(200).end()
	PlayerLogoutWebhook(req.body, 1, activity_channel1);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerRespawn/1", (req, res) => { //
	res.status(200).end()
	PlayerRespawnWebhook(req.body, 1, activity_channel1);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLeave/1", (req, res) => { //
	res.status(200).end()
	PlayerLeaveWebhook(req.body, 1, activity_channel1);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerReport/1", (req, res) => { //
	res.status(200).end()
	var refID = Math.random().toString(36).substr(2, 6).toUpperCase();
	PlayerReportWebhook(req.body, 1, report_channel1, refID);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerQuestComplete/1", (req, res) => { //
	res.status(200).end()
	console.log(req.body);
	PlayerQuestCompleteWebhook(req.body, 1, quest_channel1);
	console.log(req.body);

});
app.post("/Mesozoic/AdminSpectate/1", (req, res) => { //
	res.status(200).end()
	AdminSpectateWebhook(req.body, 1, admin_channel1);
	console.log(req.body);

});
app.post("/Mesozoic/AdminCommand/1", (req, res) => { //
	res.status(200).end()
	AdminCommandWebhook(req.body, 1, admin_channel1);
	console.log(req.body);
});



// Server 2 webhooks
app.post("/Mesozoic/PlayerChat/2", (req, res) => { //
	res.status(200).end()
	PlayerChatWebhook(req.body, 2, chat_channel2);
	console.log(req.body);
});
app.post("/Mesozoic/PlayerKilled/2", (req, res) => { //
	res.status(200).end()
	PlayerKilledWebhook(req.body, 2, combat_channel2);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLogin/2", (req, res) => { //
	res.status(200).end()
	PlayerLoginWebhook(req.body, 2, activity_channel2);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLogout/2", (req, res) => { //
	res.status(200).end()
	PlayerLogoutWebhook(req.body, 2, activity_channel2);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerRespawn/2", (req, res) => { //
	res.status(200).end()
	PlayerRespawnWebhook(req.body, 2, activity_channel2);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLeave/2", (req, res) => { //
	res.status(200).end()
	PlayerLeaveWebhook(req.body, 2, activity_channel2);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerReport/2", (req, res) => { //
	res.status(200).end()
	var refID = Math.random().toString(36).substr(2, 6).toUpperCase();
	PlayerReportWebhook(req.body, 2, report_channel2, refID);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerQuestComplete/2", (req, res) => { //
	res.status(200).end()
	console.log(req.body);
	PlayerQuestCompleteWebhook(req.body, 2, quest_channel2);
	console.log(req.body);

});
app.post("/Mesozoic/AdminSpectate/2", (req, res) => { //
	res.status(200).end()
	AdminSpectateWebhook(req.body, 2, admin_channel2);
	console.log(req.body);

});
app.post("/Mesozoic/AdminCommand/2", (req, res) => { //
	res.status(200).end()
	AdminCommandWebhook(req.body, 2, admin_channel2);
	console.log(req.body);
});

// Server 3 webhooks
app.post("/Mesozoic/PlayerChat/3", (req, res) => { //
	res.status(200).end()
	PlayerChatWebhook(req.body, 3, chat_channel3);
	console.log(req.body);
});
app.post("/Mesozoic/PlayerKilled/3", (req, res) => { //
	res.status(200).end()
	PlayerKilledWebhook(req.body, 3, combat_channel3);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLogin/3", (req, res) => { //
	res.status(200).end()
	PlayerLoginWebhook(req.body, 3, activity_channel3);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLogout/3", (req, res) => { //
	res.status(200).end()
	PlayerLogoutWebhook(req.body, 3, activity_channel3);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerRespawn/3", (req, res) => { //
	res.status(200).end()
	PlayerRespawnWebhook(req.body, 3, activity_channel3);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLeave/3", (req, res) => { //
	res.status(200).end()
	PlayerLeaveWebhook(req.body, 3, activity_channel3);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerReport/3", (req, res) => { //
	res.status(200).end()
	var refID = Math.random().toString(36).substr(2, 6).toUpperCase();
	PlayerReportWebhook(req.body, 3, report_channel3, refID);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerQuestComplete/3", (req, res) => { //
	res.status(200).end()
	console.log(req.body);
	PlayerQuestCompleteWebhook(req.body, 3, quest_channel3);
	console.log(req.body);

});
app.post("/Mesozoic/AdminSpectate/3", (req, res) => { //
	res.status(200).end()
	AdminSpectateWebhook(req.body, 3, admin_channel3);
	console.log(req.body);

});
app.post("/Mesozoic/AdminCommand/3", (req, res) => { //
	res.status(200).end()
	AdminCommandWebhook(req.body, 3, admin_channel3);
	console.log(req.body);
});

// Server 4 webhooks
app.post("/Mesozoic/PlayerChat/4", (req, res) => { //
	res.status(200).end()
	PlayerChatWebhook(req.body, 4, chat_channel4);
	console.log(req.body);
});
app.post("/Mesozoic/PlayerKilled/4", (req, res) => { //
	res.status(200).end()
	PlayerKilledWebhook(req.body, 4, combat_channel4);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLogin/4", (req, res) => { //
	res.status(200).end()
	PlayerLoginWebhook(req.body, 4, activity_channel4);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLogout/4", (req, res) => { //
	res.status(200).end()
	PlayerLogoutWebhook(req.body, 4, activity_channel4);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerRespawn/4", (req, res) => { //
	res.status(200).end()
	PlayerRespawnWebhook(req.body, 4, activity_channel4);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerLeave/4", (req, res) => { //
	res.status(200).end()
	PlayerLeaveWebhook(req.body, 4, activity_channel4);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerReport/4", (req, res) => { //
	res.status(200).end()
	var refID = Math.random().toString(36).substr(2, 6).toUpperCase();
	PlayerReportWebhook(req.body, 4, report_channel4, refID);
	console.log(req.body);

});
app.post("/Mesozoic/PlayerQuestComplete/4", (req, res) => { //
	res.status(200).end()
	console.log(req.body);
	PlayerQuestCompleteWebhook(req.body, 4, quest_channel4);
	console.log(req.body);

});
app.post("/Mesozoic/AdminSpectate/4", (req, res) => { //
	res.status(200).end()
	AdminSpectateWebhook(req.body, 4, admin_channel4);
	console.log(req.body);

});
app.post("/Mesozoic/AdminCommand/4", (req, res) => { //
	res.status(200).end()
	AdminCommandWebhook(req.body, 4, admin_channel4);
	console.log(req.body);
});







// Trivia
schedule.scheduleJob('0 0 * * * *', function(){
	triviaGenerate();
});

schedule.scheduleJob('0 */5 * * * *', function(){
	onlineUserUpdate();
});

schedule.scheduleJob('0 0 */5 * * *', function(){

	restartAllServers();

});

// Initialization ---------------------------------------------------------------------

client.on('ready', () => {
	console.log('Mesozoic\'s bot is online!');
});

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const clientId = '856923761013948417';
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		)
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(`ERROR UPLOADING COMMANDS!\n`+error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (interaction.user.bot) { return; }
	if (!interaction.channel) { return; }

	if (cooldown.has(interaction.user.id)) {
		interaction.member.send("**Please wait a moment before using commands again.**");
		return;
	}


	if (interaction.customId == 'hatch') {
		nestRequest(interaction);
	}


	if (!interaction.isChatInputCommand()) { return };
	const { commandName } = interaction;
    if (commandName === 'cmd') {
		let server = interaction.options.getInteger('server') ?? 1;
		let command = interaction.options.getString('command');
		cmdCommand(command, server, interaction);
	}


    // Discord Commands
    if (commandName === 'addgameserver') {
        let ip = interaction.options.getString('ip');
		let port = interaction.options.getString('port');
		let password = interaction.options.getString('password');
		addGameserver(interaction, ip, port, password);
	}

    else if (commandName === 'listgameserver') {
		listGameserver(interaction);
	}

    else if (commandName === 'removegameserver') {
		let server = interaction.options.getInteger('server');
		removeGameserver(interaction, server);
	}

	else if (commandName === 'link') {
		let id = interaction.options.getString('alderon_id');
		linkAlderonAccount(interaction, id);
	}

	else if(commandName == 'unlink') {
		let name = interaction.options.getString('name');
		unlink(interaction, name)
	}

	else if (commandName === 'profile') {
		let name = interaction.options.getString('name') ?? 'self';
		viewProfile(interaction, name);
	}

	else if (commandName === 'leaderboard') {
		let category = interaction.options.getString('category');
		viewLeaderboard(interaction, category);
	}

	else if (commandName === 'ec-add') {
		let name = interaction.options.getString('name') ?? 'self';
		let amount = interaction.options.getInteger('amount');
		addTokens(interaction, name, amount);
	}

	else if (commandName === 'ec-remove') {
		let name = interaction.options.getString('name') ?? 'self';
		let amount = interaction.options.getInteger('amount');
		removeTokens(interaction, name, amount);
	}

	else if (commandName === 'ec-set') {
		let name = interaction.options.getString('name') ?? 'self';
		let amount = interaction.options.getInteger('amount');
		setTokens(interaction, name, amount);
	}

	else if (commandName === 'ec-add-all') {
		let amount = interaction.options.getInteger('amount');
		addTokensAll(interaction, amount);
	}

	else if (commandName === 'strike-add') {
		let name = interaction.options.getString('name');
		let reason = interaction.options.getString('reason');
		let category = interaction.options.getString('category');
		strikeAdd(interaction, name, reason, category);
	}

	else if (commandName === 'strike-list') {
		let name = interaction.options.getString('name');
		strikeList(interaction, name);
	}

	else if (commandName === 'strike-remove') {
		let uid = interaction.options.getInteger('uid');
		strikeRemove(interaction, uid);
	}

	else if (commandName === 'nest') {
		let partner = interaction.options.getUser('partner');
		let eggs = interaction.options.getInteger('eggs');
		let description = interaction.options.getString('description');
		let gender = interaction.options.getString('gender');
		const attachment = interaction.options.getAttachment("image") ?? 'none';
		const url = attachment.url;

		createNest(interaction, partner, eggs, description, gender, url);
	}

	else if (commandName === 'trivia-add') {
		let question = interaction.options.getString('question');
		let answer = interaction.options.getString('answer');
		triviaAdd(interaction, question, answer);
	}

	else if (commandName === 'trivia-list') {
		triviaList(interaction);
	}

	else if (commandName === 'trivia-remove') {
		let uid = interaction.options.getInteger('uid');
		triviaRemove(interaction, uid);
	}

	else if (commandName === 'shop-item-add') {
		let dinosaur = interaction.options.getString('dinosaur');
		let cost = interaction.options.getInteger('cost');
		shopItemAdd(interaction, dinosaur, cost);
	}

	else if (commandName === 'shop-item-remove') {
		let dinosaur = interaction.options.getString('dinosaur');
		shopItemRemove(interaction, dinosaur);
	}

	else if (commandName === 'redeem-add') {
		let name = interaction.options.getString('name');
		let dinosaur = interaction.options.getString('dinosaur');
		let growth = interaction.options.getNumber('growth');
		redeemAdd(interaction, name, dinosaur, growth);
	}

	else if (commandName === 'redeem-remove') {
		let uid = interaction.options.getInteger('uid');
		redeemRemove(interaction, uid);
	}

	else if (commandName === 'redeem-list') {
		let name = interaction.options.getString('name');
		redeemList(interaction, name);
	}

	

	else if (commandName === 'shop') {
		viewShop(interaction);
	}

	else if (commandName === 'help') {
		help(interaction);
	}









	cooldown.add(interaction.user.id);
	setTimeout(() => {
		cooldown.delete(interaction.user.id);
	}, cooldownTime);


});



client.login(token);
module.exports.Gbot = client;

