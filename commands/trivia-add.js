const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('trivia-add')
		.setDescription('Set up a trivia question')
		.addStringOption(option =>
			option.setName('question')
				.setDescription('The question')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('answer')
				.setDescription('The answer')
				.setRequired(true))

};