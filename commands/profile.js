const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('View someones profile.')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The profile you want to view.')
				.setRequired(false))

};