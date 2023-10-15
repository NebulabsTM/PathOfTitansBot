const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('strike-remove')
		.setDescription('Remove a strike from a player')
		.addIntegerOption(option =>
			option.setName('uid')
				.setDescription('Strike UID')
				.setRequired(true))


};