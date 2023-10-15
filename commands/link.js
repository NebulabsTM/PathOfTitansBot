const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Link your Alderon account')
		.addStringOption(option =>
			option.setName('alderon_id')
				.setDescription('id')
				.setRequired(true))

};