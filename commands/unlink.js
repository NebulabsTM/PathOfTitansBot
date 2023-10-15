const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('unlink')
		.setDescription('Unlink an account')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('username')
				.setRequired(true))

};