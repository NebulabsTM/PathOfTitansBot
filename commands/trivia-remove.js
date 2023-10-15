const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('trivia-remove')
		.setDescription('Remove a trivia question')
		.addIntegerOption(option =>
			option.setName('uid')
				.setDescription('The question id')
				.setRequired(true))


};