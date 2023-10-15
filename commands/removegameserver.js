const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('removegameserver')
		.setDescription('Remove a gameserver to your Discord')
		.addIntegerOption(option =>
			option.setName('server')
				.setDescription('The server server you want to remove.')
				.setRequired(true))

};