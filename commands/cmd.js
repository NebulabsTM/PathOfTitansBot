const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('cmd')
		.setDescription('Send a command to a server')
		.addIntegerOption(option =>
			option.setName('server')
				.setDescription('The ID of the server')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to send')
				.setRequired(true))


};