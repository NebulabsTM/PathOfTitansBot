const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('strike-list')
		.setDescription('View a players strikes')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of the player')
				.setRequired(true))

};